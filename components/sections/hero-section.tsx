"use client"

import { useEffect, useRef } from 'react'
import { Button } from "@/components/ui/button"
import { ArrowDown } from 'lucide-react'
import StarryBackground from '@/components/ui/starry-background'

export default function HeroSection() {
  const titleRef = useRef<HTMLHeadingElement>(null)
  const subtitleRef = useRef<HTMLParagraphElement>(null)
  const buttonRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('animate-in')
          }
        })
      },
      { threshold: 0.1 }
    )

    if (titleRef.current) observer.observe(titleRef.current)
    if (subtitleRef.current) observer.observe(subtitleRef.current)
    if (buttonRef.current) observer.observe(buttonRef.current)

    return () => {
      if (titleRef.current) observer.unobserve(titleRef.current)
      if (subtitleRef.current) observer.unobserve(subtitleRef.current)
      if (buttonRef.current) observer.unobserve(buttonRef.current)
    }
  }, [])

  return (
    <section id="hero" className="relative min-h-screen flex items-center justify-center overflow-hidden">
      <StarryBackground />
      
      <div className="relative z-10 max-w-4xl mx-auto text-center px-6">
        <h1 
          ref={titleRef}
          className="text-4xl md:text-6xl lg:text-7xl font-space font-bold mb-6 opacity-0 translate-y-8 transition-all duration-1000 ease-out"
        >
          Thanks Welcome to <span className="text-[#F2C1D1]">Portfolio!</span>
        </h1>
        
        <p 
          ref={subtitleRef}
          className="text-lg md:text-xl text-gray-300 mb-12 max-w-2xl mx-auto opacity-0 translate-y-8 transition-all duration-1000 delay-300 ease-out"
        >
          This is where my journey as an engineer begins
        </p>
        
        <div 
          ref={buttonRef}
          className="opacity-0 translate-y-8 transition-all duration-1000 delay-500 ease-out"
        >
          <Button 
            variant="outline" 
            size="lg"
            className="border-[#C9B6E4] text-[#C9B6E4] hover:bg-[#C9B6E4]/10 group"
            onClick={() => document.getElementById('about')?.scrollIntoView({ behavior: 'smooth' })}
          >
            Explore My Universe
            <ArrowDown className="ml-2 h-4 w-4 group-hover:animate-bounce" />
          </Button>
        </div>
      </div>
      
      <div className="absolute bottom-12 left-1/2 -translate-x-1/2 animate-bounce">
        <ArrowDown className="text-[#F2C1D1] h-6 w-6" />
      </div>
    </section>
  )
}