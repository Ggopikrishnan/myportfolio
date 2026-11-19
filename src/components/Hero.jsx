import { useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import { profile, experience } from '../data/resume'
import { IconGithub, IconLinkedIn, IconMail, IconArrowRight } from './Icons'
import { gmailComposeHref } from '../utils/mail'
import headshot from '../assets/gopi-headshot.webp'
import './Hero.css'

const DEVICON = 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons'

const innerOrbit = [
  { name: 'Flutter', icon: 'flutter/flutter-original.svg' },
  { name: 'Dart', icon: 'dart/dart-original.svg' },
  { name: 'Firebase', icon: 'firebase/firebase-original.svg' },
  { name: 'Android', icon: 'android/android-original.svg' },
]

const outerOrbit = [
  { name: 'Google Cloud', icon: 'googlecloud/googlecloud-original.svg' },
  { name: 'SQLite', icon: 'sqlite/sqlite-original.svg' },
  { name: 'Socket.IO', icon: 'socketio/socketio-original.svg' },
  { name: 'Git', icon: 'git/git-original.svg' },
  { name: 'Android Studio', icon: 'androidstudio/androidstudio-original.svg' },
  { name: 'VS Code', icon: 'vscode/vscode-original.svg' },
  { name: 'Figma', icon: 'figma/figma-original.svg' },
]

const roles = ['Flutter Developer', 'Mobile App Developer', 'Real-Time App Builder']

const terminalLines = [
  { kind: 'cmd', text: 'ask("what do you build?")' },
  { kind: 'out', text: 'Flutter apps for rides, billing & field service.' },
  { kind: 'cmd', text: 'stack.primary' },
  { kind: 'out', text: "['Flutter', 'Dart', 'GetX', 'Firebase']" },
]

const prefersReducedMotion = () =>
  typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches

function useTypewriter(words) {
  const [text, setText] = useState(words[0])

  useEffect(() => {
    if (prefersReducedMotion()) return undefined
    let word = 0
    let len = words[0].length
    let deleting = true
    let timer

    const tick = () => {
      let delay
      if (deleting) {
        len -= 1
        delay = 35
        if (len === 0) {
          deleting = false
          word = (word + 1) % words.length
          delay = 300
        }
      } else {
        len += 1
        delay = 70
        if (len === words[word].length) {
          deleting = true
          delay = 2200
        }
      }
      setText(words[word].slice(0, len))
      timer = setTimeout(tick, delay)
    }

    timer = setTimeout(tick, 2200)
    return () => clearTimeout(timer)
  }, [words])

  return text
}

function useTerminal(lines) {
  const [shown, setShown] = useState(() =>
    prefersReducedMotion() ? lines.map((l) => l.text) : [''],
  )

  useEffect(() => {
    if (prefersReducedMotion()) return undefined
    let line = 0
    let char = 0
    let timer

    const tick = () => {
      char += 1
      setShown((prev) => {
        const next = prev.slice(0, line)
        next[line] = lines[line].text.slice(0, char)
        return next
      })

      if (char < lines[line].text.length) {
        timer = setTimeout(tick, lines[line].kind === 'cmd' ? 55 : 18)
      } else if (line < lines.length - 1) {
        line += 1
        char = 0
        timer = setTimeout(tick, 450)
      } else {
        line = 0
        char = 0
        timer = setTimeout(() => {
          setShown([''])
          timer = setTimeout(tick, 400)
        }, 4000)
      }
    }

    timer = setTimeout(tick, 900)
    return () => clearTimeout(timer)
  }, [lines])

  return shown
}

function Orbit({ items, className, duration }) {
  return (
    <div className={`orbit ${className}`} style={{ '--dur': duration }} aria-hidden="true">
      {items.map((item, i) => (
        <span
          key={item.name}
          className="orbit__item"
          style={{ '--angle': `${(360 / items.length) * i}deg` }}
        >
          <span className="orbit__chip" title={item.name}>
            <img src={`${DEVICON}/${item.icon}`} alt="" loading="lazy" />
          </span>
        </span>
      ))}
    </div>
  )
}

export default function Hero() {
  const heroRef = useRef(null)
  const role = useTypewriter(roles)
  const terminal = useTerminal(terminalLines)

  const handlePointerMove = (e) => {
    const el = heroRef.current
    if (!el) return
    const rect = el.getBoundingClientRect()
    el.style.setProperty('--mx', `${e.clientX - rect.left}px`)
    el.style.setProperty('--my', `${e.clientY - rect.top}px`)
    if (e.pointerType !== 'mouse' || prefersReducedMotion()) return
    const nx = (e.clientX - rect.left) / rect.width - 0.5
    const ny = (e.clientY - rect.top) / rect.height - 0.5
    el.style.setProperty('--hry', `${nx * 16}deg`)
    el.style.setProperty('--hrx', `${ny * -12}deg`)
  }

  const handlePointerLeave = () => {
    const el = heroRef.current
    if (!el) return
    el.style.setProperty('--hry', '0deg')
    el.style.setProperty('--hrx', '0deg')
  }

  const stats = [
    { value: profile.experienceYears, label: 'Years experience' },
    { value: experience.length, label: 'Companies' },
    { value: profile.appsShipped, label: 'Apps shipped' },
  ]

  return (
    <section id="top" className="hero" ref={heroRef} onPointerMove={handlePointerMove} onPointerLeave={handlePointerLeave}>
      <div className="hero__bg" aria-hidden="true">
        <span className="hero__grid-lines" />
        <span className="hero__aurora hero__aurora--a" />
        <span className="hero__aurora hero__aurora--b" />
        <span className="hero__aurora hero__aurora--c" />
        <span className="hero__spotlight" />
      </div>

      <div className="container hero__layout">
        <div className="hero__main">
          <p className="hero__badge">
            <span className="hero__pulse" aria-hidden="true" />
            {profile.status} &middot; Flutter Developer
          </p>

          <p className="hero__greeting">Hello, I&rsquo;m</p>
          <h1 className="hero__name">
            {profile.firstName} <span className="hero__gradient">{profile.lastName}</span>
          </h1>

          <p className="hero__role" aria-label={roles[0]}>
            <span className="hero__role-prefix" aria-hidden="true">&gt;_</span>
            <span aria-hidden="true">{role}</span>
            <span className="hero__caret" aria-hidden="true" />
          </p>

          <p className="hero__intro">{profile.heroIntro}</p>

          <div className="hero__actions">
            <Link className="btn hero__btn-primary" to="/#projects">
              View My Projects
              <IconArrowRight />
            </Link>
            <Link className="btn hero__btn-ghost" to="/#contact">
              <IconMail />
              Contact Me
            </Link>
          </div>

          <dl className="hero__stats">
            {stats.map((s) => (
              <div key={s.label} className="hero__stat">
                <dt>{s.label}</dt>
                <dd>{s.value}</dd>
              </div>
            ))}
          </dl>

          <div className="hero__social">
            {profile.github && (
              <a href={profile.github} target="_blank" rel="noreferrer" aria-label="GitHub">
                <IconGithub />
              </a>
            )}
            {profile.linkedin && (
              <a href={profile.linkedin} target="_blank" rel="noreferrer" aria-label="LinkedIn">
                <IconLinkedIn />
              </a>
            )}
            <a href={gmailComposeHref(profile.email)} target="_blank" rel="noreferrer" aria-label="Email">
              <IconMail />
            </a>
          </div>
        </div>

        <div className="hero__visual">
          <div className="hero__orbits">
            <span className="orbit__ring orbit__ring--outer" aria-hidden="true" />
            <span className="orbit__ring orbit__ring--inner" aria-hidden="true" />
            <Orbit items={outerOrbit} className="orbit--outer" duration="60s" />
            <Orbit items={innerOrbit} className="orbit--inner" duration="38s" />

            <div className="hero__photo">
              <span className="hero__photo-ring" aria-hidden="true" />
              <img src={headshot} alt={`Portrait of ${profile.name}`} />
            </div>

            <span className="hero__chip hero__chip--ai" aria-hidden="true">
              <span className="hero__spark">&#10022;</span> Live GPS tracking
            </span>
            <span className="hero__chip hero__chip--api" aria-hidden="true">
              <span className="hero__dot" /> Offline-first &middot; synced
            </span>
          </div>

          <div className="hero__terminal" aria-hidden="true">
            <div className="hero__terminal-bar">
              <span />
              <span />
              <span />
              <p>gopi@flutter-dev: ~</p>
            </div>
            <div className="hero__terminal-body">
              {terminal.map((text, i) => (
                <p key={i} className={`hero__term-line hero__term-line--${terminalLines[i].kind}`}>
                  {terminalLines[i].kind === 'cmd' ? '❯ ' : '✦ '}
                  {text}
                  {i === terminal.length - 1 && <span className="hero__caret hero__caret--sm" />}
                </p>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
