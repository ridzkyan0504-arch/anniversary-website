import { useEffect } from 'react'
import { gsap } from 'gsap'

export default function SlideLoveLetter() {
  useEffect(() => {
    gsap.fromTo('.love-letter', { opacity: 0, scale: 0.9 }, { opacity: 1, scale: 1, duration: 0.6, ease: 'back.out(1.3)', delay: 0.15 })
  }, [])
  
  return (
    <div className="slide-inner slide-letter">
      <p className="section-label">💌 Dari Hatiku</p>
      <h2 className="section-title">Surat Cinta<br />Untukmu</h2>
      <div className="love-letter">
        <p>
          Sayang, hari ini aku ingin kamu tahu betapa berartinya kamu bagiku. Kehadiranmu mengubah cara aku melihat dunia — semuanya terasa lebih cerah, lebih hangat, dan lebih bermakna.
        </p>
        <p>
          Kamu bukan hanya pacarku, kamu adalah teman terbaikku, tempat aku pulang, dan alasan aku tersenyum di hari yang paling biasa sekalipun.
        </p>
        <p>
          Di hari anniversary ini, aku ingin berjanji: aku akan selalu ada, selalu berusaha, dan selalu mencintaimu dengan sepenuh hatiku. 💕
        </p>
        <p>
          Terima kasih sudah memilihku, dan terima kasih sudah bertahan bersamaku. Kamu adalah hadiah terbaik yang pernah aku terima.
        </p>
        <div className="love-letter-sig">— Dengan cinta tulus ❤️</div>
      </div>
    </div>
  )
}
