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

export default function Home() {

  return (
    <main className="relative h-screen">
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