import { useEffect, useRef, useState } from 'react'
import { gsap } from 'gsap'
import FloatingHearts from './FloatingHearts'

export default function EnvelopeIntro({ onOpen, onTap }) {
  const ref = useRef(null)
  const [opened, setOpened] = useState(false)
  
  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        '.env-wrapper',
        { opacity: 0, scale: 0.7, y: 60 },
        { opacity: 1, scale: 1, y: 0, duration: 1, ease: 'back.out(1.5)', delay: 0.3 }
      )
      gsap.to('.env-hint', { opacity: 1, duration: 0.6, delay: 1.4 })
      gsap.to('.env-wrapper', { y: -8, duration: 1.4, ease: 'sine.inOut', repeat: -1, yoyo: true, delay: 1 })
    }, ref)
    return () => ctx.revert()
  }, [])
  
  function handleClick() {
    if (opened) return
    setOpened(true)
    if (onTap) onTap()
    const tl = gsap.timeline()
    tl.to('.env-flap', { rotateX: -180, duration: 0.6, ease: 'power2.inOut', transformOrigin: 'top center' })
      .to('.env-letter-peek', { y: -70, opacity: 1, duration: 0.5, ease: 'back.out(1.5)' }, '-=0.2')
      .to('.env-wrapper', { scale: 1.05, duration: 0.15 })
      .to('.env-wrapper', { scale: 1, duration: 0.15 })
      .to('.env-shine', { opacity: 1, duration: 0.3 })
      .to('.env-hint', { opacity: 0, duration: 0.2 }, 0)
      .to('.env-click-label', { opacity: 1, y: 0, duration: 0.4, ease: 'back.out' }, '-=0.1')
  }
  
  function handleEnter() {
    if (!opened) return
    gsap.to('.envelope-section', { scale: 1.1, opacity: 0, duration: 0.5, ease: 'power2.in', onComplete: onOpen })
  }
  
  return (
    <section className="envelope-section" ref={ref}>
      <FloatingHearts />
      <p className="env-pre-label">Ada sesuatu untukmu...</p>
      <div className="env-wrapper" onClick={handleClick}>
        <div className="env-shine" />
        <div className="env-body">
          <div className="env-flap" />
          <div className="env-bottom-fold" />
          <div className="env-left-fold" />
          <div className="env-right-fold" />
          <div className="env-heart-seal">💌</div>
        </div>
        <div className="env-letter-peek">
          <span>Happy</span>
          <span>Anniversary</span>
          <span>💕</span>
        </div>
      </div>
      <p className="env-hint">Ketuk amplop untuk membuka</p>
      <button className="env-enter-btn env-click-label" onClick={handleEnter}>
        Buka Kejutannya ✨
      </button>
    </section>
  )
}
