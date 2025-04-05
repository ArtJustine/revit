"use client"

import type React from "react"

import type { ReactNode } from "react"
import { useIntersectionObserver } from "@/hooks/use-intersection-observer"

type AnimationType = "fade-up" | "fade-in" | "slide-in-left" | "slide-in-right" | "zoom-in" | "bounce"

interface AnimatedSectionProps {
  children: ReactNode
  animation: AnimationType
  delay?: number
  className?: string
  threshold?: number
  reappear?: boolean // Add reappear prop
}

export function AnimatedSection({
  children,
  animation,
  delay = 0,
  className = "",
  threshold = 0.1,
  reappear = true, // Default to true to fix scrolling back up issue
}: AnimatedSectionProps) {
  const { ref, isIntersecting } = useIntersectionObserver({ threshold, reappear })

  const getAnimationClass = () => {
    if (!isIntersecting) return "opacity-0"

    const baseClass = "transition-all duration-1000 opacity-100"
    const delayClass = delay ? `delay-${delay}` : ""

    switch (animation) {
      case "fade-up":
        return `${baseClass} ${delayClass} transform translate-y-0`
      case "fade-in":
        return `${baseClass} ${delayClass}`
      case "slide-in-left":
        return `${baseClass} ${delayClass} transform translate-x-0`
      case "slide-in-right":
        return `${baseClass} ${delayClass} transform translate-x-0`
      case "zoom-in":
        return `${baseClass} ${delayClass} transform scale-100`
      case "bounce":
        return `${baseClass} ${delayClass} animate-bounce`
      default:
        return `${baseClass} ${delayClass}`
    }
  }

  const getInitialClass = () => {
    switch (animation) {
      case "fade-up":
        return "transform translate-y-16 opacity-0"
      case "fade-in":
        return "opacity-0"
      case "slide-in-left":
        return "transform -translate-x-16 opacity-0"
      case "slide-in-right":
        return "transform translate-x-16 opacity-0"
      case "zoom-in":
        return "transform scale-95 opacity-0"
      case "bounce":
        return "opacity-0"
      default:
        return "opacity-0"
    }
  }

  return (
    <div
      ref={ref as React.RefObject<HTMLDivElement>}
      className={`${getInitialClass()} ${isIntersecting ? getAnimationClass() : ""} ${className}`}
    >
      {children}
    </div>
  )
}

