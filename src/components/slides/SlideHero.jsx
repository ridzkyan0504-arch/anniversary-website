import { useEffect } from 'react'
import { gsap } from 'gsap'

export default function SlideHero() {
  useEffect(() => {
    const tl = gsap.timeline({ delay: 0.1 })
    tl.fromTo('.s-hero-badge', { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 0.5, ease: 'back.out(1.7)' })
      .fromTo('.s-hero-heart', { opacity: 0, scale: 0.5 }, { opacity: 1, scale: 1, duration: 0.6, ease: 'back.out(2)' }, '-=0.2')
      .fromTo('.s-hero-title', { opacity: 0, y: 24 }, { opacity: 1, y: 0, duration: 0.55, ease: 'power3.out' }, '-=0.2')
      .fromTo('.s-hero-sub', { opacity: 0, y: 16 }, { opacity: 1, y: 0, duration: 0.5, ease: 'power3.out' }, '-=0.2')
    gsap.to('.s-hero-heart', { scale: 1.1, duration: 0.8, ease: 'sine.inOut', repeat: -1, yoyo: true, delay: 1 })
  }, [])
  
  return (
    <div className="slide-inner slide-hero">
      <div className="hero-bg-glow" />
      <div className="s-hero-badge hero-badge">✨ Special Day ✨</div>
      <span className="s-hero-heart hero-main-heart">💕</span>
      <h1 className="s-hero-title hero-title">
        Happy <span>Anniversary</span>,<br />Sayangku 🌸
      </h1>
      <p className="hero-date">1 Agustus 2026</p>
      <p className="s-hero-sub hero-subtitle">
        Hari ini adalah hari yang selalu akan aku ingat — hari di mana hidupku jadi lebih berwarna karena ada kamu. 💖
      </p>
    </div>
  )
}
