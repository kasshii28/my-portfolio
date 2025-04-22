"use client"

import { useEffect, useRef } from 'react'

export default function StarryBackground() {
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
      radius: number
      color: string
      opacity: number
      direction: number
      speed: number

      constructor() {
        this.x = Math.random() * canvas.width
        this.y = Math.random() * canvas.height
        this.radius = Math.random() * 1.5
        this.color = '#ffffff'
        this.opacity = Math.random() * 0.8 + 0.2 // Between 0.2 and 1
        this.direction = Math.random() * Math.PI * 2 // Random direction in radians
        this.speed = Math.random() * 0.05 + 0.02 // Random speed
      }

      draw() {
        if (!ctx) return
        
        ctx.beginPath()
        ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2)
        ctx.fillStyle = this.color
        ctx.globalAlpha = this.opacity
        ctx.fill()
      }

      update() {
        // Very subtle movement
        this.x += Math.cos(this.direction) * this.speed
        this.y += Math.sin(this.direction) * this.speed

        // Twinkle effect - subtly change opacity
        this.opacity += Math.random() * 0.02 - 0.01 // Random value between -0.01 and 0.01
        this.opacity = Math.max(0.2, Math.min(1, this.opacity)) // Keep between 0.2 and 1

        // If star moves off canvas, reset it
        if (this.x < 0 || this.x > canvas.width || this.y < 0 || this.y > canvas.height) {
          this.x = Math.random() * canvas.width
          this.y = Math.random() * canvas.height
          this.direction = Math.random() * Math.PI * 2
        }

        this.draw()
      }
    }

    // Create constellation effect
    class Constellation {
      stars: Star[]
      lineOpacity: number

      constructor(stars: Star[]) {
        this.stars = stars
        this.lineOpacity = 0.05 // Very subtle connections
      }

      draw() {
        if (!ctx) return
        
        for (let i = 0; i < this.stars.length; i++) {
          for (let j = i + 1; j < this.stars.length; j++) {
            const star1 = this.stars[i]
            const star2 = this.stars[j]
            
            // Calculate distance between stars
            const distance = Math.sqrt(
              Math.pow(star1.x - star2.x, 2) + 
              Math.pow(star1.y - star2.y, 2)
            )
            
            // Only draw lines between stars that are close
            if (distance < 100) {
              // Opacity decreases with distance
              const opacity = this.lineOpacity * (1 - distance / 100)
              
              ctx.beginPath()
              ctx.moveTo(star1.x, star1.y)
              ctx.lineTo(star2.x, star2.y)
              ctx.strokeStyle = '#ffffff'
              ctx.globalAlpha = opacity
              ctx.stroke()
            }
          }
        }
      }
    }

    // Create stars and constellation
    const numStars = Math.floor((canvas.width * canvas.height) / 5000) // Adjust density
    const stars: Star[] = []
    
    for (let i = 0; i < numStars; i++) {
      stars.push(new Star())
    }
    
    const constellation = new Constellation(stars)

    // Animation loop
    const animate = () => {
      if (!ctx) return
      
      ctx.clearRect(0, 0, canvas.width, canvas.height)
      
      // Draw constellation first (so it's behind stars)
      constellation.draw()
      
      // Draw and update stars
      stars.forEach(star => star.update())
      
      requestAnimationFrame(animate)
    }

    animate()

    // Cleanup
    return () => {
      window.removeEventListener('resize', resizeCanvas)
    }
  }, [])

  return (
    <canvas 
      ref={canvasRef} 
      className="absolute inset-0 w-full h-full pointer-events-none z-0"
    ></canvas>
  )
}