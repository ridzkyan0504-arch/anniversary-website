import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'

export default function KissPopup({ visible, onClose }) {
  const ref = useRef(null)
  
  useEffect(() => {
    if (visible) {
      gsap.to(ref.current, { opacity: 1, duration: 0.4, ease: 'power2.out' })
      gsap.fromTo(
        '.kiss-popup-content',
        { scale: 0.7, rotation: -5 },
        { scale: 1, rotation: 0, duration: 0.5, ease: 'back.out(1.8)', delay: 0.1 }
      )
    } else {
      gsap.to(ref.current, { opacity: 0, duration: 0.3 })
    }
  }, [visible])
  
  return (
    <div className={`kiss-popup ${visible ? 'active' : ''}`} ref={ref}>
      <div className="kiss-popup-content">
        <span className="kiss-emoji">💋</span>
        <h2 className="kiss-title">Mwah! 💕</h2>
        <p className="kiss-subtitle">
          Ciuman hangat dan penuh cinta khusus untukmu hari ini. Semoga harimu selalu seindah senyumanmu! 🌸
        </p>
        <button className="kiss-close" onClick={onClose}>
          Terima Kasih 💖
        </button>
      </div>
    </div>
  )
}
