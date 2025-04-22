"use client"

import { useEffect, useRef } from 'react'
import { projects } from '@/lib/constants'
import { cn } from '@/lib/utils'
import { Swiper, SwiperSlide } from 'swiper/react'
import { EffectCoverflow, Navigation, Pagination } from 'swiper/modules'
import 'swiper/css'
import 'swiper/css/effect-coverflow'
import 'swiper/css/navigation'
import 'swiper/css/pagination'

export default function ProjectsSection() {
  const titleRef = useRef<HTMLHeadingElement>(null)
  const projectsRef = useRef<HTMLDivElement>(null)

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
    if (projectsRef.current) observer.observe(projectsRef.current)

    return () => {
      if (titleRef.current) observer.unobserve(titleRef.current)
      if (projectsRef.current) observer.unobserve(projectsRef.current)
    }
  }, [])

  return (
    <section 
      id="projects" 
      className="relative min-h-screen flex items-center py-24 px-6"
    >
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-[#0A1128]/90 via-[#0A1128] to-[#0A1128]/90"></div>
        <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#F2C1D1]/30 to-transparent"></div>
        <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#C9B6E4]/30 to-transparent"></div>
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
            Featured Projects
            <span className="absolute -bottom-2 left-0 w-1/3 h-0.5 bg-[#C9B6E4]"></span>
          </span>
        </h2>
        
        <div 
          ref={projectsRef}
          className={cn(
            "opacity-0 translate-y-8 transition-all duration-1000 delay-300 ease-out"
          )}
        >
          <Swiper
            effect="coverflow"
            grabCursor={true}
            centeredSlides={true}
            slidesPerView="auto"
            coverflowEffect={{
              rotate: 50,
              stretch: 0,
              depth: 100,
              modifier: 1,
              slideShadows: true,
            }}
            modules={[EffectCoverflow, Navigation, Pagination]}
            className="pb-12"
            navigation
            pagination={{ clickable: true }}
          >
            {projects.map((project) => (
              <SwiperSlide 
                key={project.id}
                className="max-w-sm"
              >
                <div className="bg-white/5 rounded-lg overflow-hidden border border-white/10 hover:border-[#C9B6E4]/50 transition-all">
                  <div className="aspect-video relative overflow-hidden">
                    <img 
                      src={project.imageUrl} 
                      alt={project.title}
                      className="object-cover w-full h-full transform hover:scale-110 transition-transform duration-500"
                    />
                  </div>
                  <div className="p-6">
                    <h3 className="text-xl font-space font-semibold mb-1">{project.title}</h3>
                    <p className="text-sm text-[#C9B6E4] mb-3">{project.subtitle}</p>
                    <p className="text-gray-400 mb-4">{project.description}</p>
                    <div className="flex flex-wrap gap-2">
                      {project.technologies.map((tech, index) => (
                        <span 
                          key={index}
                          className="text-xs bg-white/10 text-white/80 px-2 py-1 rounded-full"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </div>
    </section>
  )
}