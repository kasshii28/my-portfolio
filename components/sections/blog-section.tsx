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
import { FormatDate } from '@/lib/utils'

export default function BlogSection() {
  const titleRef = useRef<HTMLHeadingElement>(null)
  const contentRef = useRef<HTMLDivElement>(null)
  const [dataQiita, setDataQiita] = useState([])
  const [dataZenn, setDataZenn] = useState([])
  useEffect(() => {
    const fetchBlogs = async () => {
      const resQiita = await fetch('/api/getQiita')
      const resZenn = await fetch('/api/getZenn')
      const dataQiita = await resQiita.json()
      const dataZenn = await resZenn.json()
      setDataQiita(dataQiita)
      setDataZenn(dataZenn.articles)
    }
    fetchBlogs()
  }, [])

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
            Blogs Qiita Zenn
            <span className="absolute -bottom-2 left-0 w-1/3 h-0.5 bg-[#B4CDED]"></span>
          </span>
        </h2>

        <div 
          ref={contentRef}
          className={cn(
            "opacity-0 translate-y-8 transition-all duration-1000 delay-300 ease-out"
          )}
        >
          <Tabs defaultValue="qiita" className="w-full">
            <TabsList className="flex justify-center items-centerw-full max-w-md mx-auto mb-12 bg-white/5">
              <TabsTrigger 
                value="qiita"
                className="w-1/2 data-[state=active]:bg-[#C9B6E4] data-[state=active]:text-[#0A1128]"
              >
                Qiita
              </TabsTrigger>
              <TabsTrigger 
                value="zenn"
                className="w-1/2 data-[state=active]:bg-[#F2C1D1] data-[state=active]:text-[#0A1128]"
              >
                Zenn
              </TabsTrigger>
            </TabsList>

            <TabsContent value="qiita">
              <Swiper {...swiperConfig}>
                {dataQiita.map((blog: any) => (
                  <SwiperSlide key={blog.id} className="max-w-sm">
                    <a href={blog.url}>
                      <div className="bg-white/5 rounded-lg overflow-hidden border border-white/10 hover:border-[#C9B6E4]/50 transition-all">
                        <div className="aspect-video relative overflow-hidden">
                          <img 
                            src={blog.user.profile_image_url} 
                            className="object-cover w-full h-full transform hover:scale-110 transition-transform duration-500"
                          />
                        </div>
                        <div className="p-6">
                          <p className="text-sm text-[#C9B6E4] mb-2">{FormatDate(blog.created_at)}</p>
                          <h3 className="text-xl font-space font-semibold mb-3">{blog.title}</h3>
                        </div>
                      </div>
                    </a>
                  </SwiperSlide>
                ))}
              </Swiper>
            </TabsContent>

            <TabsContent value="zenn">
              <Swiper {...swiperConfig}>
                {dataZenn.map((blog: any) => (
                  <SwiperSlide key={blog.id} className="max-w-sm">
                    <a href={`https://zenn.dev/${blog.path}`}>
                      <div className="bg-white/5 rounded-lg overflow-hidden border border-white/10 hover:border-[#F2C1D1]/50 transition-all">
                        <div className="aspect-video relative overflow-hidden">
                          <p className="text-[120px] text-center text-[#F2C1D1] ">{blog.emoji}</p>
                        </div>
                        <div className="p-6">
                          <p className="text-sm text-[#F2C1D1] mb-2">{FormatDate(blog.published_at)}</p>
                          <h3 className="text-xl font-space font-semibold mb-3">{blog.title}</h3>
                          <p className="text-gray-400">{blog.excerpt}</p>
                        </div>
                      </div>
                    </a>
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