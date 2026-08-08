import { useEffect, useRef } from 'react'
import * as THREE from 'three'

export default function Hyperspeed({ effectOptions = {} }) {
  const containerRef = useRef(null)

  useEffect(() => {
    const container = containerRef.current
    if (!container) return

    // Setup Scene, Camera, Renderer
    const scene = new THREE.Scene()
    const camera = new THREE.PerspectiveCamera(
      effectOptions.fov || 90,
      container.clientWidth / container.clientHeight,
      0.1,
      1000
    )
    camera.position.set(0, 2, 0)

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true })
    renderer.setSize(container.clientWidth, container.clientHeight)
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
    container.appendChild(renderer.domElement)

    // Colors & Config
    const length = effectOptions.length || 400
    const roadWidth = effectOptions.roadWidth || 10
    const lightSticksCount = effectOptions.totalSideLightSticks || 20
    const cyanColor = new THREE.Color(0x06b6d4)
    const violetColor = new THREE.Color(0x8b5cf6)

    // Road Grid
    const gridHelper = new THREE.GridHelper(length, 40, cyanColor, new THREE.Color(0x1e293b))
    gridHelper.position.z = -length / 2
    scene.add(gridHelper)

    // Side Light Sticks (Instanced Mesh for Performance)
    const stickGeo = new THREE.CylinderGeometry(0.08, 0.08, 2.5, 8)
    const stickMat = new THREE.MeshBasicMaterial({ color: cyanColor })
    const leftSticks = new THREE.InstancedMesh(stickGeo, stickMat, lightSticksCount)
    const rightSticks = new THREE.InstancedMesh(stickGeo, stickMat, lightSticksCount)

    const dummy = new THREE.Object3D()
    for (let i = 0; i < lightSticksCount; i++) {
      const zPos = -(i * (length / lightSticksCount))
      
      // Left side sticks
      dummy.position.set(-roadWidth / 2 - 0.5, 1.25, zPos)
      dummy.updateMatrix()
      leftSticks.setMatrixAt(i, dummy.matrix)

      // Right side sticks
      dummy.position.set(roadWidth / 2 + 0.5, 1.25, zPos)
      dummy.updateMatrix()
      rightSticks.setMatrixAt(i, dummy.matrix)
    }
    scene.add(leftSticks)
    scene.add(rightSticks)

    // Moving Speed Line Rays (Car Lights Effect)
    const lineCount = 60
    const lineGeo = new THREE.BufferGeometry()
    const positions = new Float32Array(lineCount * 6)
    const colors = new Float32Array(lineCount * 6)

    for (let i = 0; i < lineCount; i++) {
      const isLeft = Math.random() > 0.5
      const x = isLeft
        ? -roadWidth / 2 + Math.random() * (roadWidth / 2 - 0.5)
        : 0.5 + Math.random() * (roadWidth / 2 - 0.5)
      const z = -Math.random() * length
      const lineLen = 15 + Math.random() * 25

      positions[i * 6] = x
      positions[i * 6 + 1] = 0.2
      positions[i * 6 + 2] = z

      positions[i * 6 + 3] = x
      positions[i * 6 + 4] = 0.2
      positions[i * 6 + 5] = z - lineLen

      const col = isLeft ? violetColor : cyanColor
      colors[i * 6] = col.r
      colors[i * 6 + 1] = col.g
      colors[i * 6 + 2] = col.b
      colors[i * 6 + 3] = col.r
      colors[i * 6 + 4] = col.g
      colors[i * 6 + 5] = col.b
    }

    lineGeo.setAttribute('position', new THREE.BufferAttribute(positions, 3))
    lineGeo.setAttribute('color', new THREE.BufferAttribute(colors, 3))

    const lineMat = new THREE.LineBasicMaterial({
      vertexColors: true,
      transparent: true,
      opacity: 0.85,
      linewidth: 2,
    })
    const speedLines = new THREE.LineSegments(lineGeo, lineMat)
    scene.add(speedLines)

    // Animation Loop
    let animationFrameId
    const speed = effectOptions.speedUp || 2.5

    const animate = () => {
      // Move speed lines toward camera
      const posAttr = lineGeo.attributes.position
      const posArray = posAttr.array

      for (let i = 0; i < lineCount; i++) {
        posArray[i * 6 + 2] += speed * 1.5
        posArray[i * 6 + 5] += speed * 1.5

        // Reset line position when past camera
        if (posArray[i * 6 + 5] > 10) {
          const lineLen = 15 + Math.random() * 25
          const z = -length
          posArray[i * 6 + 2] = z
          posArray[i * 6 + 5] = z - lineLen
        }
      }
      posAttr.needsUpdate = true

      renderer.render(scene, camera)
      animationFrameId = requestAnimationFrame(animate)
    }

    animate()

    // Handle Resize
    const handleResize = () => {
      if (!container) return
      camera.aspect = container.clientWidth / container.clientHeight
      camera.updateProjectionMatrix()
      renderer.setSize(container.clientWidth, container.clientHeight)
    }

    window.addEventListener('resize', handleResize)

    // Cleanup
    return () => {
      cancelAnimationFrame(animationFrameId)
      window.removeEventListener('resize', handleResize)
      if (container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement)
      }
      renderer.dispose()
    }
  }, [effectOptions])

  return <div ref={containerRef} className="h-full w-full pointer-events-none" />
}