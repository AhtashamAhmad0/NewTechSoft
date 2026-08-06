import { useEffect, useRef } from 'react'

export default function CursorGrid({
  color = '#D946EF',
  secondaryColor = '#06B6D4',
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
    const mouseRadius = 180

    const updateSize = () => {
      const rect = canvas.getBoundingClientRect()
      width = canvas.width = rect.width
      height = canvas.height = rect.height
      initParticles()
    }

    const initParticles = () => {
      particles = []
      for (let i = 0; i < particleCount; i++) {
        particles.push({
          x: Math.random() * width,
          y: Math.random() * height,
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
    window.addEventListener('click', handleClick)
    document.addEventListener('mouseleave', handleMouseLeave)

    updateSize()

    const draw = () => {
      ctx.clearRect(0, 0, width, height)

      // 1. Render & update shockwave pulses on click
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
        ctx.lineWidth = 2
        ctx.globalAlpha = Math.max(0, p.opacity)
        ctx.stroke()
      }

      // 2. Render background ambient grid mesh
      ctx.globalAlpha = 0.03
      ctx.strokeStyle = '#ffffff'
      ctx.lineWidth = 1
      const gridSize = 60
      for (let x = 0; x < width; x += gridSize) {
        ctx.beginPath()
        ctx.moveTo(x, 0)
        ctx.lineTo(x, height)
        ctx.stroke()
      }
      for (let y = 0; y < height; y += gridSize) {
        ctx.beginPath()
        ctx.moveTo(0, y)
        ctx.lineTo(width, y)
        ctx.stroke()
      }

      // 3. Update & Render interactive particle constellation
      for (let i = 0; i < particles.length; i++) {
        const p = particles[i]

        // Move particles
        p.x += p.vx
        p.y += p.vy

        // Bounce from walls
        if (p.x < 0 || p.x > width) p.vx *= -1
        if (p.y < 0 || p.y > height) p.vy *= -1

        // Mouse interaction (Physics displacement)
        const dx = p.x - mouse.x
        const dy = p.y - mouse.y
        const dist = Math.sqrt(dx * dx + dy * dy)

        if (mouse.active && dist < mouseRadius) {
          const force = (1 - dist / mouseRadius) * 2.5
          const angle = Math.atan2(dy, dx)
          p.x += Math.cos(angle) * force
          p.y += Math.sin(angle) * force
          p.radius = p.baseRadius + (1 - dist / mouseRadius) * 3
        } else {
          p.radius = p.baseRadius
        }

        // Draw particle dot
        ctx.beginPath()
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2)
        ctx.fillStyle = dist < mouseRadius && mouse.active ? secondaryColor : color
        ctx.globalAlpha = dist < mouseRadius && mouse.active ? 0.9 : 0.4
        ctx.fill()

        // Connect particles with line network
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
            ctx.lineWidth = 1
            ctx.globalAlpha = lineAlpha
            ctx.stroke()
          }
        }

        // Connect particles directly to cursor when nearby
        if (mouse.active && dist < mouseRadius) {
          const lineAlpha = (1 - dist / mouseRadius) * 0.7
          ctx.beginPath()
          ctx.moveTo(p.x, p.y)
          ctx.lineTo(mouse.x, mouse.y)
          ctx.strokeStyle = secondaryColor
          ctx.lineWidth = 1.2
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
      window.removeEventListener('click', handleClick)
      document.removeEventListener('mouseleave', handleMouseLeave)
      cancelAnimationFrame(animationFrameId)
    }
  }, [color, secondaryColor])

  return <canvas ref={canvasRef} className="absolute inset-0 block h-full w-full" />
}