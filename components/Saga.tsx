'use client'

import { motion, useScroll, useTransform } from 'framer-motion'
import { useRef } from 'react'

interface SagaProps {
    children: React.ReactNode
    className?: string
    delay?: number
}

export default function Saga({ children, className = '', delay = 0 }: SagaProps) {
    const containerRef = useRef(null)

    // Track scroll progress relative to this element
    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start end", "end start"] // Animation range: when element enters to when it exits
    })

    // Only start revealing when 20% into view, fully visible at 50%
    const revealProgress = useTransform(
        scrollYProgress,
        [0, 0.2, 0.5], // Input range
        [0, 0, 1]      // Output range (completely hidden until 20% scrolled)
    )

    return (
        <motion.div
            ref={containerRef}
            style={{
                opacity: revealProgress,
                y: useTransform(revealProgress, [0, 1], [30, 0]), // Slide up while appearing
                transition: `all ${0.5 + delay}s cubic-bezier(0.17, 0.55, 0.55, 1)`
            }}
            className={className}
        >
            {children}
        </motion.div>
    )
}