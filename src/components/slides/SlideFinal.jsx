import { useEffect } from 'react'
import { gsap } from 'gsap'

export default function SlideFinal({ onKiss }) {
  useEffect(() => {
    const tl = gsap.timeline({ delay: 0.1 })
    tl.fromTo('.final-big-heart', { opacity: 0, scale: 0.5 }, { opacity: 1, scale: 1, duration: 0.6, ease: 'back.out(2)' })
      .fromTo('.final-title', { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 0.5, ease: 'power3.out' }, '-=0.2')
      .fromTo('.final-text', { opacity: 0, y: 16 }, { opacity: 1, y: 0, duration: 0.5, ease: 'power3.out' }, '-=0.2')
      .fromTo('.final-btn', { opacity: 0, y: 16 }, { opacity: 1, y: 0, duration: 0.45, ease: 'back.out(1.5)' }, '-=0.2')
      .fromTo('.final-footer', { opacity: 0 }, { opacity: 1, duration: 0.4 })
    gsap.to('.final-big-heart', { scale: 1.1, duration: 0.7, ease: 'sine.inOut', repeat: -1, yoyo: true, delay: 1 })
  }, [])
  
  return (
    <div className="slide-inner slide-final">
      <div className="final-glow" />
      <span className="final-big-heart">❤️</span>
      <h2 className="final-title">Happy Anniversary,<br />Sayang! 🥰</h2>
      <p className="final-text">
        Semoga kita bisa terus berjalan bersama, menghadapi segalanya berdua, dan menciptakan lebih banyak kenangan indah lagi. Aku sayang kamu, selamanya. 💕
      </p>
      <button className="final-btn" onClick={onKiss}>💋 Kirim Ciuman</button>
      <p className="final-footer">Made with ❤️ khusus untukmu</p>
    </div>
  )
}
