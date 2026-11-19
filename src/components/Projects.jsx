import { useState } from 'react'
import { Link } from 'react-router-dom'
import { projects, projectCategories } from '../data/resume'
import { IconArrowRight, IconExternal, IconGooglePlay } from './Icons'
import ProjectThumb from './ProjectThumb'
import Reveal from './Reveal'
import { useTilt } from '../hooks/useTilt'
import './Projects.css'

export default function Projects() {
  const [category, setCategory] = useState('all')
  const tilt = useTilt(7)

  const visible = category === 'all' ? projects : projects.filter((p) => p.category === category)

  return (
    <section id="projects" className="section">
      <div className="container">
        <Reveal className="section__head" variant="slide-head">
          <p className="eyebrow">My Work</p>
          <h2>Featured Projects</h2>
        </Reveal>

        <div className="project-tabs">
          {projectCategories.map((cat, i) => (
            <button
              key={cat.key}
              type="button"
              className={`project-tab${category === cat.key ? ' project-tab--active' : ''}`}
              style={{ '--i': i }}
              onClick={() => setCategory(cat.key)}
            >
              {cat.label}
            </button>
          ))}
        </div>

        <div className="projects-grid" key={category}>
          {visible.map((project, i) => (
            <Reveal
              as="article"
              key={project.key}
              className="project-card tilt-3d"
              variant="flip"
              delay={i * 120}
              {...tilt}
            >
              <ProjectThumb project={project} />

              <h3 className="project-card__name">{project.name}</h3>
              <p className="project-card__desc">{project.description}</p>

              <div className="project-card__stack">
                {project.stack.map((tech, t) => (
                  <span key={tech} className="tag" style={{ '--t': t }}>
                    {tech}
                  </span>
                ))}
              </div>

              <div className="project-card__actions">
                <Link to={`/projects/${project.key}`} className="project-card__link">
                  View Project Details
                  <IconArrowRight />
                </Link>
                {project.live && (
                  <a
                    href={project.live}
                    target="_blank"
                    rel="noreferrer"
                    className="project-card__live"
                  >
                    Live Demo
                    <IconExternal />
                  </a>
                )}
                {project.playStore && (
                  <a
                    href={project.playStore}
                    target="_blank"
                    rel="noreferrer"
                    className="project-card__live project-card__play"
                  >
                    <IconGooglePlay />
                    Play Store
                  </a>
                )}
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}
