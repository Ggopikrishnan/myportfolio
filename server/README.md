# Portfolio Contact API

A small Node.js + Express + Nodemailer backend for the portfolio's contact form. It receives
the four form fields (Name, Company, Email, Message), validates them, and emails the message
to you over SMTP.

## Files

| File | Purpose |
|---|---|
| `index.js` | Express app: security headers, CORS, JSON body limit, rate limit, `POST /api/contact`, `GET /api/health` |
| `mailer.js` | Nodemailer SMTP transport and the email template (text + HTML) |
| `validateContact.js` | Server-side validation for all four fields, plus spam checks |
| `.env.example` | Template for your SMTP settings and allowed origins |

## API

`POST /api/contact` with JSON:

```json
{ "name": "Jane", "company": "Acme", "email": "jane@acme.com", "message": "Hello…", "startedAt": 1730000000000 }
```

| Response | Meaning |
|---|---|
| `200 { ok: true }` | Email sent |
| `400 { ok: false, error, errors? }` | Validation failed (`errors` has per-field messages) or spam check failed |
| `429 { ok: false, error }` | Rate limit hit (5 requests per IP every 15 minutes) |
| `500 { ok: false, error }` | SMTP failure |

## Protection

- **Validation**: name 2–100 chars, company optional ≤100, valid email ≤254, message 10–5000 chars. Line breaks are rejected in name, company and email, which blocks email-header injection.
- **Spam**: the form sends the time it was opened (`startedAt`). Submissions faster than 3 seconds or older than 24 hours are rejected, and so are messages with more than 3 links. No extra visible field is used.
- **Rate limit**: 5 requests per IP every 15 minutes.
- **Other**: `helmet` security headers, 10 KB body limit, HTML-escaped email content, CORS allow-list.

---

## Local setup

1. **Create a Gmail App Password** (needed if you send through Gmail):
   - Turn on 2-Step Verification for your Google account.
   - Go to <https://myaccount.google.com/apppasswords>, create an app password named "Portfolio", and copy the 16 characters.
2. **Configure the backend:**
   ```bash
   cd server
   cp .env.example .env      # on Windows: copy .env.example .env
   ```
   Edit `server/.env`:
   ```env
   SMTP_USER=your-gmail-address@gmail.com
   SMTP_PASS=the16charapppassword
   MAIL_TO=gopig6581@gmail.com
   CORS_ORIGIN=http://localhost:5173
   ```
3. **Install and run the backend:**
   ```bash
   npm install
   npm run dev               # http://localhost:5000
   ```
   You should see `SMTP connection verified.` If SMTP isn't configured, emails are printed to the console instead of being sent. That only happens outside production.
4. **Run the frontend** in a second terminal from the project root:
   ```bash
   npm run dev               # http://localhost:5173
   ```
   Vite forwards `/api` to `http://localhost:5000`, so the frontend needs no `.env` locally.
5. Submit the form. The email arrives at `MAIL_TO`, and **Reply** goes to the visitor.

---

## Production deployment

The frontend (static Vite site) and the backend (Node server) deploy separately.

### 1. Backend on Render (free tier works)

1. Push the repo to GitHub.
2. On <https://render.com>, choose **New → Web Service** and pick the repo.
3. Settings:
   - **Root Directory:** `server`
   - **Build Command:** `npm install`
   - **Start Command:** `npm start`
4. Add these **Environment Variables:**
   ```
   NODE_ENV=production
   SMTP_HOST=smtp.gmail.com
   SMTP_PORT=465
   SMTP_SECURE=true
   SMTP_USER=your-gmail-address@gmail.com
   SMTP_PASS=your-app-password
   MAIL_TO=gopig6581@gmail.com
   MAIL_FROM_NAME=Portfolio Contact Form
   CORS_ORIGIN=https://your-site.vercel.app
   ```
   (Render sets `PORT` itself.)
5. Deploy, then open `https://<your-service>.onrender.com/api/health`. It should return `{"ok":true}`.

> Render's free services sleep when idle, so the first message after a quiet period can take
> about 30 seconds. Railway, Fly.io or a small VPS work the same way: run `npm start` in
> `server/` with the same variables.

### 2. Frontend on Vercel

1. In Vercel, open **Project → Settings → Environment Variables** and add:
   ```
   VITE_API_URL=https://<your-service>.onrender.com
   ```
   (No trailing slash.)
2. **Redeploy.** Vite bakes `VITE_*` values in at build time, so a redeploy is required.
3. Make sure the backend's `CORS_ORIGIN` exactly matches your site's URL. For example, list
   `https://your-site.vercel.app,https://www.yourdomain.com` if you use a custom domain too.

### Troubleshooting

| Symptom | Fix |
|---|---|
| Form shows "Couldn't send that…" | Check the backend logs. Usually wrong SMTP credentials or Gmail blocking a normal password (use an App Password). |
| Browser console shows a CORS error | The site's URL isn't in `CORS_ORIGIN` (check `https`, `www` and no trailing slash). |
| "Too many messages sent" | The rate limit worked. Wait 15 minutes. |
| `SMTP verification failed` at startup | Wrong host, port or secure combination. Use 465 + `SMTP_SECURE=true`, or 587 + `SMTP_SECURE=false`. |
