const canTilt = () =>
  typeof window !== 'undefined' &&
  window.matchMedia('(hover: hover) and (pointer: fine)').matches &&
  !window.matchMedia('(prefers-reduced-motion: reduce)').matches

// Pointer handlers that tilt the element towards the cursor in 3D.
// They only set CSS variables (--rx, --ry, --gx, --gy); the look lives in CSS.
export function useTilt(max = 10) {
  const onPointerMove = (e) => {
    if (e.pointerType !== 'mouse' || !canTilt()) return
    const el = e.currentTarget
    const r = el.getBoundingClientRect()
    const x = (e.clientX - r.left) / r.width
    const y = (e.clientY - r.top) / r.height
    el.style.setProperty('--ry', `${(x - 0.5) * 2 * max}deg`)
    el.style.setProperty('--rx', `${(0.5 - y) * 2 * max}deg`)
    el.style.setProperty('--gx', `${x * 100}%`)
    el.style.setProperty('--gy', `${y * 100}%`)
    el.classList.add('is-tilting')
  }

  const onPointerLeave = (e) => {
    const el = e.currentTarget
    el.style.setProperty('--rx', '0deg')
    el.style.setProperty('--ry', '0deg')
    el.classList.remove('is-tilting')
  }

  return { onPointerMove, onPointerLeave }
}
