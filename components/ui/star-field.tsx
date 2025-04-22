"use client"

import { useEffect, useRef } from 'react'

interface StarFieldProps {
  speed?: number
}

export default function StarField({ speed = 0.5 }: StarFieldProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext('2d')
    if (!ctx) return

    // Set canvas dimensions
    const resizeCanvas = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
    }

    resizeCanvas()
    window.addEventListener('resize', resizeCanvas)

    // Create stars
    class Star {
      x: number
      y: number
      z: number
      pz: number // previous z position

      constructor() {
        this.x = Math.random() * canvas.width - canvas.width / 2
        this.y = Math.random() * canvas.height - canvas.height / 2
        this.z = Math.random() * 1000
        this.pz = this.z
      }

      update() {
        this.pz = this.z
        this.z -= speed
        
        if (this.z < 1) {
          this.z = 1000
          this.x = Math.random() * canvas.width - canvas.width / 2
          this.y = Math.random() * canvas.height - canvas.height / 2
          this.pz = this.z
        }
      }

      draw() {
        if (!ctx) return
        
        const sx = (this.x / this.z) * 300 + canvas.width / 2
        const sy = (this.y / this.z) * 300 + canvas.height / 2
        
        const px = (this.x / this.pz) * 300 + canvas.width / 2
        const py = (this.y / this.pz) * 300 + canvas.height / 2
        
        const size = Math.max(0.5, (1000 - this.z) / 1000 * 2)
        const opacity = (1000 - this.z) / 1000
        
        ctx.beginPath()
        ctx.moveTo(px, py)
        ctx.lineTo(sx, sy)
        ctx.strokeStyle = `rgba(255, 255, 255, ${opacity})`
        ctx.lineWidth = size
        ctx.stroke()
        
        ctx.beginPath()
        ctx.arc(sx, sy, size / 2, 0, Math.PI * 2)
        ctx.fillStyle = `rgba(255, 255, 255, ${opacity})`
        ctx.fill()
      }
    }

    // Create stars
    const numStars = 200
    const stars: Star[] = []
    
    for (let i = 0; i < numStars; i++) {
      stars.push(new Star())
    }

    // Animation loop
    const animate = () => {
      if (!ctx) return
      
      ctx.fillStyle = 'rgba(10, 17, 40, 0.3)' // Semi-transparent to create trail effect
      ctx.fillRect(0, 0, canvas.width, canvas.height)
      
      stars.forEach(star => {
        star.update()
        star.draw()
      })
      
      requestAnimationFrame(animate)
    }

    animate()

    // Cleanup
    return () => {
      window.removeEventListener('resize', resizeCanvas)
    }
  }, [speed])

  return (
    <canvas 
      ref={canvasRef} 
      className="absolute inset-0 w-full h-full pointer-events-none z-0"
    ></canvas>
  )
}