import {
  siAndroid,
  siDart,
  siFirebase,
  siFlutter,
  siGit,
  siGooglemaps,
  siSocketdotio,
  siSqlite,
} from 'simple-icons'
import { skillGroups } from '../data/resume'
import Reveal from './Reveal'
import { useTilt } from '../hooks/useTilt'
import './Skills.css'

// Stroke glyphs for skills without a brand logo in simple-icons.
const GLYPH = {
  api: 'M8 7 3 12l5 5M16 7l5 5-5 5M13.5 5l-3 14',
  layers: 'M12 3 21 8l-9 5-9-5Z M3 12.5l9 5 9-5 M3 17l9 5 9-5',
  bell: 'M6 16V11a6 6 0 0 1 12 0v5l1.5 2h-15Z M10 20.5a2 2 0 0 0 4 0',
  pin: 'M12 21s-7-6.2-7-11.5a7 7 0 0 1 14 0C19 14.8 12 21 12 21Z M12 12a2.5 2.5 0 1 0 0-5 2.5 2.5 0 0 0 0 5Z',
  pulse: 'M3 12h4l2.5-6 5 12 2.5-6h4',
  box: 'M12 3 20 7.5v9L12 21l-8-4.5v-9Z M4 7.5 12 12l8-4.5M12 12v9',
  key: 'M14.5 4a5.5 5.5 0 1 0 0 11 5.5 5.5 0 0 0 0-11Z M10.5 13.5 3 21M6 18l2.5 2.5',
  printer: 'M7 9V3.5h10V9 M7 17H5a2 2 0 0 1-2-2v-4a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2v4a2 2 0 0 1-2 2h-2 M7 14h10v6.5H7Z',
  file: 'M14 3H7a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V8Z M14 3v5h5 M9 13h6M9 17h4',
  shield: 'M12 3 4.5 6v5.5c0 4.6 3.2 8.3 7.5 9.5 4.3-1.2 7.5-4.9 7.5-9.5V6Z M9 12l2 2 4-4',
  globe: 'M12 21a9 9 0 1 0 0-18 9 9 0 0 0 0 18Z M3.6 9h16.8M3.6 15h16.8 M12 3c2.5 2.5 3.8 5.5 3.8 9s-1.3 6.5-3.8 9c-2.5-2.5-3.8-5.5-3.8-9S9.5 5.5 12 3Z',
  scan: 'M4 8V5.5A1.5 1.5 0 0 1 5.5 4H8M16 4h2.5A1.5 1.5 0 0 1 20 5.5V8M20 16v2.5a1.5 1.5 0 0 1-1.5 1.5H16M8 20H5.5A1.5 1.5 0 0 1 4 18.5V16 M8 10h8M8 14h5',
}

const SKILL_ICON = {
  Flutter: siFlutter,
  Dart: siDart,
  Android: siAndroid,
  'MVC Architecture': { glyph: GLYPH.layers, hex: '6366F1' },
  GetX: { glyph: GLYPH.layers, hex: '8A2BE2' },
  Provider: { glyph: GLYPH.layers, hex: '0EA5E9' },
  BLoC: { glyph: GLYPH.box, hex: '14B8A6' },
  Riverpod: { glyph: GLYPH.layers, hex: '06B6D4' },
  'Firebase Authentication': { glyph: GLYPH.shield, hex: 'FFA000' },
  'Cloud Firestore': siFirebase,
  'Push Notifications': { glyph: GLYPH.bell, hex: 'F97316' },
  'RESTful APIs': { glyph: GLYPH.api, hex: '0EA5E9' },
  Dio: { glyph: GLYPH.api, hex: '0175C2' },
  'Socket.IO': siSocketdotio,
  'Google Maps': siGooglemaps,
  Geolocation: { glyph: GLYPH.pin, hex: 'EA4335' },
  'Live Location Tracking': { glyph: GLYPH.pulse, hex: '22C55E' },
  'Flutter Foreground Task': { glyph: GLYPH.pulse, hex: '02569B' },
  SQLite: siSqlite,
  Hive: { glyph: GLYPH.box, hex: 'FFA000' },
  SharedPreferences: { glyph: GLYPH.key, hex: '64748B' },
  Git: siGit,
  'Bluetooth Printer': { glyph: GLYPH.printer, hex: '0082FC' },
  'USB Printer': { glyph: GLYPH.printer, hex: '64748B' },
  'PDF Generation': { glyph: GLYPH.file, hex: 'DC2626' },
  'Multi-language (Localization)': { glyph: GLYPH.globe, hex: '0EA5E9' },
  'Multi-language Apps': { glyph: GLYPH.globe, hex: '0EA5E9' },
  'Text Recognition (OCR)': { glyph: GLYPH.scan, hex: '8B5CF6' },
}

const GROUP_ICON = {
  mobile: 'M9 2.5h6a2 2 0 0 1 2 2v15a2 2 0 0 1-2 2H9a2 2 0 0 1-2-2v-15a2 2 0 0 1 2-2Z M10.5 18.2h3',
  state: GLYPH.layers,
  backend:
    'M5 4h14a1.5 1.5 0 0 1 1.5 1.5v3A1.5 1.5 0 0 1 19 10H5a1.5 1.5 0 0 1-1.5-1.5v-3A1.5 1.5 0 0 1 5 4Z M5 14h14a1.5 1.5 0 0 1 1.5 1.5v3A1.5 1.5 0 0 1 19 20H5a1.5 1.5 0 0 1-1.5-1.5v-3A1.5 1.5 0 0 1 5 14Z M7 7h.01M7 17h.01',
  maps: GLYPH.pin,
  database:
    'M4.5 6c0-1.5 3.4-2.7 7.5-2.7s7.5 1.2 7.5 2.7-3.4 2.7-7.5 2.7S4.5 7.5 4.5 6Z M4.5 6v12c0 1.5 3.4 2.7 7.5 2.7s7.5-1.2 7.5-2.7V6 M4.5 12c0 1.5 3.4 2.7 7.5 2.7s7.5-1.2 7.5-2.7',
  devops: 'M4 17 10 11 4 5M12 19h8',
}

// Near-black logos (Next.js, Express, GitHub…) would vanish on a dark card, so they hover to the text colour.
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

  return (
    <svg
      viewBox="0 0 24 24"
      width="16"
      height="16"
      aria-hidden="true"
      {...(icon.glyph
        ? { fill: 'none', stroke: 'currentColor', strokeWidth: 1.9, strokeLinecap: 'round', strokeLinejoin: 'round' }
        : { fill: 'currentColor' })}
    >
      <path d={icon.glyph || icon.path} />
    </svg>
  )
}

// Brand colour for a logo; near-black logos fall back to the text colour so they stay visible in dark mode.
function brandColor(name) {
  const icon = SKILL_ICON[name]
  if (!icon || isDark(icon.hex)) return 'var(--text)'
  return `#${icon.hex}`
}

// Presentation-only details per group: card colour and a one-line summary.
const GROUP_META = {
  mobile: { color: '#0EA5E9', blurb: 'Production Flutter apps for real businesses' },
  state: { color: '#8B5CF6', blurb: 'Predictable, scalable app state' },
  backend: { color: '#F59E0B', blurb: 'Auth, data, push & real-time' },
  maps: { color: '#10B981', blurb: 'Live & background tracking' },
  database: { color: '#06B6D4', blurb: 'Offline-first, synced data' },
  devops: { color: '#EC4899', blurb: 'Printers, PDFs & tooling' },
}

// Mobile Development is not shown as a card; its skills still scroll in the marquee.
const BENTO_GROUPS = skillGroups.filter((g) => g.key !== 'mobile')

const ALL_SKILLS = [...new Set(skillGroups.flatMap((g) => g.items))]
const MARQUEE_ROWS = [
  ALL_SKILLS.filter((_, i) => i % 2 === 0),
  ALL_SKILLS.filter((_, i) => i % 2 === 1),
]

function Marquee() {
  return (
    <div className="skills-marquee" aria-hidden="true">
      {MARQUEE_ROWS.map((row, r) => (
        <div key={r} className={`skills-marquee__row${r === 1 ? ' skills-marquee__row--reverse' : ''}`}>
          <div className="skills-marquee__track">
            {[...row, ...row].map((item, i) => (
              <span key={`${item}-${i}`} className="skills-marquee__pill" style={{ '--brand': brandColor(item) }}>
                <SkillLogo name={item} />
                {item}
              </span>
            ))}
          </div>
        </div>
      ))}
    </div>
  )
}

export default function Skills() {
  const tilt = useTilt(10)

  return (
    <section id="skills" className="section skills-section">
      <div className="container">
        <Reveal className="section__head" variant="blur-head">
          <p className="eyebrow">Technical Skills</p>
          <h2>Technologies I Work With</h2>
        </Reveal>
      </div>

      <Marquee />

      <div className="container">
        <div className="skills-bento">
          {BENTO_GROUPS.map((group, i) => {
            const meta = GROUP_META[group.key] || { color: 'var(--accent)', blurb: '' }
            return (
              <Reveal
                as="div"
                key={group.key}
                className={`skill-card skill-card--${group.key} tilt-3d`}
                variant="zoom"
                {...tilt}
                delay={i * 110}
                style={{ '--side': i % 2 === 0 ? -1 : 1, '--card': meta.color }}
              >
                <span className="skill-card__glow" aria-hidden="true" />

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
                  <div className="skill-card__title">
                    <h3>{group.label}</h3>
                    <p>{meta.blurb}</p>
                  </div>
                  <span className="skill-card__count">{group.items.length}</span>
                </div>

                <ul className="skill-group__chips">
                  {group.items.map((item, c) => (
                    <li key={item} className="skill-chip" style={{ '--brand': brandColor(item), '--c': c }}>
                      <span className="skill-chip__icon">
                        <SkillLogo name={item} />
                      </span>
                      {item}
                    </li>
                  ))}
                </ul>
              </Reveal>
            )
          })}
        </div>
      </div>
    </section>
  )
}
