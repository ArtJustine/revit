'use client'

import { motion, AnimatePresence } from 'framer-motion'
import { useEffect, useState, useRef, useLayoutEffect } from 'react'

const professions = [
  'Mechanic',
  'Plumber',
  'Electrician',
  'Painter',
  'Carpenter',
  'Cleaner',
]

export function AnimatedProfession() {
  const [index, setIndex] = useState(0)
  const containerRef = useRef<HTMLSpanElement>(null)
  const [height, setHeight] = useState<number | null>(null)

  // Dynamically calculate height based on the tallest word
  useLayoutEffect(() => {
    if (containerRef.current) {
      const height = containerRef.current.offsetHeight
      setHeight(height)
    }
  }, [])

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prev) => (prev + 1) % professions.length)
    }, 2800) // Interval set to 2800ms, slightly less than the animation duration
    return () => clearInterval(interval)
  }, [])

  return (
    <span
      className="inline-block relative"
      style={{
        display: 'inline-block',
        verticalAlign: 'baseline',
        minWidth: '220px',
        lineHeight: 1.2,
      }}
    >
      {/* Invisible reference for height */}
      <span
        className="invisible block font-bold text-4xl md:text-5xl lg:text-6xl"
        ref={containerRef}
      >
        {professions.reduce((a, b) => (a.length > b.length ? a : b))}
      </span>

      <AnimatePresence mode="wait">
        <motion.span
          key={professions[index]}
          initial={{ y: '100%', opacity: 0 }}
          animate={{ y: '0%', opacity: 1 }}
          exit={{ y: '-100%', opacity: 0 }}
          transition={{
            duration: 1, // Animation duration set to 1 second
            ease: 'easeInOut', // Smooth easing function
          }}
          className="absolute top-0 left-0 w-full text-[#00A6A6] font-bold text-4xl md:text-5xl lg:text-6xl"
          style={{ lineHeight: 1 }}
        >
          {professions[index]}
        </motion.span>
      </AnimatePresence>
    </span>
  )
}
