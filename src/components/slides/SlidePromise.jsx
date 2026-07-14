import { useEffect } from 'react'
import { gsap } from 'gsap'

export default function SlidePromise() {
  const promises = [
    { emoji: '🤝', title: 'Aku Akan Selalu Ada', text: 'Di saat susah maupun senang, aku akan selalu ada di sisimu.' },
    { emoji: '🌱', title: 'Tumbuh Bersama', text: 'Aku ingin kita terus berkembang dan saling mendukung satu sama lain.' },
    { emoji: '😂', title: 'Ketawa Setiap Hari', text: 'Aku berjanji untuk selalu menghadirkan tawa dalam hari-harimu.' },
    { emoji: '💬', title: 'Selalu Jujur', text: 'Aku akan selalu berbicara dari hati dan tidak menyembunyikan apapun.' },
    { emoji: '🛡️', title: 'Menjagamu', text: 'Perasaanmu, hatimu, dan kepercayaanmu akan selalu aku jaga.' },
  ]
  
  useEffect(() => {
    gsap.fromTo('.promise-title', { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 0.5, delay: 0.1 })
    gsap.fromTo('.promise-card', { opacity: 0, y: 24 }, { opacity: 1, y: 0, duration: 0.45, stagger: 0.08, ease: 'back.out(1.4)', delay: 0.2 })
  }, [])
  
  return (
    <div className="slide-inner slide-promise">
      <p className="section-label">💍 Janjiku</p>
      <h2 className="promise-title section-title">Janjiku<br />Untukmu</h2>
      <div className="promise-cards">
        {promises.map((p, i) => (
          <div className="promise-card" key={i}>
            <span className="promise-emoji">{p.emoji}</span>
            <p className="promise-text">
              <strong>{p.title}</strong>
              {p.text}
            </p>
          </div>
        ))}
      </div>
    </div>
  )
}
