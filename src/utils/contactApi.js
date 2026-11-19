// Sends the contact form to our own Express + Nodemailer backend.
// Locally, Vite proxies /api to http://localhost:5000 (see vite.config.js), so VITE_API_URL can stay empty.
// In production set VITE_API_URL to the deployed backend, e.g. https://portfolio-api.onrender.com
const API_URL = (import.meta.env.VITE_API_URL || '').replace(/\/$/, '')

export class ContactError extends Error {
  constructor(message, { status, fieldErrors } = {}) {
    super(message)
    this.name = 'ContactError'
    this.status = status
    this.fieldErrors = fieldErrors
  }
}

export async function sendContactMessage({ name, company, email, message, startedAt }) {
  let res
  try {
    res = await fetch(`${API_URL}/api/contact`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name, company, email, message, startedAt }),
    })
  } catch {
    throw new ContactError('Network error — please check your connection.')
  }

  let data = {}
  try {
    data = await res.json()
  } catch {
    // Non-JSON response (e.g. proxy error page); handled below.
  }

  if (!res.ok || !data.ok) {
    throw new ContactError(data.error || 'Could not send your message right now.', {
      status: res.status,
      fieldErrors: data.errors,
    })
  }
  return data
}
