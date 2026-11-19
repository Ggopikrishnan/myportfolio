import { useReveal } from '../hooks/useReveal'
import './Reveal.css'

export default function Reveal({ children, className = '', delay = 0, variant, as: Tag = 'div', style, ...rest }) {
  const [ref, visible] = useReveal()

  return (
    <Tag
      ref={ref}
      className={`reveal${variant ? ` reveal--${variant}` : ''}${visible ? ' reveal--visible' : ''}${className ? ` ${className}` : ''}`}
      style={{ ...style, transitionDelay: `${delay}ms`, '--d': `${delay}ms` }}
      {...rest}
    >
      {children}
    </Tag>
  )
}
