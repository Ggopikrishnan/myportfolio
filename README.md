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

The Contact section posts to our own **Node.js + Express + Nodemailer** backend in [`server/`](server/),
which emails each enquiry over SMTP. Setup, environment variables and deployment steps are in
[`server/README.md`](server/README.md).

Local development uses two terminals:

```bash
cd server && npm install && npm run dev   # API on http://localhost:5000
npm run dev                               # site on http://localhost:5173 (proxies /api)
```

In production, set `VITE_API_URL` (see [`.env.example`](.env.example)) to the deployed backend URL.

## Editing content

All résumé content (profile, experience, projects, skills, education) lives in
[`src/data/resume.js`](src/data/resume.js) — edit that file to update the site without touching components.
The résumé PDF offered for download is [`public/Gopikrishnan_G.pdf`](public/Gopikrishnan_G.pdf).
