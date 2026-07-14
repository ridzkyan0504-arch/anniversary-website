import { useEffect, useMemo, useRef } from 'react'
import { gsap } from 'gsap'

export default function KissPopup({ visible, onClose }) {
  const ref = useRef(null)
  const confetti = useMemo(
    () => Array.from({ length: 36 }, (_, index) => ({
      id: index,
      left: `${(index * 37) % 100}%`,
      delay: `${(index % 9) * 0.08}s`,
      duration: `${1.7 + (index % 5) * 0.18}s`,
      symbol: ['💖', '💕', '✨', '🌸'][index % 4],
    })),
    []
  )
  
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
      {visible && <div className="kiss-confetti" aria-hidden="true">
        {confetti.map((piece) => (
          <span key={piece.id} style={{ left: piece.left, animationDelay: piece.delay, animationDuration: piece.duration }}>{piece.symbol}</span>
        ))}
      </div>}
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
