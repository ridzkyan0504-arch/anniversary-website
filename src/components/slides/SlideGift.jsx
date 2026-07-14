import { useEffect, useState } from 'react'
import { gsap } from 'gsap'

export default function SlideGift() {
  const [opened, setOpened] = useState(false)

  useEffect(() => {
    // Entrance animation
    gsap.fromTo('.gift-title', { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 0.5, delay: 0.1 })
    gsap.fromTo('.gift-box-wrap', { opacity: 0, scale: 0.5, rotation: -10 }, { opacity: 1, scale: 1, rotation: 0, duration: 0.6, ease: 'back.out(1.5)', delay: 0.2 })
    
    // Idle bounce
    if (!opened) {
      gsap.to('.gift-box-wrap', { y: -10, duration: 1, repeat: -1, yoyo: true, ease: 'sine.inOut', delay: 1 })
    }
  }, [opened])

  function handleOpen() {
    if (opened) return
    setOpened(true)
    // Kill idle bounce
    gsap.killTweensOf('.gift-box-wrap')
    
    const tl = gsap.timeline()
    // Shake
    tl.to('.gift-box-wrap', { x: -5, duration: 0.05, repeat: 5, yoyo: true })
      .to('.gift-box-wrap', { x: 0, duration: 0.05 })
    // Pop lid
      .to('.gift-lid', { y: -80, rotation: 15, opacity: 0, duration: 0.5, ease: 'power2.out' }, '+=0.1')
    // Pop card
      .fromTo('.gift-card', { y: 20, opacity: 0, scale: 0.5 }, { y: -40, opacity: 1, scale: 1, duration: 0.6, ease: 'back.out(1.5)' }, '-=0.2')
    // Hide hint
      .to('.gift-hint', { opacity: 0, duration: 0.3 }, 0)
  }

  return (
    <div className="slide-inner slide-gift">
      <p className="section-label">🎁 Spesial Untukmu</p>
      <h2 className="gift-title section-title">Ada Kado Kecil<br />Buat Kamu!</h2>
      
      <div className="gift-container">
        <div className="gift-box-wrap" onClick={handleOpen}>
          <div className="gift-lid">
            <div className="gift-bow">💝</div>
            <div className="gift-lid-box" />
          </div>
          <div className="gift-box-body" />
          
          <div className="gift-card">
            <h3>Kupon Cinta 🎟️</h3>
            <p>Berlaku untuk 1x <strong>Pelukan Seharian</strong> & <strong>Traktir Makan Favoritmu</strong> tanpa batas waktu! 💕</p>
          </div>
        </div>
        {!opened && <p className="gift-hint">Ketuk kadonya! ✨</p>}
      </div>
    </div>
  )
}
