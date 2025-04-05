"use client"

import { useEffect, useState, useRef } from "react"

interface UseIntersectionObserverProps {
  threshold?: number
  rootMargin?: string
  triggerOnce?: boolean
  reappear?: boolean // New prop to control reappearing animations
}

export function useIntersectionObserver({
  threshold = 0.1,
  rootMargin = "0px",
  triggerOnce = true,
  reappear = true, // Default to true to fix the scrolling back up issue
}: UseIntersectionObserverProps = {}) {
  const [isIntersecting, setIsIntersecting] = useState(false)
  const [hasTriggered, setHasTriggered] = useState(false)
  const ref = useRef<HTMLElement | null>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        const isElementIntersecting = entry.isIntersecting

        // If triggerOnce is true and element has already triggered and is not set to reappear, do nothing
        if (triggerOnce && hasTriggered && !reappear && !isElementIntersecting) {
          return
        }

        setIsIntersecting(isElementIntersecting)

        if (triggerOnce && isElementIntersecting) {
          setHasTriggered(true)
        }
      },
      { threshold, rootMargin },
    )

    const currentRef = ref.current
    if (currentRef) {
      observer.observe(currentRef)
    }

    return () => {
      if (currentRef) {
        observer.unobserve(currentRef)
      }
    }
  }, [threshold, rootMargin, triggerOnce, hasTriggered, reappear])

  return { ref, isIntersecting }
}

