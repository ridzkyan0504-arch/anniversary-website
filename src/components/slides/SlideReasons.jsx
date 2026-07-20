import { useEffect, useRef, useState } from 'react'
import { gsap } from 'gsap'

const ALL_REASONS = [
  { emoji: '😊', title: 'Senyumanmu', text: 'Senyum kamu bisa bikin hari-hariku yang berat terasa jauh lebih ringan dalam hitungan detik.' },
  { emoji: '🤗', title: 'Cara Kamu Peduli', text: 'Kamu selalu tahu kapan aku butuh dukungan, bahkan tanpa aku bilang. Itu luar biasa.' },
  { emoji: '😂', title: 'Tawamu yang Menular', text: 'Tertawa bersamamu adalah salah satu suara favorit yang ingin aku dengar setiap hari.' },
  { emoji: '💬', title: 'Kejujuranmu', text: 'Kamu selalu jujur padaku meski kadang tidak mudah. Itu membuatku semakin percaya dan menghargai kamu.' },
  { emoji: '💪', title: 'Keberanianmu', text: 'Kamu menghadapi setiap tantangan dengan kepala tegak. Itu sangat menginspirasi aku.' },
  { emoji: '✨', title: 'Kamu Apa Adanya', text: 'Bukan karena sempurna — tapi justru karena semua yang asli dari dirimu itulah yang aku cintai.' },
  { emoji: '🌙', title: 'Chat Tengah Malam', text: 'Kamu yang selalu balas chat aku jam 2 pagi padahal ngantuk. Itu bikin aku merasa penting.' },
  { emoji: '🍜', title: 'Makan Bareng', text: 'Makanan apapun rasanya lebih enak kalau makannya sama kamu. Serius.' },
  { emoji: '🎵', title: 'Selera Musikmu', text: 'Kamu yang ngenalin lagu-lagu baru ke aku. Sekarang tiap denger lagunya aku selalu inget kamu.' },
  { emoji: '🌧️', title: 'Di Saat Susah', text: 'Kamu nggak kabur waktu aku lagi di titik terendah. Itu hal yang nggak akan pernah aku lupain.' },
  { emoji: '🥺', title: 'Cara Kamu Manja', text: 'Waktu kamu manja ke aku tuh bikin aku ngerasa jadi orang paling beruntung sedunia.' },
  { emoji: '🌸', title: 'Penampilanmu', text: 'Kamu cantik/ganteng banget bahkan waktu nggak dandan sekalipun. Itu fakta.' },
  { emoji: '🤝', title: 'Selalu Ada', text: 'Kamu ada di setiap momen penting hidupku. Itu bukan kebetulan, itu pilihan — dan aku bersyukur.' },
  { emoji: '😴', title: 'Waktu Tidurmu', text: 'Kamu yang tidur duluan pas telponan tapi tetep bilang "kamu tidur dulu ya" — lucu banget.' },
  { emoji: '🎯', title: 'Tekadmu', text: 'Semangat kamu ngejar impian bikin aku ikut termotivasi. Kamu inspiring banget tanpa sadar.' },
]

function getRandomReasons(exclude = []) {
  const pool = ALL_REASONS.filter(r => !exclude.includes(r.title))
  const shuffled = [...pool].sort(() => Math.random() - 0.5)
  return shuffled.slice(0, 3)
}

export default function SlideReasons() {
  const [reasons, setReasons] = useState(() => getRandomReasons())
  const [spinning, setSpinning] = useState(false)
  const [count, setCount] = useState(0)
  const cardRefs = useRef([])

  useEffect(() => {
    gsap.fromTo('.reasons-random-title', { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 0.5, delay: 0.1 })
    gsap.fromTo('.reason-card', { opacity: 0, y: 30, scale: 0.9 }, { opacity: 1, y: 0, scale: 1, duration: 0.5, stagger: 0.1, ease: 'back.out(1.4)', delay: 0.2 })
    gsap.fromTo('.spin-btn', { opacity: 0, y: 10 }, { opacity: 1, y: 0, duration: 0.4, delay: 0.6 })
  }, [])

  function handleSpin() {
    if (spinning) return
    setSpinning(true)

    // Fly out cards
    gsap.to('.reason-card', {
      y: -40, opacity: 0, scale: 0.85, stagger: 0.06, duration: 0.3, ease: 'power2.in',
      onComplete: () => {
        const newReasons = getRandomReasons(reasons.map(r => r.title))
        setReasons(newReasons)
        setCount(c => c + 1)

        // Fly in new cards
        setTimeout(() => {
          gsap.fromTo('.reason-card',
            { y: 50, opacity: 0, scale: 0.85, rotation: (i) => (i % 2 === 0 ? -4 : 4) },
            { y: 0, opacity: 1, scale: 1, rotation: 0, stagger: 0.08, duration: 0.45, ease: 'back.out(1.5)',
              onComplete: () => setSpinning(false) }
          )
        }, 50)
      }
    })

    // Spin the button
    gsap.to('.spin-btn-icon', { rotation: 360, duration: 0.5, ease: 'power2.out' })
  }

  return (
    <div className="slide-inner slide-reasons-random">
      <p className="section-label">💝 Alasan Aku</p>
      <h2 className="reasons-random-title section-title">
        Mengapa Aku<br />Mencintaimu
      </h2>
      <p className="section-desc" style={{ marginBottom: 20 }}>
        Tekan tombol untuk alasan random — daftarnya panjang! {count > 0 && <span>({count}x diputar 🎰)</span>}
      </p>

      <div className="reason-cards-random">
        {reasons.map((r, i) => (
          <div className="reason-card" key={`${r.title}-${count}`} ref={el => cardRefs.current[i] = el}>
            <span className="reason-card-emoji">{r.emoji}</span>
            <div className="reason-card-content">
              <strong>{r.title}</strong>
              <p>{r.text}</p>
            </div>
          </div>
        ))}
      </div>

      <button className="spin-btn" onClick={handleSpin} disabled={spinning}>
        <span className="spin-btn-icon">🎰</span>
        {spinning ? 'Mengacak...' : 'Alasan Lainnya!'}
      </button>
    </div>
  )
}
