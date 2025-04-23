import emailjs from '@emailjs/browser'

export const sendEmail = async (formElement: HTMLFormElement) => {
  return emailjs.sendForm(
    process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID!,
    process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID!,
    formElement,
    process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY!
  )
} 