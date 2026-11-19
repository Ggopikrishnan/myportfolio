# Gopikrishnan G — Portfolio

Personal portfolio site built with React + Vite. Sections: hero, work experience, projects, skills, and a
contact form for recruiter enquiries.

## Run locally

```bash
npm install
npm run dev
```

Open the printed local URL (usually `http://localhost:5173`).

## Build for production

```bash
npm run build
npm run preview
```

`npm run build` outputs a static site to `dist/`, deployable to any static host (Vercel, Netlify, GitHub
Pages, Hostinger, etc.).

## Contact form

The Contact section sends enquiries with [EmailJS](https://www.emailjs.com/) — no backend needed.
Messages are delivered to **gopig6581@gmail.com** through the EmailJS service and template.

Set these three variables (see [`.env.example`](.env.example)) in a local `.env` and in
Vercel → Settings → Environment Variables, then redeploy:

```
VITE_EMAILJS_SERVICE_ID=...
VITE_EMAILJS_TEMPLATE_ID=...
VITE_EMAILJS_PUBLIC_KEY=...
```

The template can use: `{{name}}`, `{{company}}`, `{{email}}`, `{{reply_to}}`, `{{message}}`, `{{time}}`, `{{title}}`.

## Editing content

All résumé content (profile, experience, projects, skills, education) lives in
[`src/data/resume.js`](src/data/resume.js) — edit that file to update the site without touching components.
The résumé PDF offered for download is [`public/Gopikrishnan_G.pdf`](public/Gopikrishnan_G.pdf).
