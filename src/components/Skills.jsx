import {
  siAndroid,
  siBootstrap,
  siCss,
  siDocker,
  siExpress,
  siFirebase,
  siGit,
  siGithub,
  siGithubactions,
  siGoogleplay,
  siGradle,
  siHtml5,
  siJavascript,
  siJsonwebtokens,
  siKotlin,
  siLaravel,
  siLinux,
  siMongodb,
  siMysql,
  siNextdotjs,
  siNodedotjs,
  siOpenjdk,
  siPhp,
  siPostgresql,
  siReact,
  siRedux,
  siSocketdotio,
  siSupabase,
  siTailwindcss,
  siTypescript,
  siZod,
} from 'simple-icons'
import { skillGroups } from '../data/resume'
import Reveal from './Reveal'
import './Skills.css'

// Stroke glyphs for skills without a brand logo (AWS and Azure aren't in simple-icons).
const CLOUD = 'M7 18a4.5 4.5 0 0 1-.6-8.96A6 6 0 0 1 18 9.5a4.25 4.25 0 0 1-.5 8.5Z'
const GLYPH = {
  api: 'M8 7 3 12l5 5M16 7l5 5-5 5M13.5 5l-3 14',
  cloud: CLOUD,
  bundle: 'M12 3 20 7.5v9L12 21l-8-4.5v-9Z M4 7.5 12 12l8-4.5M12 12v9',
}

const SKILL_ICON = {
  'React.js': siReact,
  'React Native': siReact,
  'Next.js': siNextdotjs,
  HTML5: siHtml5,
  CSS3: siCss,
  Bootstrap: siBootstrap,
  'Tailwind CSS': siTailwindcss,
  'Node.js': siNodedotjs,
  'Express.js': siExpress,
  Laravel: siLaravel,
  PHP: siPhp,
  'REST APIs': { glyph: GLYPH.api, hex: '0EA5E9' },
  'JWT Auth': siJsonwebtokens,
  'JavaScript (ES6+)': siJavascript,
  TypeScript: siTypescript,
  MongoDB: siMongodb,
  MySQL: siMysql,
  PostgreSQL: siPostgresql,
  Kotlin: siKotlin,
  'Java (Android)': siOpenjdk,
  Gradle: siGradle,
  'Android App Bundle (AAB)': siAndroid,
  'Play Store Release': siGoogleplay,
  Git: siGit,
  GitHub: siGithub,
  Docker: siDocker,
  'AWS EC2/S3': { glyph: GLYPH.cloud, hex: 'FF9900' },
  'CI/CD Pipelines': siGithubactions,
  Linux: siLinux,
  Redux: siRedux,
  'Socket.IO': siSocketdotio,
  Firebase: siFirebase,
  Supabase: siSupabase,
  Zod: siZod,
  'Microsoft Azure (learning)': { glyph: GLYPH.cloud, hex: '0078D4' },
}

const GROUP_COLOR = {
  frontend: '#3b82f6',
  backend: '#22c55e',
  database: '#f59e0b',
  mobile: '#8b5cf6',
  devops: '#06b6d4',
  other: '#ec4899',
}

const GROUP_ICON = {
  frontend: 'M3 6.5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2Z M8 20h8M12 16.5V20',
  backend:
    'M5 4h14a1.5 1.5 0 0 1 1.5 1.5v3A1.5 1.5 0 0 1 19 10H5a1.5 1.5 0 0 1-1.5-1.5v-3A1.5 1.5 0 0 1 5 4Z M5 14h14a1.5 1.5 0 0 1 1.5 1.5v3A1.5 1.5 0 0 1 19 20H5a1.5 1.5 0 0 1-1.5-1.5v-3A1.5 1.5 0 0 1 5 14Z M7 7h.01M7 17h.01',
  database:
    'M4.5 6c0-1.5 3.4-2.7 7.5-2.7s7.5 1.2 7.5 2.7-3.4 2.7-7.5 2.7S4.5 7.5 4.5 6Z M4.5 6v12c0 1.5 3.4 2.7 7.5 2.7s7.5-1.2 7.5-2.7V6 M4.5 12c0 1.5 3.4 2.7 7.5 2.7s7.5-1.2 7.5-2.7',
  mobile: 'M9 2.5h6a2 2 0 0 1 2 2v15a2 2 0 0 1-2 2H9a2 2 0 0 1-2-2v-15a2 2 0 0 1 2-2Z M10.5 18.2h3',
  devops: 'M4 17 10 11 4 5M12 19h8',
  other: 'M12 3l2.6 5.6 6.1.7-4.5 4.2 1.2 6L12 16.6 6.6 19.5l1.2-6-4.5-4.2 6.1-.7Z',
}

// Near-black logos (Next.js, Express, GitHub…) would vanish on a dark card, so they use the text colour.
function isDark(hex) {
  const n = parseInt(hex, 16)
  const r = n >> 16
  const g = (n >> 8) & 255
  const b = n & 255
  return 0.2126 * r + 0.7152 * g + 0.0722 * b < 70
}

function SkillLogo({ name }) {
  const icon = SKILL_ICON[name]
  if (!icon) {
    return <span className="skill-chip__initial">{name[0]}</span>
  }

  const color = isDark(icon.hex) ? 'var(--text)' : `#${icon.hex}`
  return (
    <svg
      viewBox="0 0 24 24"
      width="18"
      height="18"
      aria-hidden="true"
      style={{ color }}
      {...(icon.glyph
        ? { fill: 'none', stroke: 'currentColor', strokeWidth: 1.9, strokeLinecap: 'round', strokeLinejoin: 'round' }
        : { fill: 'currentColor' })}
    >
      <path d={icon.glyph || icon.path} />
    </svg>
  )
}

function brandTint(name) {
  const icon = SKILL_ICON[name]
  if (!icon || isDark(icon.hex)) return undefined
  return `#${icon.hex}`
}

export default function Skills() {
  return (
    <section id="skills" className="section">
      <div className="container">
        <Reveal className="section__head">
          <p className="eyebrow">Technical Skills</p>
          <h2>Technologies I Work With</h2>
        </Reveal>

        <div className="skills-grid">
          {skillGroups.map((group, i) => (
            <Reveal
              as="div"
              key={group.key}
              className="skill-group"
              delay={i * 60}
              style={{ '--group': GROUP_COLOR[group.key] }}
            >
              <div className="skill-group__head">
                <span className="skill-group__icon">
                  <svg
                    viewBox="0 0 24 24"
                    width="20"
                    height="20"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.8"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    aria-hidden="true"
                  >
                    <path d={GROUP_ICON[group.key]} />
                  </svg>
                </span>
                <div>
                  <h3>{group.label}</h3>
                  <p className="skill-group__count">{group.items.length} skills</p>
                </div>
              </div>

              <ul className="skill-group__chips">
                {group.items.map((item) => (
                  <li
                    key={item}
                    className="skill-chip"
                    style={brandTint(item) ? { '--brand': brandTint(item) } : undefined}
                  >
                    <span className="skill-chip__logo">
                      <SkillLogo name={item} />
                    </span>
                    {item}
                  </li>
                ))}
              </ul>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}
