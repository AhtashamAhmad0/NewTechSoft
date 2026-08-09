import { useEffect, useRef } from 'react'

export default function CursorGrid({
  color = '#D946EF',
  secondaryColor = '#06B6D4',
  cellSize = 60,
  radius = 180,
  lineWidth = 1.2,
  clickPulse = true,
}) {
  const canvasRef = useRef(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    let animationFrameId

    let width = 0
    let height = 0
    let mouse = { x: -1000, y: -1000, active: false }
    let particles = []
    let pulses = []

    const particleCount = 75
    const connectDistance = 130

    const updateSize = () => {
      const parent = canvas.parentElement
      const dpr = window.devicePixelRatio || 1

      // Direct fallback to window or parent element dimensions
      const cssWidth = parent?.clientWidth || window.innerWidth
      const cssHeight = parent?.clientHeight || window.innerHeight

      width = cssWidth
      height = cssHeight

      canvas.width = cssWidth * dpr
      canvas.height = cssHeight * dpr

      ctx.scale(dpr, dpr)
      initParticles()
    }

    const initParticles = () => {
      particles = []
      for (let i = 0; i < particleCount; i++) {
        particles.push({
          x: Math.random() * (width || window.innerWidth),
          y: Math.random() * (height || 600),
          vx: (Math.random() - 0.5) * 0.8,
          vy: (Math.random() - 0.5) * 0.8,
          baseRadius: Math.random() * 2 + 1,
          radius: Math.random() * 2 + 1,
        })
      }
    }

    const handleMouseMove = (e) => {
      const rect = canvas.getBoundingClientRect()
      mouse.x = e.clientX - rect.left
      mouse.y = e.clientY - rect.top
      mouse.active = true
    }

    const handleMouseLeave = () => {
      mouse.active = false
    }

    const handleClick = (e) => {
      if (!clickPulse) return
      const rect = canvas.getBoundingClientRect()
      pulses.push({
        x: e.clientX - rect.left,
        y: e.clientY - rect.top,
        radius: 0,
        maxRadius: 220,
        opacity: 1,
      })
    }

    window.addEventListener('resize', updateSize)
    window.addEventListener('mousemove', handleMouseMove)
    if (clickPulse) window.addEventListener('click', handleClick)
    document.addEventListener('mouseleave', handleMouseLeave)

    updateSize()

    const draw = () => {
      ctx.clearRect(0, 0, width, height)

      // 1. Pulses on Click
      for (let i = pulses.length - 1; i >= 0; i--) {
        const p = pulses[i]
        p.radius += 6
        p.opacity -= 0.025

        if (p.opacity <= 0) {
          pulses.splice(i, 1)
          continue
        }

        ctx.beginPath()
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2)
        ctx.strokeStyle = secondaryColor
        ctx.lineWidth = lineWidth
        ctx.globalAlpha = Math.max(0, p.opacity)
        ctx.stroke()
      }

      // 2. Ambient background grid
      ctx.globalAlpha = 0.18
      ctx.strokeStyle = '#ffffff'
      ctx.lineWidth = 1
      for (let x = 0; x < width; x += cellSize) {
        ctx.beginPath()
        ctx.moveTo(x, 0)
        ctx.lineTo(x, height)
        ctx.stroke()
      }
      for (let y = 0; y < height; y += cellSize) {
        ctx.beginPath()
        ctx.moveTo(0, y)
        ctx.lineTo(width, y)
        ctx.stroke()
      }

      // 3. Interactive Particles Network
      for (let i = 0; i < particles.length; i++) {
        const p = particles[i]

        p.x += p.vx
        p.y += p.vy

        if (p.x < 0 || p.x > width) p.vx *= -1
        if (p.y < 0 || p.y > height) p.vy *= -1

        const dx = p.x - mouse.x
        const dy = p.y - mouse.y
        const dist = Math.sqrt(dx * dx + dy * dy)

        if (mouse.active && dist < radius) {
          const force = (1 - dist / radius) * 2.5
          const angle = Math.atan2(dy, dx)
          p.x += Math.cos(angle) * force
          p.y += Math.sin(angle) * force
          p.radius = p.baseRadius + (1 - dist / radius) * 3
        } else {
          p.radius = p.baseRadius
        }

        ctx.beginPath()
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2)
        ctx.fillStyle = dist < radius && mouse.active ? secondaryColor : color
        ctx.globalAlpha = dist < radius && mouse.active ? 0.9 : 0.6
        ctx.fill()

        for (let j = i + 1; j < particles.length; j++) {
          const p2 = particles[j]
          const pdx = p.x - p2.x
          const pdy = p.y - p2.y
          const pDist = Math.sqrt(pdx * pdx + pdy * pdy)

          if (pDist < connectDistance) {
            const lineAlpha = (1 - pDist / connectDistance) * 0.35
            ctx.beginPath()
            ctx.moveTo(p.x, p.y)
            ctx.lineTo(p2.x, p2.y)
            ctx.strokeStyle = color
            ctx.lineWidth = lineWidth
            ctx.globalAlpha = lineAlpha
            ctx.stroke()
          }
        }

        if (mouse.active && dist < radius) {
          const lineAlpha = (1 - dist / radius) * 0.7
          ctx.beginPath()
          ctx.moveTo(p.x, p.y)
          ctx.lineTo(mouse.x, mouse.y)
          ctx.strokeStyle = secondaryColor
          ctx.lineWidth = lineWidth
          ctx.globalAlpha = lineAlpha
          ctx.stroke()
        }
      }

      ctx.globalAlpha = 1
      animationFrameId = requestAnimationFrame(draw)
    }

    animationFrameId = requestAnimationFrame(draw)

    return () => {
      window.removeEventListener('resize', updateSize)
      window.removeEventListener('mousemove', handleMouseMove)
      if (clickPulse) window.removeEventListener('click', handleClick)
      document.removeEventListener('mouseleave', handleMouseLeave)
      cancelAnimationFrame(animationFrameId)
    }
  }, [color, secondaryColor, cellSize, radius, lineWidth, clickPulse])

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        display: 'block',
        pointerEvents: 'none',
        zIndex: 1,
      }}
    />
  )
}