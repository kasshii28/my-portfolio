"use client"

import { useEffect, useRef, useState } from 'react'
import { Swiper, SwiperSlide } from 'swiper/react'
import { Mousewheel, Pagination } from 'swiper/modules'
import HeroSection from '@/components/sections/hero-section'
import AboutSection from '@/components/sections/about-section'
import SkillsSection from '@/components/sections/skills-section'
import ProjectsSection from '@/components/sections/projects-section'
import BlogSection from '@/components/sections/blog-section'
import ContactSection from '@/components/sections/contact-section'
import 'swiper/css'
import 'swiper/css/pagination'
import { formatDate } from '@/lib/utils'

export default function Home() {
  const [dataQiita, setDataQiita] = useState([])
  const [dataZenn, setDataZenn] = useState([])
  useEffect(() => {
    const fetchBlogs = async () => {
      const resQiita = await fetch('/api/getQiita')
      const resZenn = await fetch('/api/getZenn')
      const dataQiita = await resQiita.json()
      const dataZenn = await resZenn.json()
      console.log(dataQiita)
      console.log(dataZenn)
      setDataQiita(dataQiita)
      setDataZenn(dataZenn)
    }
    fetchBlogs()
  }, [])

  return (
    <main className="relative h-screen">
      {/* {dataQiita.map((blog: any) => (
        <div key={blog.id}>
          <h2>{blog.title}</h2>
          <p>{blog.url}</p>
          <p>{formatDate(blog.created_at)}</p>
        </div>
      ))} */}
      <Swiper
        direction="vertical"
        slidesPerView={1}
        mousewheel={true}
        pagination={{
          clickable: true,
        }}
        modules={[Mousewheel, Pagination]}
        className="h-full"
      >
        <SwiperSlide>
          <HeroSection />
        </SwiperSlide>
        <SwiperSlide>
          <AboutSection />
        </SwiperSlide>
        <SwiperSlide>
          <SkillsSection />
        </SwiperSlide>
        <SwiperSlide>
          <ProjectsSection />
        </SwiperSlide>
        <SwiperSlide>
          <BlogSection />
        </SwiperSlide>
        <SwiperSlide>
          <ContactSection />
        </SwiperSlide>
      </Swiper>
    </main>
  )
}