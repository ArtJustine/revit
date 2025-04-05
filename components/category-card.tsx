import type { ReactNode } from "react"

interface CategoryCardProps {
  title: string
  icon: ReactNode
  count: string
  clickable?: boolean
}

export function CategoryCard({ title, icon, count, clickable = true }: CategoryCardProps) {
  const CardContent = () => (
    <div
      className={`bg-white rounded-xl p-4 sm:p-6 transition-all hover:shadow-md hover:translate-y-[-5px] h-full flex flex-col ${clickable ? "cursor-pointer" : ""}`}
    >
      <div className="flex items-center justify-center h-10 w-10 sm:h-12 sm:w-12 rounded-full bg-[#00A6A6]/10 mb-3 sm:mb-4">
        <div className="text-[#00A6A6]">{icon}</div>
      </div>
      <h3 className="text-base sm:text-lg font-bold text-[#333333] mb-1">{title}</h3>
      <p className="text-xs sm:text-sm text-[#666666]">{count}</p>
    </div>
  )

  if (clickable) {
    return (
      <a href={`/categories/${title.toLowerCase()}`} className="h-full">
        <CardContent />
      </a>
    )
  }

  return <CardContent />
}

