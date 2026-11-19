// Server-side validation and basic spam checks for the contact form.
// The client validates too, but nothing from the browser is trusted here.

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/
// Control characters (keeps \n and \t in the message only).
const CONTROL_CHARS = /[\u0000-\u0008\u000B\u000C\u000E-\u001F\u007F]/g
const LINE_BREAKS = /[\r\n]/

const LIMITS = {
  name: { min: 2, max: 100 },
  company: { min: 0, max: 100 },
  email: { min: 3, max: 254 },
  message: { min: 10, max: 5000 },
}

// A human needs a few seconds to fill the form; bots usually post instantly.
const MIN_FILL_MS = 3000
// Forms older than this are treated as stale or replayed.
const MAX_FORM_AGE_MS = 24 * 60 * 60 * 1000
const MAX_LINKS = 3

const clean = (value) => (typeof value === 'string' ? value.replace(CONTROL_CHARS, '').trim() : '')

/**
 * @returns {{ ok: true, data: {name, company, email, message} } | { ok: false, errors?: object, spam?: boolean }}
 */
export function validateContact(body = {}) {
  const data = {
    name: clean(body.name),
    company: clean(body.company),
    email: clean(body.email).toLowerCase(),
    message: clean(body.message),
  }
  const errors = {}

  // Name
  if (!data.name) errors.name = 'Please enter your name.'
  else if (data.name.length < LIMITS.name.min) errors.name = 'Name is too short.'
  else if (data.name.length > LIMITS.name.max) errors.name = `Name must be under ${LIMITS.name.max} characters.`
  else if (LINE_BREAKS.test(data.name)) errors.name = 'Name must be a single line.'

  // Company (optional)
  if (data.company.length > LIMITS.company.max) {
    errors.company = `Company must be under ${LIMITS.company.max} characters.`
  } else if (LINE_BREAKS.test(data.company)) {
    errors.company = 'Company must be a single line.'
  }

  // Email — also blocks line breaks, which could inject mail headers via Reply-To.
  if (!data.email) errors.email = 'Please enter your email.'
  else if (data.email.length > LIMITS.email.max || LINE_BREAKS.test(data.email) || !EMAIL_PATTERN.test(data.email)) {
    errors.email = 'Please enter a valid email address.'
  }

  // Message
  if (!data.message) errors.message = 'Please enter a message.'
  else if (data.message.length < LIMITS.message.min) errors.message = 'Message should be at least 10 characters.'
  else if (data.message.length > LIMITS.message.max) {
    errors.message = `Message must be under ${LIMITS.message.max} characters.`
  }

  if (Object.keys(errors).length > 0) return { ok: false, errors }

  // ---- Spam checks (no extra visible field needed) ----
  const startedAt = Number(body.startedAt)
  const elapsed = Date.now() - startedAt
  if (!Number.isFinite(startedAt) || elapsed < MIN_FILL_MS || elapsed > MAX_FORM_AGE_MS) {
    return { ok: false, spam: true }
  }

  const links = (data.message.match(/https?:\/\/|www\./gi) || []).length
  if (links > MAX_LINKS) return { ok: false, spam: true }

  return { ok: true, data }
}
