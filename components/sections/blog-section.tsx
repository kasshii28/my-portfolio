"use client"

import { useEffect, useRef, useState } from 'react'
import { cn } from '@/lib/utils'
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Swiper, SwiperSlide } from 'swiper/react'
import { EffectCoverflow, Navigation, Pagination } from 'swiper/modules'
import 'swiper/css'
import 'swiper/css/effect-coverflow'
import 'swiper/css/navigation'
import 'swiper/css/pagination'

const technicalBlogs = [
  {
    id: 1,
    title: "Understanding React Server Components",
    date: "2024-03-15",
    excerpt: "A deep dive into the future of React with Server Components...",
    image: "https://images.pexels.com/photos/11035471/pexels-photo-11035471.jpeg"
  },
  {
    id: 2,
    title: "The Power of TypeScript",
    date: "2024-03-10",
    excerpt: "Why TypeScript is becoming the standard for modern web development...",
    image: "https://images.pexels.com/photos/4164418/pexels-photo-4164418.jpeg"
  },
  {
    id: 3,
    title: "Next.js 14 Features",
    date: "2024-03-05",
    excerpt: "Exploring the latest features in Next.js 14...",
    image: "https://images.pexels.com/photos/11035380/pexels-photo-11035380.jpeg"
  }
]

const creativeBlogs = [
  {
    id: 1,
    title: "Design Systems in Practice",
    date: "2024-03-12",
    excerpt: "Creating cohesive design systems for modern applications...",
    image: "https://images.pexels.com/photos/196644/pexels-photo-196644.jpeg"
  },
  {
    id: 2,
    title: "The Art of Animation",
    date: "2024-03-08",
    excerpt: "Crafting meaningful animations for better user experiences...",
    image: "https://images.pexels.com/photos/1191710/pexels-photo-1191710.jpeg"
  },
  {
    id: 3,
    title: "Color Theory in Web Design",
    date: "2024-03-03",
    excerpt: "Understanding and applying color theory in web applications...",
    image: "https://images.pexels.com/photos/1037999/pexels-photo-1037999.jpeg"
  }
]

export default function BlogSection() {
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
      { threshold: 0.1 }
    )

    if (titleRef.current) observer.observe(titleRef.current)
    if (contentRef.current) observer.observe(contentRef.current)

    return () => {
      if (titleRef.current) observer.unobserve(titleRef.current)
      if (contentRef.current) observer.unobserve(contentRef.current)
    }
  }, [])

  const swiperConfig: any = {
    effect: "coverflow",
    grabCursor: true,
    centeredSlides: true,
    slidesPerView: "auto",
    coverflowEffect: {
      rotate: 50,
      stretch: 0,
      depth: 100,
      modifier: 1,
      slideShadows: true,
    },
    modules: [EffectCoverflow, Navigation, Pagination],
    className: "pb-12",
    navigation: true,
    pagination: { clickable: true }
  }

  return (
    <section 
      id="blog" 
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
            Latest Thoughts
            <span className="absolute -bottom-2 left-0 w-1/3 h-0.5 bg-[#B4CDED]"></span>
          </span>
        </h2>

        <div 
          ref={contentRef}
          className={cn(
            "opacity-0 translate-y-8 transition-all duration-1000 delay-300 ease-out"
          )}
        >
          <Tabs defaultValue="technical" className="w-full">
            <TabsList className="w-full max-w-md mx-auto mb-12 bg-white/5">
              <TabsTrigger 
                value="technical"
                className="w-1/2 data-[state=active]:bg-[#C9B6E4] data-[state=active]:text-[#0A1128]"
              >
                Technical
              </TabsTrigger>
              <TabsTrigger 
                value="creative"
                className="w-1/2 data-[state=active]:bg-[#F2C1D1] data-[state=active]:text-[#0A1128]"
              >
                Creative
              </TabsTrigger>
            </TabsList>

            <TabsContent value="technical">
              <Swiper {...swiperConfig}>
                {technicalBlogs.map((blog) => (
                  <SwiperSlide key={blog.id} className="max-w-sm">
                    <div className="bg-white/5 rounded-lg overflow-hidden border border-white/10 hover:border-[#C9B6E4]/50 transition-all">
                      <div className="aspect-video relative overflow-hidden">
                        <img 
                          src={blog.image} 
                          alt={blog.title}
                          className="object-cover w-full h-full transform hover:scale-110 transition-transform duration-500"
                        />
                      </div>
                      <div className="p-6">
                        <p className="text-sm text-[#C9B6E4] mb-2">{blog.date}</p>
                        <h3 className="text-xl font-space font-semibold mb-3">{blog.title}</h3>
                        <p className="text-gray-400">{blog.excerpt}</p>
                      </div>
                    </div>
                  </SwiperSlide>
                ))}
              </Swiper>
            </TabsContent>

            <TabsContent value="creative">
              <Swiper {...swiperConfig}>
                {creativeBlogs.map((blog) => (
                  <SwiperSlide key={blog.id} className="max-w-sm">
                    <div className="bg-white/5 rounded-lg overflow-hidden border border-white/10 hover:border-[#F2C1D1]/50 transition-all">
                      <div className="aspect-video relative overflow-hidden">
                        <img 
                          src={blog.image} 
                          alt={blog.title}
                          className="object-cover w-full h-full transform hover:scale-110 transition-transform duration-500"
                        />
                      </div>
                      <div className="p-6">
                        <p className="text-sm text-[#F2C1D1] mb-2">{blog.date}</p>
                        <h3 className="text-xl font-space font-semibold mb-3">{blog.title}</h3>
                        <p className="text-gray-400">{blog.excerpt}</p>
                      </div>
                    </div>
                  </SwiperSlide>
                ))}
              </Swiper>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </section>
  )
}