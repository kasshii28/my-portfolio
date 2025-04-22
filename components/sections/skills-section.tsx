"use client"

import { useState, useEffect, useRef } from 'react'
import { skills } from '@/lib/constants'
import { cn } from '@/lib/utils'
import ConstellationMap from '@/components/ui/constellation-map'

export default function SkillsSection() {
  const [selectedSkill, setSelectedSkill] = useState(skills[0])
  const titleRef = useRef<HTMLHeadingElement>(null)
  const mapRef = useRef<HTMLDivElement>(null)
  const infoRef = useRef<HTMLDivElement>(null)

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
    if (mapRef.current) observer.observe(mapRef.current)
    if (infoRef.current) observer.observe(infoRef.current)

    return () => {
      if (titleRef.current) observer.unobserve(titleRef.current)
      if (mapRef.current) observer.unobserve(mapRef.current)
      if (infoRef.current) observer.unobserve(infoRef.current)
    }
  }, [])

  return (
    <section 
      id="skills" 
      className="relative min-h-screen flex items-center py-24 px-6"
    >
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-[#0A1128]/90 via-[#0A1128] to-[#0A1128]/90"></div>
        <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#B4CDED]/30 to-transparent"></div>
        <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#F2C1D1]/30 to-transparent"></div>
      </div>
      
      <div className="container mx-auto max-w-6xl relative z-10">
        <h2 
          ref={titleRef}
          className={cn(
            "text-3xl md:text-4xl font-space font-bold mb-16 text-center",
            "opacity-0 translate-y-8 transition-all duration-1000 ease-out"
          )}
        >
          <span className="relative inline-block">
            My Constellation of Skills
            <span className="absolute -bottom-2 left-0 w-1/3 h-0.5 bg-[#B4CDED]"></span>
          </span>
        </h2>
        
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-12 items-center">
          <div 
            ref={mapRef}
            className={cn(
              "lg:col-span-3 relative order-2 lg:order-1",
              "opacity-0 translate-y-8 transition-all duration-1000 delay-300 ease-out"
            )}
          >
            <ConstellationMap 
              skills={skills} 
              selectedSkill={selectedSkill} 
              onSelectSkill={setSelectedSkill} 
            />
          </div>
          
          <div 
            ref={infoRef}
            className={cn(
              "lg:col-span-2 order-1 lg:order-2",
              "opacity-0 translate-x-8 transition-all duration-1000 delay-500 ease-out"
            )}
          >
            <div className="bg-[#0A1128]/50 backdrop-blur-sm border border-white/10 rounded-lg p-6 shadow-xl">
              <h3 className="text-2xl font-space font-bold mb-2 text-[#C9B6E4]">
                {selectedSkill.name}
              </h3>
              
              <div className="h-1 bg-white/10 rounded-full mb-4 overflow-hidden">
                <div 
                  className="h-full bg-gradient-to-r from-[#B4CDED] to-[#C9B6E4] rounded-full transition-all duration-1000 ease-out"
                  style={{ width: `${selectedSkill.level}%` }}
                ></div>
              </div>
              
              <p className="text-gray-300 mb-6">{selectedSkill.description}</p>
              
              <div className="inline-block bg-[#C9B6E4]/20 px-3 py-1 rounded-full text-sm text-[#C9B6E4]">
                {selectedSkill.group}
              </div>
            </div>
            
            <div className="mt-8">
              <h4 className="text-xl font-medium mb-4">All Skills</h4>
              <div className="flex flex-wrap gap-2">
                {skills.map((skill) => (
                  <button
                    key={skill.id}
                    onClick={() => setSelectedSkill(skill)}
                    className={cn(
                      "px-3 py-1 rounded-full text-sm transition-all",
                      selectedSkill.id === skill.id
                        ? "bg-[#C9B6E4] text-[#0A1128] font-medium"
                        : "bg-white/10 text-white/80 hover:bg-white/20"
                    )}
                  >
                    {skill.name}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}