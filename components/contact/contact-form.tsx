"use client"

import { useRef, useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Send, Check } from 'lucide-react'
import { cn } from '@/lib/utils'
import { FormData, formSchema } from './types'
import { sendEmail } from './utils'

export function ContactForm() {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)
  const formRef = useRef<HTMLFormElement>(null)
  const [sendedMessage, setSendedMessage] = useState('')

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset
  } = useForm<FormData>({
    resolver: zodResolver(formSchema)
  })

  const onSubmit = async (data: FormData) => {
    if (!formRef.current) return

    setIsSubmitting(true)
    try {
      await sendEmail(formRef.current)
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
  )
} 