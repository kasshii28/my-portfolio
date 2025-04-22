"use client"

import { useEffect, useRef } from 'react'
import { aboutText } from '@/lib/constants'
import Image from 'next/image'
import { cn } from '@/lib/utils'
import cat2 from '@/public/cat2.jpg'

export default function AboutSection() {
  const titleRef = useRef<HTMLHeadingElement>(null)
  const textRef = useRef<HTMLDivElement>(null)
  const imageRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('animate-in')
          }
        })
      },
      { threshold: 0.1, rootMargin: '0px 0px -100px 0px' }
    )

    if (titleRef.current) observer.observe(titleRef.current)
    if (textRef.current) observer.observe(textRef.current)
    if (imageRef.current) observer.observe(imageRef.current)

    return () => {
      if (titleRef.current) observer.unobserve(titleRef.current)
      if (textRef.current) observer.unobserve(textRef.current)
      if (imageRef.current) observer.unobserve(imageRef.current)
    }
  }, [])

  return (
    <section 
      id="about" 
      className="relative min-h-screen flex items-center py-24 px-6"
    >
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-[#0A1128] via-[#0A1128] to-[#0A1128]/90"></div>
        <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#C9B6E4]/30 to-transparent"></div>
        <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#B4CDED]/30 to-transparent"></div>
      </div>

      <div className="container mx-auto max-w-6xl relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          <div>
            <h2 
              ref={titleRef}
              className={cn(
                "text-3xl md:text-4xl font-space font-bold mb-8",
                "opacity-0 translate-y-8 transition-all duration-1000 ease-out"
              )}
            >
              <span className="relative inline-block">
                {aboutText.title}
                <span className="absolute -bottom-2 left-0 w-1/3 h-0.5 bg-[#F2C1D1]"></span>
              </span>
            </h2>
            
            <div 
              ref={textRef}
              className={cn(
                "text-gray-300 space-y-4 text-lg leading-relaxed",
                "opacity-0 translate-y-8 transition-all duration-1000 delay-300 ease-out"
              )}
            >
              {aboutText.content.split('\n\n').map((paragraph, i) => (
                <p key={i}>{paragraph}</p>
              ))}
            </div>
          </div>
          
          <div 
            ref={imageRef}
            className={cn(
              "relative aspect-square max-w-md mx-auto",
              "opacity-0 translate-x-8 transition-all duration-1000 delay-500 ease-out"
            )}
          >
            <div className="w-full h-full rounded-full overflow-hidden border-2 border-[#B4CDED]/30 p-1">
              <div className="w-full h-full rounded-full overflow-hidden relative">
                <Image 
                  src={cat2}
                  alt="Developer Portrait" 
                  sizes="(max-width: 768px) 100vw, 500px"
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-tr from-[#0A1128]/60 to-transparent"></div>
              </div>
            </div>
            
            <div className="absolute -top-4 -right-4 w-32 h-32 bg-[#F2C1D1]/10 rounded-full blur-xl"></div>
            <div className="absolute -bottom-4 -left-4 w-32 h-32 bg-[#B4CDED]/10 rounded-full blur-xl"></div>
          </div>
        </div>
      </div>
    </section>
  )
}