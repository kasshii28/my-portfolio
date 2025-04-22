"use client"

import { useState } from 'react'
import Image from 'next/image'
import { cn } from '@/lib/utils'
import { ArrowUpRight } from 'lucide-react'

interface Project {
  id: number
  title: string
  subtitle: string
  description: string
  technologies: string[]
  imageUrl: string
  link: string
}

interface ProjectCardProps {
  project: Project
  index: number
}

export default function ProjectCard({ project, index }: ProjectCardProps) {
  const [isHovered, setIsHovered] = useState(false)
  
  return (
    <div
      className={cn(
        "group relative overflow-hidden rounded-xl h-full transition-all duration-500",
        "border border-white/10 hover:border-[#C9B6E4]/50",
        "bg-[#0A1128]/50 hover:bg-[#0A1128]/80",
        "backdrop-blur-sm hover:backdrop-blur-lg"
      )}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      style={{
        transitionDelay: `${index * 100}ms`,
      }}
    >
      <div className="relative aspect-video overflow-hidden">
        <Image
          src={project.imageUrl}
          alt={project.title}
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          className={cn(
            "object-cover transition-all duration-700 ease-out",
            isHovered ? "scale-110 blur-sm" : "scale-100"
          )}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#0A1128] to-transparent opacity-90"></div>
      </div>
      
      <div className="p-6 relative z-10">
        <div className="flex justify-between items-start">
          <div>
            <h3 className="text-2xl font-space font-bold text-white">
              {project.title}
            </h3>
            <p className="text-[#C9B6E4]">{project.subtitle}</p>
          </div>
          
          <a
            href={project.link}
            target="_blank"
            rel="noopener noreferrer"
            className={cn(
              "p-2 rounded-full transition-all duration-300",
              "bg-white/10 hover:bg-[#F2C1D1] hover:text-[#0A1128]"
            )}
          >
            <ArrowUpRight className="h-5 w-5" />
          </a>
        </div>
        
        <p className="mt-4 text-gray-300 line-clamp-3">
          {project.description}
        </p>
        
        <div className="mt-6 flex flex-wrap gap-2">
          {project.technologies.map((tech, i) => (
            <span
              key={i}
              className="text-xs px-2 py-1 rounded-full bg-white/10 text-white/70"
            >
              {tech}
            </span>
          ))}
        </div>
      </div>
      
      <div 
        className={cn(
          "absolute inset-0 bg-gradient-to-br transition-opacity duration-500",
          "from-transparent to-[#C9B6E4]/10 pointer-events-none",
          isHovered ? "opacity-100" : "opacity-0"
        )}
      ></div>
    </div>
  )
}