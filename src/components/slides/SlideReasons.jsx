import { useEffect } from 'react'
import { gsap } from 'gsap'

export default function SlideReasons() {
  const reasons = [
    { title: 'Senyumanmu', text: 'Senyum kamu bisa bikin hari-hariku yang berat terasa jauh lebih ringan dalam hitungan detik.' },
    { title: 'Cara Kamu Peduli', text: 'Kamu selalu tahu kapan aku butuh dukungan, bahkan tanpa aku bilang. Itu luar biasa.' },
    { title: 'Tawamu yang Menular', text: 'Tertawa bersamamu adalah salah satu suara favorit yang ingin aku dengar setiap hari.' },
    { title: 'Kejujuranmu', text: 'Kamu selalu jujur padaku meski kadang tidak mudah. Itu membuatku semakin percaya.' },
    { title: 'Kamu Apa Adanya', text: 'Bukan karena sempurna — tapi justru karena semua yang asli dari dirimu itulah yang aku cintai.' },
  ]
  
  useEffect(() => {
    gsap.fromTo('.reasons-title', { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 0.5, delay: 0.1 })
    gsap.fromTo('.reason-item', { opacity: 0, x: -30 }, { opacity: 1, x: 0, duration: 0.45, stagger: 0.07, ease: 'power3.out', delay: 0.2 })
  }, [])
  
  return (
    <div className="slide-inner slide-reasons">
      <p className="section-label">💝 Alasan Aku</p>
      <h2 className="reasons-title section-title">Mengapa Aku<br />Mencintaimu</h2>
      <div className="reasons-list">
        {reasons.map((r, i) => (
          <div className="reason-item" key={i}>
            <span className="reason-number">{String(i + 1).padStart(2, '0')}</span>
            <p className="reason-text">
              <strong>{r.title}</strong>
              {r.text}
            </p>
          </div>
        ))}
      </div>
    </div>
  )
}
