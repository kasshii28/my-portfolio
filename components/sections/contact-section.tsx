"use client"

import { useEffect, useRef, useState } from 'react'
import { cn } from '@/lib/utils'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Send, Check } from 'lucide-react'
import { SnsLinks } from '@/components/sns-links'
import emailjs from '@emailjs/browser'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'

const formSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters'),
  email: z.string().email('Please enter a valid email address'),
  message: z.string().min(10, 'Message must be at least 10 characters'),
})

type FormData = z.infer<typeof formSchema>

export default function ContactSection() {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)
  const formRef = useRef<HTMLFormElement>(null)
  const titleRef = useRef<HTMLHeadingElement>(null)
  const contentRef = useRef<HTMLDivElement>(null)
  const [sendedMessage, setSendedMessage] = useState('')

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset
  } = useForm<FormData>({
    resolver: zodResolver(formSchema)
  })

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

  const onSubmit = async (data: FormData) => {
    if (!formRef.current) return

    setIsSubmitting(true)
    try {
      await emailjs.sendForm(
        process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID!,
        process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID!,
        formRef.current,
        process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY!
      )
      setSendedMessage('Your message has been sent! Please wait for our reply.')
      setIsSubmitted(true)
      reset()
    } catch (err) {
      setSendedMessage('Failed to send message. Please try again later.')
    } finally {
      setIsSubmitting(false)
    }
  }

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
          <div>
            <form ref={formRef} onSubmit={handleSubmit(onSubmit)} className="space-y-6">
              <div className="space-y-3">
                <label htmlFor="name" className="block text-sm font-medium text-gray-300">
                  Your Name
                </label>
                <Input
                  id="name"
                  {...register('name')}
                  className={cn(
                    "bg-white/5 border-white/10 focus:border-[#C9B6E4]/70 focus:ring-[#C9B6E4]/20",
                    errors.name && "border-red-500"
                  )}
                  placeholder="Jane Doe"
                />
                {errors.name && (
                  <p className="text-sm text-red-500">{errors.name.message}</p>
                )}
              </div>
              
              <div className="space-y-3">
                <label htmlFor="email" className="block text-sm font-medium text-gray-300">
                  Email Address
                </label>
                <Input
                  id="email"
                  type="email"
                  {...register('email')}
                  className={cn(
                    "bg-white/5 border-white/10 focus:border-[#C9B6E4]/70 focus:ring-[#C9B6E4]/20",
                    errors.email && "border-red-500"
                  )}
                  placeholder="hello@example.com"
                />
                {errors.email && (
                  <p className="text-sm text-red-500">{errors.email.message}</p>
                )}
              </div>
              
              <div className="space-y-3">
                <label htmlFor="message" className="block text-sm font-medium text-gray-300">
                  Your Message
                </label>
                <Textarea
                  id="message"
                  {...register('message')}
                  className={cn(
                    "bg-white/5 border-white/10 focus:border-[#C9B6E4]/70 focus:ring-[#C9B6E4]/20 min-h-[150px]",
                    errors.message && "border-red-500"
                  )}
                  placeholder="Tell me about your project or inquiry..."
                />
                {errors.message && (
                  <p className="text-sm text-red-500">{errors.message.message}</p>
                )}
              </div>
              
              {sendedMessage && (
                <p className={cn(
                  "text-sm",
                  isSubmitted ? "text-green-500" : "text-red-500"
                )}>
                  {sendedMessage}
                </p>
              )}
              
              <Button
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-gradient-to-r from-[#C9B6E4] to-[#F2C1D1] text-[#0A1128] hover:from-[#C9B6E4]/90 hover:to-[#F2C1D1]/90 font-medium transition-all duration-300"
              >
                {isSubmitting ? (
                  <span className="flex items-center">
                    Sending
                    <span className="ml-2 inline-block animate-pulse">...</span>
                  </span>
                ) : isSubmitted ? (
                  <span className="flex items-center">
                    Message Sent
                    <Check className="ml-2 h-4 w-4" />
                  </span>
                ) : (
                  <span className="flex items-center">
                    Send Message
                    <Send className="ml-2 h-4 w-4" />
                  </span>
                )}
              </Button>
            </form>
          </div>
          
          <div className="lg:pl-12 lg:border-l lg:border-white/10">
            <p className="text-gray-300 mb-8">
              Feel free to connect through social media or drop me an email directly.
            </p>
            
            <div className="space-y-6">
              <div>
                <h4 className="text-sm uppercase tracking-wider text-gray-400 mb-3">Email</h4>
                <a 
                  href="mailto:hk.kasshii@gmail.com" 
                  className="text-lg text-[#F2C1D1] hover:underline focus:outline-none focus:ring-2 focus:ring-[#F2C1D1]/50 inline-block"
                >
                  hk.kasshii@gmail.com
                </a>
              </div>
              
              <div>
                <h4 className="text-sm uppercase tracking-wider text-gray-400 mb-3">Location</h4>
                <p className="text-lg">Tokyo, Japan</p>
              </div>
              
              <div>
                <h4 className="text-sm uppercase tracking-wider text-gray-400 mb-4">Social</h4>
                <div className="flex space-x-4">
                  <SnsLinks />
                </div>
              </div>
            </div>
          </div>
        </div>
        
        <footer className="mt-24 text-center text-sm text-gray-400">
          <p>© {new Date().getFullYear()} Kasshii </p>
        </footer>
      </div>
    </section>
  )
}
