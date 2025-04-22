"use client"

import { useEffect, useRef } from 'react'
import { cn } from '@/lib/utils'

interface Skill {
  id: number
  name: string
  level: number
  description: string
  group: string
}

interface ConstellationMapProps {
  skills: Skill[]
  selectedSkill: Skill
  onSelectSkill: (skill: Skill) => void
}

export default function ConstellationMap({ 
  skills, 
  selectedSkill, 
  onSelectSkill 
}: ConstellationMapProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const containerRef = useRef<HTMLDivElement>(null)
  const nodeRefs = useRef<Map<number, HTMLDivElement>>(new Map())

  // Calculate node positions
  useEffect(() => {
    if (!containerRef.current) return
    
    const container = containerRef.current
    const rect = container.getBoundingClientRect()
    const width = rect.width
    const height = rect.height
    
    // Arrange nodes in a circular pattern
    skills.forEach((skill, i) => {
      const node = nodeRefs.current.get(skill.id)
      if (!node) return
      
      // Arrange different skill groups in different areas
      let angle: number
      let radius: number
      
      switch (skill.group) {
        case 'frontend':
          angle = (i / (skills.length / 5)) * Math.PI * 0.5 + Math.PI * 0.25
          radius = Math.min(width, height) * 0.35
          break
        case 'backend':
          angle = (i / (skills.length / 5)) * Math.PI * 0.5 + Math.PI * 1.25
          radius = Math.min(width, height) * 0.3
          break
        case 'design':
          angle = (i / (skills.length / 5)) * Math.PI * 0.5 + Math.PI * 0.75
          radius = Math.min(width, height) * 0.25
          break
        case 'languages':
          angle = (i / (skills.length / 5)) * Math.PI * 0.5 + Math.PI * 1.75
          radius = Math.min(width, height) * 0.3
          break
        default:
          angle = (i / skills.length) * Math.PI * 2
          radius = Math.min(width, height) * 0.3
      }
      
      // Calculate position
      const x = width / 2 + radius * Math.cos(angle)
      const y = height / 2 + radius * Math.sin(angle)
      
      // Position the node
      node.style.left = `${x}px`
      node.style.top = `${y}px`
    })
  }, [skills])

  // Draw connections
  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas || !containerRef.current) return
    
    const container = containerRef.current
    const rect = container.getBoundingClientRect()
    
    // Set canvas dimensions
    canvas.width = rect.width
    canvas.height = rect.height
    
    const ctx = canvas.getContext('2d')
    if (!ctx) return
    
    // Clear canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height)
    
    // Draw connections between nodes
    ctx.strokeStyle = 'rgba(255, 255, 255, 0.1)'
    ctx.lineWidth = 1
    
    // Connect nodes by group
    const nodesByGroup = skills.reduce((acc, skill) => {
      if (!acc[skill.group]) {
        acc[skill.group] = []
      }
      acc[skill.group].push(skill)
      return acc
    }, {} as Record<string, Skill[]>)
    
    // Draw connections within each group
    Object.values(nodesByGroup).forEach(groupSkills => {
      for (let i = 0; i < groupSkills.length; i++) {
        const node1 = nodeRefs.current.get(groupSkills[i].id)
        if (!node1) continue
        
        for (let j = i + 1; j < groupSkills.length; j++) {
          const node2 = nodeRefs.current.get(groupSkills[j].id)
          if (!node2) continue
          
          const rect1 = node1.getBoundingClientRect()
          const rect2 = node2.getBoundingClientRect()
          
          const x1 = rect1.left - rect.left + rect1.width / 2
          const y1 = rect1.top - rect.top + rect1.height / 2
          
          const x2 = rect2.left - rect.left + rect2.width / 2
          const y2 = rect2.top - rect.top + rect2.height / 2
          
          ctx.beginPath()
          ctx.moveTo(x1, y1)
          ctx.lineTo(x2, y2)
          ctx.stroke()
        }
      }
    })
    
    // Highlight connections to selected skill
    ctx.strokeStyle = 'rgba(242, 193, 209, 0.5)' // Pink accent
    ctx.lineWidth = 2
    
    const selectedNode = nodeRefs.current.get(selectedSkill.id)
    if (selectedNode) {
      const selectedRect = selectedNode.getBoundingClientRect()
      const selectedX = selectedRect.left - rect.left + selectedRect.width / 2
      const selectedY = selectedRect.top - rect.top + selectedRect.height / 2
      
      // Connect to all nodes in the same group
      skills.forEach(skill => {
        if (skill.id !== selectedSkill.id && skill.group === selectedSkill.group) {
          const node = nodeRefs.current.get(skill.id)
          if (!node) return
          
          const nodeRect = node.getBoundingClientRect()
          const nodeX = nodeRect.left - rect.left + nodeRect.width / 2
          const nodeY = nodeRect.top - rect.top + nodeRect.height / 2
          
          ctx.beginPath()
          ctx.moveTo(selectedX, selectedY)
          ctx.lineTo(nodeX, nodeY)
          ctx.stroke()
        }
      })
    }
  }, [skills, selectedSkill])
  
  // Handle window resize
  useEffect(() => {
    const handleResize = () => {
      // Recalculate positions
      if (!containerRef.current) return
      
      const container = containerRef.current
      const rect = container.getBoundingClientRect()
      const width = rect.width
      const height = rect.height
      
      // Update canvas dimensions
      const canvas = canvasRef.current
      if (canvas) {
        canvas.width = width
        canvas.height = height
      }
    }
    
    window.addEventListener('resize', handleResize)
    return () => {
      window.removeEventListener('resize', handleResize)
    }
  }, [])

  return (
    <div 
      ref={containerRef} 
      className="relative w-full aspect-square max-w-xl mx-auto"
    >
      <canvas 
        ref={canvasRef} 
        className="absolute inset-0 w-full h-full z-0 pointer-events-none"
      ></canvas>
      
      {skills.map((skill) => (
        <div
          key={skill.id}
          ref={(el) => {
            if (el) nodeRefs.current.set(skill.id, el)
          }}
          className={cn(
            "absolute transform -translate-x-1/2 -translate-y-1/2 cursor-pointer transition-all duration-300",
            "flex items-center justify-center z-10"
          )}
          onClick={() => onSelectSkill(skill)}
        >
          <div
            className={cn(
              "w-4 h-4 rounded-full transition-all duration-300",
              selectedSkill.id === skill.id
                ? "bg-[#F2C1D1] scale-150"
                : "bg-white/50 hover:bg-white/80"
            )}
          />
          
          <div
            className={cn(
              "absolute whitespace-nowrap py-1 px-2 rounded transition-all duration-300",
              "backdrop-blur-sm text-sm",
              selectedSkill.id === skill.id
                ? "opacity-100 bg-[#F2C1D1]/10 border border-[#F2C1D1]/30 text-white font-medium"
                : "opacity-0 group-hover:opacity-100 bg-black/10"
            )}
            style={{
              transform: `translateY(${selectedSkill.id === skill.id ? -30 : -20}px)`,
            }}
          >
            {skill.name}
          </div>
        </div>
      ))}
    </div>
  )
}