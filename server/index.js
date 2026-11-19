import 'dotenv/config'
import express from 'express'
import cors from 'cors'
import helmet from 'helmet'
import rateLimit from 'express-rate-limit'
import { validateContact } from './validateContact.js'
import { sendContactEmail, verifyMailer } from './mailer.js'

const PORT = Number(process.env.PORT) || 5000
const allowedOrigins = (process.env.CORS_ORIGIN || 'http://localhost:5173')
  .split(',')
  .map((o) => o.trim().replace(/\/$/, ''))
  .filter(Boolean)

const app = express()

// Behind Render/Railway/Nginx the client IP is in X-Forwarded-For; needed for per-IP rate limiting.
app.set('trust proxy', 1)
app.disable('x-powered-by')
app.use(helmet())

app.use(
  cors({
    origin(origin, callback) {
      // Allow same-origin / server-to-server requests (no Origin header) and listed origins.
      if (!origin || allowedOrigins.includes(origin)) return callback(null, true)
      return callback(null, false)
    },
    methods: ['POST', 'GET', 'OPTIONS'],
    allowedHeaders: ['Content-Type'],
    maxAge: 86400,
  }),
)

app.use(express.json({ limit: '10kb' }))

// 5 submissions per IP every 15 minutes.
const contactLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  limit: 5,
  standardHeaders: 'draft-7',
  legacyHeaders: false,
  message: { ok: false, error: 'Too many messages sent. Please try again in a few minutes.' },
})

app.get('/api/health', (_req, res) => res.json({ ok: true }))

app.post('/api/contact', contactLimiter, async (req, res) => {
  const result = validateContact(req.body)

  if (!result.ok && result.spam) {
    // Give bots no hint about which check they failed.
    return res.status(400).json({ ok: false, error: 'Your message could not be sent. Please try again.' })
  }
  if (!result.ok) {
    return res.status(400).json({ ok: false, error: 'Please fix the highlighted fields.', errors: result.errors })
  }

  try {
    await sendContactEmail(result.data, { ip: req.ip })
    return res.json({ ok: true, message: 'Message sent successfully.' })
  } catch (err) {
    console.error('[contact] send failed:', err.message)
    return res.status(500).json({ ok: false, error: 'Could not send your message right now.' })
  }
})

app.use((_req, res) => res.status(404).json({ ok: false, error: 'Not found' }))

// Malformed JSON or oversized bodies.
app.use((err, _req, res, _next) => {
  const status = err.status || err.statusCode || 500
  if (status >= 500) console.error(err)
  res.status(status).json({ ok: false, error: status === 413 ? 'Message is too large.' : 'Invalid request.' })
})

app.listen(PORT, async () => {
  console.log(`Contact API listening on http://localhost:${PORT}`)
  console.log(`Allowed origins: ${allowedOrigins.join(', ')}`)
  try {
    if (await verifyMailer()) console.log('[mailer] SMTP connection verified.')
  } catch (err) {
    console.error('[mailer] SMTP verification failed:', err.message)
  }
})
