import { useEffect, useRef, useState } from 'react'
import { gsap } from 'gsap'

const PHOTOS = [
  { id: 1, src: '/photos/selfiepertama.jpeg', emoji: '🤳', caption: 'Selfie Pertama Kita', date: '💛 Awal yang Manis', rotate: -3, tape: 'tl' },
  { id: 2, src: '/photos/fotoboothpertama.jpeg', emoji: '📸', caption: 'Fotobooth Pertama Kitaa', date: '🩷 Momen Abadi', rotate: 2, tape: 'tr' },
  { id: 3, src: '/photos/fotoboothkesekiankali.jpeg', emoji: '🎞️', caption: 'Fotobooth Lagi & Lagi', date: '✨ Kebiasaan Kita', rotate: -2, tape: 'tl' },
  { id: 4, src: '/photos/badminton.jpeg', emoji: '🏸', caption: 'Badminton!!', date: '💖 Kompak Terus', rotate: 3, tape: 'tr' },
  { id: 5, src: '/photos/digebyok.jpeg', emoji: '💦', caption: 'Anjay di Digebyok', date: '😂 Lucu Banget', rotate: -1, tape: 'tl' },
  { id: 6, src: '/photos/psan.jpeg', emoji: '💌', caption: 'Waktu PS-an', date: '🌸 Selalu di Hati', rotate: 2, tape: 'tr' },
]

function Lightbox({ photo, onClose }) {
  const ref = useRef(null)
  
  useEffect(() => {
    gsap.fromTo(ref.current, { opacity: 0 }, { opacity: 1, duration: 0.3 })
    gsap.fromTo('.lb-card', { scale: 0.75, rotation: -4, y: 40 }, { scale: 1, rotation: 0, y: 0, duration: 0.45, ease: 'back.out(1.6)' })
  }, [photo])
  
  function close() {
    gsap.to(ref.current, { opacity: 0, duration: 0.25, onComplete: onClose })
  }
  
  return (
    <div className="lightbox" ref={ref} onClick={close}>
      <div className="lb-card" onClick={(e) => e.stopPropagation()}>
        <button className="lb-close" onClick={close}>✕</button>
        <div className="lb-photo-wrap">
          {photo.src ? (
            <img src={photo.src} alt={photo.caption} className="lb-photo" />
          ) : (
            <div className="lb-placeholder">
              <span>{photo.emoji}</span>
              <p>Foto segera hadir 📸</p>
            </div>
          )}
          <div className="lb-tape lb-tape-tl" />
          <div className="lb-tape lb-tape-tr" />
        </div>
        <p className="lb-caption">{photo.caption}</p>
        <p className="lb-date">{photo.date}</p>
      </div>
    </div>
  )
}

export default function SlideScrapbook() {
  const [activePhoto, setActivePhoto] = useState(null)
  
  useEffect(() => {
    gsap.fromTo('.scrap-title', { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 0.5, delay: 0.1 })
    gsap.fromTo(
      '.scrap-item',
      { opacity: 0, y: 30 },
      { opacity: 1, y: 0, rotation: (i) => PHOTOS[i % PHOTOS.length].rotate, duration: 0.5, stagger: 0.08, ease: 'back.out(1.4)', delay: 0.2 }
    )
  }, [])
  
  return (
    <div className="slide-inner slide-scrapbook">
      <p className="section-label">🌸 Kenangan Kita</p>
      <h2 className="scrap-title section-title">Scrapbook Kita 📷</h2>
      <p className="section-desc">Ketuk setiap foto untuk membuka kenangan indah kita.</p>
      <div className="scrapbook-grid">
        {PHOTOS.map((p) => (
          <div key={p.id} className="scrap-item" style={{ '--rot': `${p.rotate}deg` }} onClick={() => setActivePhoto(p)}>
            <div className={`scrap-tape scrap-tape-${p.tape}`} />
            <div className="scrap-photo-wrap">
              {p.src ? (
                <img src={p.src} alt={p.caption} className="scrap-photo" />
              ) : (
                <div className="scrap-empty">
                  <span>{p.emoji}</span>
                </div>
              )}
            </div>
            <p className="scrap-caption">{p.caption}</p>
          </div>
        ))}
      </div>
      {activePhoto && <Lightbox photo={activePhoto} onClose={() => setActivePhoto(null)} />}
    </div>
  )
}
