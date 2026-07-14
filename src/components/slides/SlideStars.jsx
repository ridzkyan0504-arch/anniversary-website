import { useEffect, useState } from 'react'
import { gsap } from 'gsap'

export default function SlideStars() {
  const [activeStar, setActiveStar] = useState(null)
  
  const wishes = [
    { id: 1, x: 20, y: 30, delay: 0.1, text: 'Semoga kita selalu diberi kesehatan & kebahagiaan 🌸' },
    { id: 2, x: 80, y: 20, delay: 0.3, text: 'Semoga semua mimpi indahmu segera terwujud ✨' },
    { id: 3, x: 50, y: 50, delay: 0.5, text: 'Semoga cinta kita terus tumbuh sebesar alam semesta 🌌' },
    { id: 4, x: 15, y: 70, delay: 0.7, text: 'Semoga kita bisa jalan-jalan berdua ke tempat impian ✈️' },
    { id: 5, x: 75, y: 75, delay: 0.9, text: 'Semoga hari-harimu selalu penuh senyuman manis 😊' }
  ]

  useEffect(() => {
    gsap.fromTo('.stars-title', { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 0.5, delay: 0.1 })
    gsap.fromTo('.star-item', { opacity: 0, scale: 0 }, { opacity: 1, scale: 1, duration: 0.8, stagger: 0.2, ease: 'back.out(2)', delay: 0.3 })
  }, [])

  useEffect(() => {
    if (activeStar !== null) {
      gsap.fromTo('.wish-popup-overlay', { opacity: 0 }, { opacity: 1, duration: 0.3 })
      gsap.fromTo('.wish-popup', { opacity: 0, scale: 0.8, y: 20 }, { opacity: 1, scale: 1, y: 0, duration: 0.4, ease: 'back.out(1.5)' })
    }
  }, [activeStar])

  function openWish(wish) {
    if (activeStar === wish.id) {
      closeWish()
      return
    }
    setActiveStar(wish.id)
  }

  function closeWish() {
    gsap.to('.wish-popup', { opacity: 0, scale: 0.8, y: 20, duration: 0.3, ease: 'power2.in' })
    gsap.to('.wish-popup-overlay', { opacity: 0, duration: 0.3, onComplete: () => setActiveStar(null) })
  }

  return (
    <div className="slide-inner slide-stars">
      <p className="section-label">⭐ Wish Upon a Star</p>
      <h2 className="stars-title section-title">Harapanku<br />Untuk Kita</h2>
      <p className="stars-desc">Ketuk bintang-bintang di bawah ini ✨</p>
      
      <div className="stars-sky">
        {wishes.map((w) => (
          <div 
            key={w.id} 
            className={`star-item ${activeStar === w.id ? 'active' : ''}`}
            style={{ left: `${w.x}%`, top: `${w.y}%`, animationDelay: `${w.delay}s` }}
            onClick={() => openWish(w)}
          >
            ⭐
          </div>
        ))}

        {activeStar && (
          <div className="wish-popup-overlay" onClick={closeWish}>
            <div className="wish-popup" onClick={e => e.stopPropagation()}>
              <p className="wish-text">{wishes.find(w => w.id === activeStar)?.text}</p>
              <button className="wish-close" onClick={closeWish}>Amin 🤍</button>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
