import { profile } from '../data/resume'
import { IconArrowLeft, IconArrowRight, IconCheck, IconGithub, IconGooglePlay } from './Icons'
import ProjectThumb from './ProjectThumb'
import ProjectGallery from './ProjectGallery'
import './ProjectDetail.css'

export default function ProjectDetail({ project, onBack }) {
  return (
    <div className="project-detail">
      <button type="button" className="project-detail__back" onClick={onBack}>
        <IconArrowLeft />
        Back to Projects
      </button>

      <div className="project-detail__top">
        <ProjectThumb project={project} size="lg" />

        <div className="project-detail__info">
          <h3>{project.name}</h3>
          <p className="project-detail__tagline">{project.tagline}</p>
          <p className="project-detail__desc">{project.description}</p>

          <div className="project-detail__stack">
            {project.stack.map((tech) => (
              <span key={tech} className="tag">
                {tech}
              </span>
            ))}
          </div>

          <div className="project-detail__links">
            {project.live && (
              <a className="btn btn--primary" href={project.live} target="_blank" rel="noreferrer">
                Live Demo
                <IconArrowRight />
              </a>
            )}
            {project.playStore && (
              <a className="btn btn--primary" href={project.playStore} target="_blank" rel="noreferrer">
                <IconGooglePlay />
                Get it on Google Play
              </a>
            )}
            {(project.github || profile.github) && (
              <a className="btn btn--ghost" href={project.github || profile.github} target="_blank" rel="noreferrer">
                <IconGithub />
                View on GitHub
              </a>
            )}
          </div>
        </div>
      </div>

      <div className="project-detail__grid">
        <div>
          <h4>My Contribution</h4>
          <ul className="project-detail__list">
            {project.contribution.map((item, i) => (
              <li key={i}>
                <IconCheck className="project-detail__check" />
                {item}
              </li>
            ))}
          </ul>
        </div>
        <div>
          <h4>Key Features</h4>
          <ul className="project-detail__list">
            {project.features.map((item, i) => (
              <li key={i}>
                <IconCheck className="project-detail__check" />
                {item}
              </li>
            ))}
          </ul>
        </div>
      </div>

      {project.highlights && (
        <div className="project-detail__highlights">
          <h4>Engineering Highlights</h4>
          <ul className="project-detail__list">
            {project.highlights.map((item) => (
              <li key={item.title}>
                <IconCheck className="project-detail__check" />
                <span>
                  <strong>{item.title}</strong> {item.text}
                </span>
              </li>
            ))}
          </ul>
        </div>
      )}

      <ProjectGallery galleries={project.galleries} />
    </div>
  )
}
