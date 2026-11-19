import nodemailer from 'nodemailer'

const {
  SMTP_HOST,
  SMTP_PORT = '465',
  SMTP_SECURE,
  SMTP_USER,
  SMTP_PASS,
  MAIL_TO,
  MAIL_FROM_NAME = 'Portfolio Contact Form',
  NODE_ENV,
} = process.env

const isConfigured = Boolean(SMTP_HOST && SMTP_USER && SMTP_PASS && MAIL_TO)

function createTransport() {
  if (isConfigured) {
    const port = Number(SMTP_PORT)
    return nodemailer.createTransport({
      host: SMTP_HOST,
      port,
      // Port 465 uses implicit TLS; 587 upgrades with STARTTLS.
      secure: SMTP_SECURE ? SMTP_SECURE === 'true' : port === 465,
      auth: { user: SMTP_USER, pass: SMTP_PASS },
    })
  }

  if (NODE_ENV === 'production') {
    throw new Error('SMTP is not configured. Set SMTP_HOST, SMTP_USER, SMTP_PASS and MAIL_TO.')
  }

  // Local development without SMTP: emails are printed to the console instead of sent.
  console.warn('[mailer] SMTP not configured — using a console transport (emails are NOT delivered).')
  return nodemailer.createTransport({ jsonTransport: true })
}

const transporter = createTransport()

export async function verifyMailer() {
  if (!isConfigured) return false
  await transporter.verify()
  return true
}

const escapeHtml = (s) =>
  s.replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' })[c])

export async function sendContactEmail({ name, company, email, message }, meta = {}) {
  const time = new Date().toLocaleString('en-IN', {
    timeZone: 'Asia/Kolkata',
    dateStyle: 'medium',
    timeStyle: 'short',
  })
  const companyText = company || 'Not specified'
  const subject = `New portfolio enquiry from ${name}${company ? ` (${company})` : ''}`

  const text = [
    'New message from your portfolio contact form',
    '',
    `Name:    ${name}`,
    `Company: ${companyText}`,
    `Email:   ${email}`,
    `Time:    ${time}`,
    '',
    'Message:',
    message,
    '',
    meta.ip ? `Sender IP: ${meta.ip}` : '',
  ].join('\n')

  const html = `
  <div style="font-family:Arial,Helvetica,sans-serif;max-width:600px;margin:0 auto;color:#12172a">
    <h2 style="margin:0 0 16px;color:#2f6df6">New portfolio enquiry</h2>
    <table style="border-collapse:collapse;width:100%;font-size:14px">
      <tr><td style="padding:6px 0;width:90px;color:#5b6478">Name</td><td style="padding:6px 0"><strong>${escapeHtml(name)}</strong></td></tr>
      <tr><td style="padding:6px 0;color:#5b6478">Company</td><td style="padding:6px 0">${escapeHtml(companyText)}</td></tr>
      <tr><td style="padding:6px 0;color:#5b6478">Email</td><td style="padding:6px 0"><a href="mailto:${escapeHtml(email)}">${escapeHtml(email)}</a></td></tr>
      <tr><td style="padding:6px 0;color:#5b6478">Time</td><td style="padding:6px 0">${escapeHtml(time)}</td></tr>
    </table>
    <p style="margin:20px 0 6px;color:#5b6478;font-size:14px">Message</p>
    <div style="white-space:pre-wrap;background:#f5f8ff;border:1px solid #e5eaf3;border-radius:8px;padding:14px;font-size:14px;line-height:1.6">${escapeHtml(message)}</div>
    <p style="margin-top:20px;font-size:12px;color:#9ca3c4">Reply to this email to answer ${escapeHtml(name)} directly.</p>
  </div>`

  const info = await transporter.sendMail({
    // Send from your own SMTP account (required by Gmail and most providers);
    // the visitor's address goes in Reply-To so "Reply" goes to them.
    from: { name: MAIL_FROM_NAME, address: SMTP_USER || 'no-reply@localhost' },
    to: MAIL_TO || 'dev@localhost',
    replyTo: { name, address: email },
    subject,
    text,
    html,
  })

  if (!isConfigured) console.log('[mailer] (dev) email that would be sent:\n', info.message)
  return info
}
