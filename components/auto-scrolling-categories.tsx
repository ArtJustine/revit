"use client"

import { useEffect, useRef, useState } from "react"
import { Wrench, Zap, Hammer, PaintBucket, Truck, Scissors, Laptop, Utensils } from "lucide-react"
import { CategoryCard } from "@/components/category-card"

export function AutoScrollingCategories() {
  const scrollRef = useRef<HTMLDivElement>(null)
  const [isPaused, setIsPaused] = useState(false)

  const categories = [
    { title: "Plumbers", icon: <Wrench className="h-6 w-6" />, count: "250+ Professionals" },
    { title: "Electricians", icon: <Zap className="h-6 w-6" />, count: "320+ Professionals" },
    { title: "Carpenters", icon: <Hammer className="h-6 w-6" />, count: "180+ Professionals" },
    { title: "Painters", icon: <PaintBucket className="h-6 w-6" />, count: "210+ Professionals" },
    { title: "Mechanics", icon: <Truck className="h-6 w-6" />, count: "195+ Professionals" },
    { title: "Barbers", icon: <Scissors className="h-6 w-6" />, count: "160+ Professionals" },
    { title: "IT Support", icon: <Laptop className="h-6 w-6" />, count: "230+ Professionals" },
    { title: "Chefs", icon: <Utensils className="h-6 w-6" />, count: "140+ Professionals" },
  ]

  useEffect(() => {
    const scrollContainer = scrollRef.current
    if (!scrollContainer) return

    let animationId: number
    let startTime: number

    const scroll = (timestamp: number) => {
      if (!startTime) startTime = timestamp
      if (isPaused) {
        startTime = timestamp - (timestamp % 20)
        animationId = requestAnimationFrame(scroll)
        return
      }

      const elapsed = timestamp - startTime

      if (scrollContainer) {
        // Scroll 1px every 20ms (50px per second)
        scrollContainer.scrollLeft = (elapsed / 20) % (scrollContainer.scrollWidth - scrollContainer.clientWidth + 100)

        // If we've scrolled to the end, reset
        if (scrollContainer.scrollLeft >= scrollContainer.scrollWidth - scrollContainer.clientWidth) {
          startTime = timestamp
        }
      }

      animationId = requestAnimationFrame(scroll)
    }

    animationId = requestAnimationFrame(scroll)

    return () => {
      cancelAnimationFrame(animationId)
    }
  }, [isPaused])

  return (
    <div
      className="relative overflow-hidden"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      <div
        ref={scrollRef}
        className="flex gap-4 md:gap-6 py-4 overflow-x-auto scrollbar-hide"
        style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
      >
        {/* Duplicate the categories to create a seamless loop */}
        {[...categories, ...categories].map((category, index) => (
          <div key={index} className="min-w-[200px] md:min-w-[220px] flex-shrink-0">
            <CategoryCard title={category.title} icon={category.icon} count={category.count} clickable={false} />
          </div>
        ))}
      </div>

      {/* Gradient overlays for smooth fade effect */}
      <div className="absolute top-0 left-0 h-full w-12 bg-gradient-to-r from-[#E0E0E0] to-transparent pointer-events-none"></div>
      <div className="absolute top-0 right-0 h-full w-12 bg-gradient-to-l from-[#E0E0E0] to-transparent pointer-events-none"></div>
    </div>
  )
}

