import { useEffect, useRef, useState, useCallback } from 'react'
import { gsap } from 'gsap'
import './App.css'

// ─── YouTube Player ────────────────────────────────────────────────────────────
const YT_VIDEO_ID = 'awWKxGftWh4'

function YouTubePlayer({ playerRef, onReady }) {
  const containerRef = useRef(null)
  useEffect(() => {
    if (!window.YT) {
      const tag = document.createElement('script')
      tag.src = 'https://www.youtube.com/iframe_api'
      document.head.appendChild(tag)
    }
    function initPlayer() {
      playerRef.current = new window.YT.Player(containerRef.current, {
        videoId: YT_VIDEO_ID,
        playerVars: { autoplay: 0, controls: 0, loop: 1, playlist: YT_VIDEO_ID, modestbranding: 1, rel: 0, iv_load_policy: 3, disablekb: 1 },
        events: { onReady: () => onReady && onReady() },
      })
    }
    if (window.YT && window.YT.Player) initPlayer()
    else window.onYouTubeIframeAPIReady = initPlayer
    return () => { if (playerRef.current) { playerRef.current.destroy(); playerRef.current = null } }
  }, [])
  return (
    <div style={{ position: 'fixed', top: -9999, left: -9999, width: 1, height: 1, overflow: 'hidden' }} aria-hidden="true">
      <div ref={containerRef} />
    </div>
  )
}

// ─── Music FAB ─────────────────────────────────────────────────────────────────
function MusicButton({ playing, onToggle }) {
  return (
    <button className={`music-fab ${playing ? 'playing' : 'paused'}`} onClick={onToggle} aria-label={playing ? 'Pause' : 'Play'}>
      <span className="music-fab-icon">{playing ? '🎵' : '🎶'}</span>
      <span className="music-fab-bars"><span /><span /><span /><span /></span>
    </button>
  )
}

// ─── Floating Hearts ───────────────────────────────────────────────────────────
function FloatingHearts() {
  const ref = useRef(null)
  useEffect(() => {
    const container = ref.current
    const emojis = ['❤️','🩷','💕','💗','💖','✨','🌸','💝']
    const hearts = []
    function spawn() {
      const el = document.createElement('div')
      el.className = 'heart-particle'
      el.textContent = emojis[Math.floor(Math.random() * emojis.length)]
      el.style.left = `${Math.random() * 100}%`
      el.style.fontSize = `${12 + Math.random() * 14}px`
      container.appendChild(el); hearts.push(el)
      gsap.fromTo(el,
        { opacity: 0, y: '100vh', x: 0, rotate: Math.random()*40-20, scale: 0.5 },
        { opacity: 0.55, y: '-10vh', x: (Math.random()-0.5)*80, rotate: Math.random()*60-30, scale: 1,
          duration: 5+Math.random()*5, ease: 'power1.out',
          onComplete: () => { el.remove(); const i=hearts.indexOf(el); if(i>-1) hearts.splice(i,1) } }
      )
    }
    const iv = setInterval(spawn, 900)
    return () => { clearInterval(iv); hearts.forEach(h=>h.remove()) }
  }, [])
  return <div className="hearts-canvas" ref={ref} aria-hidden="true" />
}

// ─── Envelope Intro ────────────────────────────────────────────────────────────
function EnvelopeIntro({ onOpen, onTap }) {
  const ref = useRef(null)
  const [opened, setOpened] = useState(false)
  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo('.env-wrapper', { opacity:0, scale:0.7, y:60 }, { opacity:1, scale:1, y:0, duration:1, ease:'back.out(1.5)', delay:0.3 })
      gsap.to('.env-hint', { opacity:1, duration:0.6, delay:1.4 })
      gsap.to('.env-wrapper', { y:-8, duration:1.4, ease:'sine.inOut', repeat:-1, yoyo:true, delay:1 })
    }, ref)
    return () => ctx.revert()
  }, [])
  function handleClick() {
    if (opened) return
    setOpened(true)
    onTap && onTap()
    const tl = gsap.timeline()
    tl.to('.env-flap', { rotateX:-180, duration:0.6, ease:'power2.inOut', transformOrigin:'top center' })
      .to('.env-letter-peek', { y:-70, opacity:1, duration:0.5, ease:'back.out(1.5)' }, '-=0.2')
      .to('.env-wrapper', { scale:1.05, duration:0.15 }).to('.env-wrapper', { scale:1, duration:0.15 })
      .to('.env-shine', { opacity:1, duration:0.3 })
      .to('.env-hint', { opacity:0, duration:0.2 }, 0)
      .to('.env-click-label', { opacity:1, y:0, duration:0.4, ease:'back.out' }, '-=0.1')
  }
  function handleEnter() {
    if (!opened) return
    gsap.to('.envelope-section', { scale:1.1, opacity:0, duration:0.5, ease:'power2.in', onComplete:onOpen })
  }
  return (
    <section className="envelope-section" ref={ref}>
      <FloatingHearts />
      <p className="env-pre-label">Ada sesuatu untukmu...</p>
      <div className="env-wrapper" onClick={handleClick}>
        <div className="env-shine" />
        <div className="env-body">
          <div className="env-flap" />
          <div className="env-bottom-fold" />
          <div className="env-left-fold" />
          <div className="env-right-fold" />
          <div className="env-heart-seal">💌</div>
        </div>
        <div className="env-letter-peek">
          <span>Happy</span><span>Anniversary</span><span>💕</span>
        </div>
      </div>
      <p className="env-hint">Ketuk amplop untuk membuka</p>
      <button className="env-enter-btn env-click-label" onClick={handleEnter}>Buka Kejutannya ✨</button>
    </section>
  )
}

// ─── Slide: Hero ───────────────────────────────────────────────────────────────
function SlideHero() {
  useEffect(() => {
    const tl = gsap.timeline({ delay: 0.1 })
    tl.fromTo('.s-hero-badge',  { opacity:0, y:20 }, { opacity:1, y:0, duration:0.5, ease:'back.out(1.7)' })
      .fromTo('.s-hero-heart',  { opacity:0, scale:0.5 }, { opacity:1, scale:1, duration:0.6, ease:'back.out(2)' }, '-=0.2')
      .fromTo('.s-hero-title',  { opacity:0, y:24 }, { opacity:1, y:0, duration:0.55, ease:'power3.out' }, '-=0.2')
      .fromTo('.s-hero-sub',    { opacity:0, y:16 }, { opacity:1, y:0, duration:0.5, ease:'power3.out' }, '-=0.2')
    gsap.to('.s-hero-heart', { scale:1.1, duration:0.8, ease:'sine.inOut', repeat:-1, yoyo:true, delay:1 })
  }, [])
  return (
    <div className="slide-inner slide-hero">
      <div className="hero-bg-glow" />
      <div className="s-hero-badge hero-badge">✨ Special Day ✨</div>
      <span className="s-hero-heart hero-main-heart">💕</span>
      <h1 className="s-hero-title hero-title">Happy <span>Anniversary</span>,<br />Sayangku 🌸</h1>
      <p className="s-hero-sub hero-subtitle">Hari ini adalah hari yang selalu akan aku ingat — hari di mana hidupku jadi lebih berwarna karena ada kamu. 💖</p>
    </div>
  )
}

// ─── Slide: Countdown ─────────────────────────────────────────────────────────
function SlideCountdown() {
  const [time, setTime] = useState({ days:0, hours:0, minutes:0, seconds:0 })
  const ANNIVERSARY_DATE = new Date('2024-07-12T00:00:00')
  useEffect(() => {
    function calc() {
      const diff = Date.now() - ANNIVERSARY_DATE
      if (diff < 0) return
      setTime({ days:Math.floor(diff/86400000), hours:Math.floor((diff%86400000)/3600000), minutes:Math.floor((diff%3600000)/60000), seconds:Math.floor((diff%60000)/1000) })
    }
    calc(); const iv = setInterval(calc,1000); return ()=>clearInterval(iv)
  }, [])
  useEffect(() => {
    gsap.fromTo('.cd-title', { opacity:0, y:20 }, { opacity:1, y:0, duration:0.5, delay:0.1, ease:'power3.out' })
    gsap.fromTo('.countdown-card', { opacity:0, y:30, scale:0.9 }, { opacity:1, y:0, scale:1, duration:0.5, stagger:0.1, ease:'back.out(1.5)', delay:0.2 })
  }, [])
  const items = [{ number:time.days, label:'Hari' },{ number:time.hours, label:'Jam' },{ number:time.minutes, label:'Menit' },{ number:time.seconds, label:'Detik' }]
  return (
    <div className="slide-inner slide-countdown">
      <p className="section-label">⏳ Sudah Berapa Lama</p>
      <h2 className="cd-title section-title">Kita Bersama 🥰</h2>
      <p className="section-desc">Setiap detik bersamamu adalah momen berharga yang tidak ingin aku tukar dengan apapun.</p>
      <div className="countdown-grid">
        {items.map(item => (
          <div className="countdown-card" key={item.label}>
            <span className="number">{String(item.number).padStart(2,'0')}</span>
            <span className="label">{item.label}</span>
          </div>
        ))}
      </div>
    </div>
  )
}

// ─── Slide: Scrapbook ─────────────────────────────────────────────────────────
function Lightbox({ photo, onClose }) {
  const ref = useRef(null)
  useEffect(() => {
    gsap.fromTo(ref.current, { opacity:0 }, { opacity:1, duration:0.3 })
    gsap.fromTo('.lb-card', { scale:0.75, rotation:-4, y:40 }, { scale:1, rotation:0, y:0, duration:0.45, ease:'back.out(1.6)' })
  }, [photo])
  function close() { gsap.to(ref.current, { opacity:0, duration:0.25, onComplete:onClose }) }
  return (
    <div className="lightbox" ref={ref} onClick={close}>
      <div className="lb-card" onClick={e=>e.stopPropagation()}>
        <button className="lb-close" onClick={close}>✕</button>
        <div className="lb-photo-wrap">
          {photo.src
            ? <img src={photo.src} alt={photo.caption} className="lb-photo" />
            : <div className="lb-placeholder"><span>{photo.emoji}</span><p>Foto segera hadir 📸</p></div>
          }
          <div className="lb-tape lb-tape-tl" /><div className="lb-tape lb-tape-tr" />
        </div>
        <p className="lb-caption">{photo.caption}</p>
        <p className="lb-date">{photo.date}</p>
      </div>
    </div>
  )
}

function SlideScrapbook() {
  const [activePhoto, setActivePhoto] = useState(null)
  const photos = [
    { id:1, src:'/photos/selfiepertama.jpeg',        emoji:'🤳', caption:'Selfie Pertama Kita',       date:'💛 Awal yang Manis',   rotate:-3, tape:'tl' },
    { id:2, src:'/photos/fotoboothpertama.jpeg',     emoji:'📸', caption:'Fotobooth Pertama',          date:'🩷 Momen Abadi',       rotate: 2, tape:'tr' },
    { id:3, src:'/photos/fotoboothkesekiankali.jpeg',emoji:'🎞️', caption:'Fotobooth Lagi & Lagi',     date:'✨ Kebiasaan Kita',    rotate:-2, tape:'tl' },
    { id:4, src:'/photos/badminton.jpeg',            emoji:'🏸', caption:'Main Bareng',                date:'💖 Kompak Terus',      rotate: 3, tape:'tr' },
    { id:5, src:'/photos/digebyok.jpeg',             emoji:'💦', caption:'Digebyok!',                  date:'😂 Lucu Banget',       rotate:-1, tape:'tl' },
    { id:6, src:'/photos/psan.jpeg',                 emoji:'💌', caption:'Pesan Sayang',               date:'🌸 Selalu di Hati',    rotate: 2, tape:'tr' },
  ]
  useEffect(() => {
    gsap.fromTo('.scrap-title', { opacity:0, y:20 }, { opacity:1, y:0, duration:0.5, delay:0.1 })
    gsap.fromTo('.scrap-item',
      { opacity:0, y:30 },
      { opacity:1, y:0, rotation:(i)=>photos[i%photos.length].rotate, duration:0.5, stagger:0.08, ease:'back.out(1.4)', delay:0.2 }
    )
  }, [])
  return (
    <div className="slide-inner slide-scrapbook">
      <p className="section-label">🌸 Kenangan Kita</p>
      <h2 className="scrap-title section-title">Scrapbook Kita 📷</h2>
      <p className="section-desc">Ketuk setiap foto untuk membuka kenangan indah kita.</p>
      <div className="scrapbook-grid">
        {photos.map(p => (
          <div key={p.id} className="scrap-item" style={{'--rot':`${p.rotate}deg`}} onClick={()=>setActivePhoto(p)}>
            <div className={`scrap-tape scrap-tape-${p.tape}`} />
            <div className="scrap-photo-wrap">
              {p.src ? <img src={p.src} alt={p.caption} className="scrap-photo" /> : <div className="scrap-empty"><span>{p.emoji}</span></div>}
            </div>
            <p className="scrap-caption">{p.caption}</p>
          </div>
        ))}
      </div>
      {activePhoto && <Lightbox photo={activePhoto} onClose={()=>setActivePhoto(null)} />}
    </div>
  )
}

// ─── Slide: Love Letter ───────────────────────────────────────────────────────
function SlideLoveLetter() {
  useEffect(() => {
    gsap.fromTo('.love-letter', { opacity:0, scale:0.9 }, { opacity:1, scale:1, duration:0.6, ease:'back.out(1.3)', delay:0.15 })
  }, [])
  return (
    <div className="slide-inner slide-letter">
      <p className="section-label">💌 Dari Hatiku</p>
      <h2 className="section-title">Surat Cinta<br />Untukmu</h2>
      <div className="love-letter">
        <p>Sayang, hari ini aku ingin kamu tahu betapa berartinya kamu bagiku. Kehadiranmu mengubah cara aku melihat dunia — semuanya terasa lebih cerah, lebih hangat, dan lebih bermakna.</p>
        <p>Kamu bukan hanya pacarku, kamu adalah teman terbaikku, tempat aku pulang, dan alasan aku tersenyum di hari yang paling biasa sekalipun.</p>
        <p>Di hari anniversary ini, aku ingin berjanji: aku akan selalu ada, selalu berusaha, dan selalu mencintaimu dengan sepenuh hatiku. 💕</p>
        <p>Terima kasih sudah memilihku, dan terima kasih sudah bertahan bersamaku. Kamu adalah hadiah terbaik yang pernah aku terima.</p>
        <div className="love-letter-sig">— Dengan cinta tulus ❤️</div>
      </div>
    </div>
  )
}

// ─── Slide: Reasons ───────────────────────────────────────────────────────────
function SlideReasons() {
  const reasons = [
    { title:'Senyumanmu',        text:'Senyum kamu bisa bikin hari-hariku yang berat terasa jauh lebih ringan dalam hitungan detik.' },
    { title:'Cara Kamu Peduli',  text:'Kamu selalu tahu kapan aku butuh dukungan, bahkan tanpa aku bilang. Itu luar biasa.' },
    { title:'Tawamu yang Menular', text:'Tertawa bersamamu adalah salah satu suara favorit yang ingin aku dengar setiap hari.' },
    { title:'Kejujuranmu',       text:'Kamu selalu jujur padaku meski kadang tidak mudah. Itu membuatku semakin percaya.' },
    { title:'Keberanianmu',      text:'Kamu menghadapi setiap tantangan dengan kepala tegak. Itu sangat menginspirasi aku.' },
    { title:'Kamu Apa Adanya',   text:'Bukan karena sempurna — tapi justru karena semua yang asli dari dirimu itulah yang aku cintai.' },
  ]
  useEffect(() => {
    gsap.fromTo('.reasons-title', { opacity:0, y:20 }, { opacity:1, y:0, duration:0.5, delay:0.1 })
    gsap.fromTo('.reason-item', { opacity:0, x:-30 }, { opacity:1, x:0, duration:0.45, stagger:0.07, ease:'power3.out', delay:0.2 })
  }, [])
  return (
    <div className="slide-inner slide-reasons">
      <p className="section-label">💝 Alasan Aku</p>
      <h2 className="reasons-title section-title">Mengapa Aku<br />Mencintaimu</h2>
      <div className="reasons-list">
        {reasons.map((r,i) => (
          <div className="reason-item" key={i}>
            <span className="reason-number">{String(i+1).padStart(2,'0')}</span>
            <p className="reason-text"><strong>{r.title}</strong>{r.text}</p>
          </div>
        ))}
      </div>
    </div>
  )
}

// ─── Slide: Promise ───────────────────────────────────────────────────────────
function SlidePromise() {
  const promises = [
    { emoji:'🤝', title:'Aku Akan Selalu Ada',  text:'Di saat susah maupun senang, aku akan selalu ada di sisimu.' },
    { emoji:'🌱', title:'Tumbuh Bersama',        text:'Aku ingin kita terus berkembang dan saling mendukung satu sama lain.' },
    { emoji:'😂', title:'Ketawa Setiap Hari',    text:'Aku berjanji untuk selalu menghadirkan tawa dalam hari-harimu.' },
    { emoji:'💬', title:'Selalu Jujur',          text:'Aku akan selalu berbicara dari hati dan tidak menyembunyikan apapun.' },
    { emoji:'🛡️', title:'Menjagamu',            text:'Perasaanmu, hatimu, dan kepercayaanmu akan selalu aku jaga.' },
  ]
  useEffect(() => {
    gsap.fromTo('.promise-title', { opacity:0, y:20 }, { opacity:1, y:0, duration:0.5, delay:0.1 })
    gsap.fromTo('.promise-card', { opacity:0, y:24 }, { opacity:1, y:0, duration:0.45, stagger:0.08, ease:'back.out(1.4)', delay:0.2 })
  }, [])
  return (
    <div className="slide-inner slide-promise">
      <p className="section-label">💍 Janjiku</p>
      <h2 className="promise-title section-title">Janjiku<br />Untukmu</h2>
      <div className="promise-cards">
        {promises.map((p,i) => (
          <div className="promise-card" key={i}>
            <span className="promise-emoji">{p.emoji}</span>
            <p className="promise-text"><strong>{p.title}</strong>{p.text}</p>
          </div>
        ))}
      </div>
    </div>
  )
}

// ─── Slide: Final ─────────────────────────────────────────────────────────────
function SlideFinal({ onKiss }) {
  useEffect(() => {
    const tl = gsap.timeline({ delay:0.1 })
    tl.fromTo('.final-big-heart', { opacity:0, scale:0.5 }, { opacity:1, scale:1, duration:0.6, ease:'back.out(2)' })
      .fromTo('.final-title',  { opacity:0, y:20 }, { opacity:1, y:0, duration:0.5, ease:'power3.out' }, '-=0.2')
      .fromTo('.final-text',   { opacity:0, y:16 }, { opacity:1, y:0, duration:0.5, ease:'power3.out' }, '-=0.2')
      .fromTo('.final-btn',    { opacity:0, y:16 }, { opacity:1, y:0, duration:0.45, ease:'back.out(1.5)' }, '-=0.2')
      .fromTo('.final-footer', { opacity:0 }, { opacity:1, duration:0.4 })
    gsap.to('.final-big-heart', { scale:1.1, duration:0.7, ease:'sine.inOut', repeat:-1, yoyo:true, delay:1 })
  }, [])
  return (
    <div className="slide-inner slide-final">
      <div className="final-glow" />
      <span className="final-big-heart">❤️</span>
      <h2 className="final-title">Happy Anniversary,<br />Sayang! 🥰</h2>
      <p className="final-text">Semoga kita bisa terus berjalan bersama, menghadapi segalanya berdua, dan menciptakan lebih banyak kenangan indah lagi. Aku sayang kamu, selamanya. 💕</p>
      <button className="final-btn" onClick={onKiss}>💋 Kirim Ciuman</button>
      <p className="final-footer">Made with ❤️ khusus untukmu</p>
    </div>
  )
}

// ─── Kiss Popup ───────────────────────────────────────────────────────────────
function KissPopup({ visible, onClose }) {
  const ref = useRef(null)
  useEffect(() => {
    if (visible) {
      gsap.to(ref.current, { opacity:1, duration:0.4, ease:'power2.out' })
      gsap.fromTo('.kiss-popup-content', { scale:0.7, rotation:-5 }, { scale:1, rotation:0, duration:0.5, ease:'back.out(1.8)', delay:0.1 })
    } else {
      gsap.to(ref.current, { opacity:0, duration:0.3 })
    }
  }, [visible])
  return (
    <div className={`kiss-popup ${visible?'active':''}`} ref={ref}>
      <div className="kiss-popup-content">
        <span className="kiss-emoji">💋</span>
        <h2 className="kiss-title">Mwah! 💕</h2>
        <p className="kiss-subtitle">Ciuman hangat dan penuh cinta khusus untukmu hari ini. Semoga harimu selalu seindah senyumanmu! 🌸</p>
        <button className="kiss-close" onClick={onClose}>Terima Kasih 💖</button>
      </div>
    </div>
  )
}

// ─── Slide: Cassette Video ────────────────────────────────────────────────────
function SlideCassette() {
  const [playing, setPlaying] = useState(false)
  const videoRef = useRef(null)
  const reelLRef = useRef(null)
  const reelRRef = useRef(null)
  const reelAnimL = useRef(null)
  const reelAnimR = useRef(null)

  useEffect(() => {
    // entrance animation
    gsap.fromTo('.cassette-wrap',
      { opacity: 0, y: 50, rotation: -6 },
      { opacity: 1, y: 0, rotation: -2, duration: 0.8, ease: 'back.out(1.5)', delay: 0.1 }
    )
    gsap.fromTo('.cassette-label-text',
      { opacity: 0, y: 10 },
      { opacity: 1, y: 0, duration: 0.5, delay: 0.6 }
    )
    gsap.fromTo('.cassette-hint',
      { opacity: 0 },
      { opacity: 1, duration: 0.5, delay: 1 }
    )
  }, [])

  function startReelSpin() {
    reelAnimL.current = gsap.to(reelLRef.current, { rotation: 360, duration: 1.8, ease: 'none', repeat: -1 })
    reelAnimR.current = gsap.to(reelRRef.current, { rotation: 360, duration: 2.4, ease: 'none', repeat: -1 })
  }
  function stopReelSpin() {
    reelAnimL.current?.kill()
    reelAnimR.current?.kill()
  }

  function handleCassetteClick() {
    if (playing) return
    setPlaying(true)
    // shake cassette then play
    gsap.to('.cassette-wrap', {
      rotation: 0, duration: 0.3, ease: 'back.out(2)',
      onComplete: () => {
        videoRef.current?.play()
        startReelSpin()
        gsap.to('.cassette-hint', { opacity: 0, duration: 0.3 })
        gsap.to('.cassette-play-btn', { opacity: 0, duration: 0.3 })
        gsap.to('.video-player', { opacity: 1, scale: 1, duration: 0.5, ease: 'back.out(1.4)' })
      }
    })
  }

  function handleVideoEnd() {
    setPlaying(false)
    stopReelSpin()
    gsap.to('.video-player', { opacity: 0, scale: 0.9, duration: 0.4 })
    gsap.to('.cassette-wrap', { rotation: -2, duration: 0.4 })
    gsap.to('.cassette-hint', { opacity: 1, duration: 0.4, delay: 0.3 })
    gsap.to('.cassette-play-btn', { opacity: 1, duration: 0.4, delay: 0.3 })
  }

  return (
    <div className="slide-inner slide-cassette">
      <p className="section-label">🎬 First Date</p>
      <h2 className="cassette-label-text section-title">Video Kenangan<br />Kita 🎞️</h2>

      {/* Cassette tape illustration */}
      <div className="cassette-wrap" onClick={handleCassetteClick}>
        <div className="cassette-body">
          {/* Top cutout with reels */}
          <div className="cassette-window">
            <div className="cassette-reel" ref={reelLRef}>
              <div className="reel-inner" />
              {[0,60,120,180,240,300].map(a => (
                <div key={a} className="reel-spoke" style={{ transform: `rotate(${a}deg)` }} />
              ))}
            </div>
            <div className="cassette-tape-line" />
            <div className="cassette-reel" ref={reelRRef}>
              <div className="reel-inner" />
              {[0,60,120,180,240,300].map(a => (
                <div key={a} className="reel-spoke" style={{ transform: `rotate(${a}deg)` }} />
              ))}
            </div>
          </div>
          {/* Label */}
          <div className="cassette-label">
            <p className="cassette-title">First Date 🎬</p>
            <p className="cassette-sub">Side A — Kenangan Terindah</p>
            <div className="cassette-lines">
              <span /><span /><span />
            </div>
          </div>
          {/* Bottom holes */}
          <div className="cassette-holes">
            <div className="cassette-hole" />
            <div className="cassette-screw" />
            <div className="cassette-hole" />
          </div>
        </div>
        {/* Play button overlay */}
        <div className="cassette-play-btn">▶ Putar Video</div>
      </div>

      <p className="cassette-hint">✨ Ketuk kaset untuk memutar</p>

      {/* Video player */}
      <div className="video-player">
        <video
          ref={videoRef}
          src="/photos/firstdate.mp4"
          className="cassette-video"
          playsInline
          controls
          onEnded={handleVideoEnd}
        />
      </div>
    </div>
  )
}
const SLIDE_LABELS = [
  '💕 Pembuka',
  '⏳ Waktu Kita',
  '📷 Kenangan',
  '🎬 Video',
  '💌 Surat',
  '💝 Alasan',
  '💍 Janji',
  '❤️ Penutup',
]

// ─── Slide Container ──────────────────────────────────────────────────────────
function SlideShow({ onKiss }) {
  const [current, setCurrent] = useState(0)
  const [animating, setAnimating] = useState(false)
  const containerRef = useRef(null)
  const total = SLIDE_LABELS.length

  const slides = [
    <SlideHero />,
    <SlideCountdown />,
    <SlideScrapbook />,
    <SlideCassette />,
    <SlideLoveLetter />,
    <SlideReasons />,
    <SlidePromise />,
    <SlideFinal onKiss={onKiss} />,
  ]

  const goTo = useCallback((next, dir) => {
    if (animating || next === current) return
    setAnimating(true)
    const outX = dir === 1 ? '-100%' : '100%'
    const inX  = dir === 1 ? '100%'  : '-100%'

    // Animate out current
    gsap.to(containerRef.current, {
      x: outX, opacity: 0, duration: 0.4, ease: 'power2.inOut',
      onComplete: () => {
        setCurrent(next)
        gsap.fromTo(containerRef.current,
          { x: inX, opacity: 0 },
          { x: '0%', opacity: 1, duration: 0.4, ease: 'power2.out',
            onComplete: () => setAnimating(false) }
        )
      }
    })
  }, [animating, current])

  function next() { if (current < total - 1) goTo(current + 1, 1) }
  function prev() { if (current > 0) goTo(current - 1, -1) }

  // Swipe support
  const touchStart = useRef(null)
  function onTouchStart(e) { touchStart.current = e.touches[0].clientX }
  function onTouchEnd(e) {
    if (touchStart.current === null) return
    const diff = touchStart.current - e.changedTouches[0].clientX
    if (Math.abs(diff) > 50) diff > 0 ? next() : prev()
    touchStart.current = null
  }

  return (
    <div className="slideshow-wrapper" onTouchStart={onTouchStart} onTouchEnd={onTouchEnd}>
      <FloatingHearts />

      {/* Slide dots */}
      <div className="slide-dots">
        {slides.map((_, i) => (
          <button
            key={i}
            className={`slide-dot ${i === current ? 'active' : ''}`}
            onClick={() => goTo(i, i > current ? 1 : -1)}
            aria-label={SLIDE_LABELS[i]}
          />
        ))}
      </div>

      {/* Counter */}
      <div className="slide-counter-wrap">
        <span className="slide-counter">{current + 1} / {total}</span>
      </div>

      {/* Slide label */}
      <div className="slide-label-top">{SLIDE_LABELS[current]}</div>

      {/* Slide content */}
      <div className="slide-content" ref={containerRef}>
        {slides[current]}
      </div>

      {/* Navigation — kiri & kanan tengah */}
      <div className="slide-nav">
        <button
          className={`slide-btn slide-btn-prev ${current === 0 ? 'hidden' : ''}`}
          onClick={prev}
          aria-label="Sebelumnya"
        >
          ←
        </button>
        <button
          className={`slide-btn slide-btn-next ${current === total - 1 ? 'hidden' : ''}`}
          onClick={next}
          aria-label="Selanjutnya"
        >
          →
        </button>
      </div>
    </div>
  )
}

// ─── App Root ─────────────────────────────────────────────────────────────────
export default function App() {
  const [started, setStarted]       = useState(false)
  const [kissVisible, setKissVisible] = useState(false)
  const [musicPlaying, setMusicPlaying] = useState(false)
  const playerRef = useRef(null)

  function handlePlayerReady() {}

  function handleTap() {
    setTimeout(() => {
      if (playerRef.current?.playVideo) {
        playerRef.current.setVolume(70)
        playerRef.current.playVideo()
        setMusicPlaying(true)
      }
    }, 200)
  }

  function handleOpen() { setStarted(true) }

  function toggleMusic() {
    if (!playerRef.current) return
    if (musicPlaying) { playerRef.current.pauseVideo(); setMusicPlaying(false) }
    else              { playerRef.current.playVideo();  setMusicPlaying(true)  }
  }

  if (!started) {
    return (
      <>
        <YouTubePlayer playerRef={playerRef} onReady={handlePlayerReady} />
        <EnvelopeIntro onOpen={handleOpen} onTap={handleTap} />
      </>
    )
  }

  return (
    <>
      <YouTubePlayer playerRef={playerRef} onReady={handlePlayerReady} />
      <MusicButton playing={musicPlaying} onToggle={toggleMusic} />
      <SlideShow onKiss={() => setKissVisible(true)} />
      <KissPopup visible={kissVisible} onClose={() => setKissVisible(false)} />
    </>
  )
}
