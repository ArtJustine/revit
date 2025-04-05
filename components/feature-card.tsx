import type { ReactNode } from "react"

interface FeatureCardProps {
  title: string
  description: string
  icon: ReactNode
}

export function FeatureCard({ title, description, icon }: FeatureCardProps) {
  return (
    <div className="bg-[#E0E0E0] rounded-xl p-6 transition-all hover:shadow-md hover:translate-y-[-5px] h-full flex flex-col">
      <div className="bg-[#00A6A6]/10 h-12 w-12 rounded-full flex items-center justify-center mb-4">
        <div className="text-[#00A6A6]">{icon}</div>
      </div>
      <h3 className="text-xl font-bold text-[#333333] mb-3">{title}</h3>
      <p className="text-[#666666] flex-grow">{description}</p>
    </div>
  )
}

