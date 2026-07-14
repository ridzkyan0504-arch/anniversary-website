import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'

export default function FloatingHearts() {
  const ref = useRef(null)
  
  useEffect(() => {
    const container = ref.current
    const emojis = ['❤️', '🩷', '💕', '💗', '💖', '✨', '🌸', '💝']
    const hearts = []
    
    function spawn() {
      const el = document.createElement('div')
      el.className = 'heart-particle'
      el.textContent = emojis[Math.floor(Math.random() * emojis.length)]
      el.style.left = `${Math.random() * 100}%`
      el.style.fontSize = `${12 + Math.random() * 14}px`
      container.appendChild(el)
      hearts.push(el)
      
      gsap.fromTo(
        el,
        { opacity: 0, y: '100vh', x: 0, rotate: Math.random() * 40 - 20, scale: 0.5 },
        {
          opacity: 0.55,
          y: '-10vh',
          x: (Math.random() - 0.5) * 80,
          rotate: Math.random() * 60 - 30,
          scale: 1,
          duration: 5 + Math.random() * 5,
          ease: 'power1.out',
          onComplete: () => {
            el.remove()
            const i = hearts.indexOf(el)
            if (i > -1) hearts.splice(i, 1)
          },
        }
      )
    }
    
    const iv = setInterval(spawn, 900)
    return () => {
      clearInterval(iv)
      hearts.forEach((h) => h.remove())
    }
  }, [])
  
  return <div className="hearts-canvas" ref={ref} aria-hidden="true" />
}
