import { Quote } from "lucide-react"

interface TestimonialCardProps {
  quote: string
  author: string
  role: string
}

export function TestimonialCard({ quote, author, role }: TestimonialCardProps) {
  return (
    <div className="bg-white rounded-xl p-6 shadow-sm h-full flex flex-col">
      <Quote className="h-8 w-8 text-[#00A6A6]/30 mb-4" />
      <p className="text-[#333333] mb-6 flex-grow">{quote}</p>
      <div className="mt-auto">
        <p className="font-bold text-[#333333]">{author}</p>
        <p className="text-sm text-[#666666]">{role}</p>
      </div>
    </div>
  )
}

