"use client"

import { useEffect, useRef } from 'react'
import { cn } from '@/lib/utils'
import { ContactForm } from '@/components/contact/contact-form'
import { ContactInfo } from '@/components/contact/contact-info'

export default function ContactSection() {
  const titleRef = useRef<HTMLHeadingElement>(null)
  const contentRef = useRef<HTMLDivElement>(null)

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
    if (contentRef.current) observer.observe(contentRef.current)

    return () => {
      if (titleRef.current) observer.unobserve(titleRef.current)
      if (contentRef.current) observer.unobserve(contentRef.current)
    }
  }, [])

  return (
    <section 
      id="contact" 
      className="relative min-h-screen flex items-center py-24 px-6"
    >
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-[#0A1128]/90 via-[#0A1128] to-[#0A1128]"></div>
        <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#C9B6E4]/30 to-transparent"></div>
      </div>
      
      <div className="container mx-auto max-w-6xl relative z-10">
        <h2 
          ref={titleRef}
          className={cn(
            "text-3xl md:text-4xl font-space font-bold mb-12 text-center",
            "opacity-0 translate-y-8 transition-all duration-1000 ease-out"
          )}
        >
          <span className="relative inline-block">
            Let's Connect
            <span className="absolute -bottom-2 left-0 w-1/3 h-0.5 bg-[#F2C1D1]"></span>
          </span>
        </h2>
        
        <div 
          ref={contentRef}
          className={cn(
            "grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20",
            "opacity-0 translate-y-8 transition-all duration-1000 delay-300 ease-out"
          )}
        >
          <ContactForm />
          <ContactInfo />
        </div>
        
        <footer className="mt-24 text-center text-sm text-gray-400">
          <p>© {new Date().getFullYear()} Kasshii </p>
        </footer>
      </div>
    </section>
  )
}
