'use client'

import { useGSAP } from '@gsap/react'
import gsap from 'gsap'
import { useRef, type ReactNode } from 'react'
import { usePathname } from 'next/navigation'

interface StairsProps {
  children: ReactNode
}

const Stairs = ({ children }: StairsProps) => {
    const currentPath = usePathname()
    const stairParentRef = useRef<HTMLDivElement>(null)
    const pageRef = useRef<HTMLDivElement>(null)

    useGSAP(() => {
        const tl = gsap.timeline()
        
        // 1. Ensure the transition layer is visible and on top
        tl.set(stairParentRef.current, { display: 'block', zIndex: 9999 })
        
        // 2. Animate the Stairs (Matching your Electric Orange theme)
        tl.fromTo('.stair', 
            { height: 0 }, 
            {
                height: '100%',
                stagger: { amount: 0.3, from: "start" },
                duration: 0.4,
                ease: "power4.inOut"
            }
        )
        
        // 3. Move them out
        tl.to('.stair', {
            y: '100%',
            stagger: { amount: 0.3, from: "start" },
            duration: 0.5,
            ease: "power4.inOut"
        })
        
        // 4. Hide parent and reset for next time
        tl.set(stairParentRef.current, { display: 'none' })
        tl.set('.stair', { y: '0%', height: 0 })

        // 5. Reveal Page Content (Smooth fade + scale)
        tl.fromTo(pageRef.current, 
            { opacity: 0, scale: 0.98, filter: "blur(10px)" }, 
            {
                opacity: 1,
                scale: 1,
                filter: "blur(0px)",
                duration: 0.8,
                ease: "power2.out"
            }, 
            "-=0.4"
        )

        return () => tl.kill()
    }, [currentPath])

    return (
        <div className='relative'>
            {/* The Stairs Layer - Updated to your brand colors */}
            <div 
                ref={stairParentRef} 
                className='fixed inset-0 hidden pointer-events-none'
                style={{ zIndex: 1000 }}
            >
                <div className='flex h-full w-full'>
                    {[...Array(5)].map((_, i) => (
                        <div 
                            key={i} 
                            className='stair h-full w-full bg-[#ff4d00] border-r border-black/10' 
                        />
                    ))}
                </div>
            </div>

            {/* The Page Content */}
            <div ref={pageRef} className='relative z-10'>
                {children}
            </div>
        </div>
    )
}

export default Stairs