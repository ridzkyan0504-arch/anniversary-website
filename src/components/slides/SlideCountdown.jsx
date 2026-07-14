import { useEffect, useState } from 'react'
import { gsap } from 'gsap'

const ANNIVERSARY_DATE = new Date('2024-07-12T00:00:00')

export default function SlideCountdown() {
  const [time, setTime] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 })
  
  useEffect(() => {
    function calc() {
      const diff = Date.now() - ANNIVERSARY_DATE
      if (diff < 0) return
      setTime({
        days: Math.floor(diff / 86400000),
        hours: Math.floor((diff % 86400000) / 3600000),
        minutes: Math.floor((diff % 3600000) / 60000),
        seconds: Math.floor((diff % 60000) / 1000),
      })
    }
    calc()
    const iv = setInterval(calc, 1000)
    return () => clearInterval(iv)
  }, [])
  
  useEffect(() => {
    gsap.fromTo('.cd-title', { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 0.5, delay: 0.1, ease: 'power3.out' })
    gsap.fromTo(
      '.countdown-card',
      { opacity: 0, y: 30, scale: 0.9 },
      { opacity: 1, y: 0, scale: 1, duration: 0.5, stagger: 0.1, ease: 'back.out(1.5)', delay: 0.2 }
    )
  }, [])
  
  const items = [
    { number: time.days, label: 'Hari' },
    { number: time.hours, label: 'Jam' },
    { number: time.minutes, label: 'Menit' },
    { number: time.seconds, label: 'Detik' },
  ]
  
  return (
    <div className="slide-inner slide-countdown">
      <p className="section-label">⏳ Sudah Berapa Lama</p>
      <h2 className="cd-title section-title">Kita Bersama 🥰</h2>
      <p className="section-desc">
        Setiap detik bersamamu adalah momen berharga yang tidak ingin aku tukar dengan apapun.
      </p>
      <div className="countdown-grid">
        {items.map((item) => (
          <div className="countdown-card" key={item.label}>
            <span className="number">{String(item.number).padStart(2, '0')}</span>
            <span className="label">{item.label}</span>
          </div>
        ))}
      </div>
    </div>
  )
}
