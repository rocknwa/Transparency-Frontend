'use client'
import "../app/globals.css"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { BackgroundAnimation } from "@/components/BackgroundAnimation"

const Contact = () => {
  return (
    <div className="relative flex items-center justify-center min-h-screen overflow-hidden">
      {/* Background Effect */}
      <BackgroundAnimation />

      <div className="relative bg-white text-[#008751] p-20 rounded-lg shadow-lg w-full max-w-5xl mx-auto z-10">
        <h1 className="text-5xl font-bold mb-10">Contact Us</h1>
        <form className="space-y-8">
          <div>
            <label htmlFor="name" className="block text-2xl mb-3">Name</label>
            <Input id="name" placeholder="Your name" className="text-xl p-4 w-full" />
          </div>
          <div>
            <label htmlFor="email" className="block text-2xl mb-3">Email</label>
            <Input id="email" type="email" placeholder="Your email" className="text-xl p-4 w-full" />
          </div>
          <div>
            <label htmlFor="message" className="block text-2xl mb-3">Message</label>
            <Textarea id="message" placeholder="Your message" rows={6} className="text-xl p-4 w-full" />
          </div>
          <Button type="submit" className="bg-[#008751] text-white hover:bg-[#006741] text-2xl py-4 px-10 w-full sm:w-auto">
            Send Message
          </Button>
        </form>
      </div>
    </div>
  )
}
export default Contact;
