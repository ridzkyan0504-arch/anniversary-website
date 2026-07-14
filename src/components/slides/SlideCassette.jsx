import { useEffect, useRef, useState } from 'react'
import { gsap } from 'gsap'

export default function SlideCassette() {
  const [playing, setPlaying] = useState(false)
  const videoRef = useRef(null)
  const reelLRef = useRef(null)
  const reelRRef = useRef(null)
  const reelAnimL = useRef(null)
  const reelAnimR = useRef(null)
  const overlayRef = useRef(null)

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
        startReelSpin()
        gsap.to('.cassette-hint', { opacity: 0, duration: 0.3 })
        gsap.to('.cassette-play-btn', { opacity: 0, duration: 0.3 })
        // Show overlay first, then play video
        gsap.to(overlayRef.current, { opacity: 1, duration: 0.4, ease: 'power2.out' })
        gsap.fromTo('.video-modal-content',
          { scale: 0.7, y: 40 },
          {
            scale: 1, y: 0, duration: 0.5, ease: 'back.out(1.6)', delay: 0.1,
            onComplete: () => {
              videoRef.current?.play()
            }
          }
        )
      }
    })
  }

  function closeVideo() {
    if (videoRef.current) {
      videoRef.current.pause()
      videoRef.current.currentTime = 0
    }
    setPlaying(false)
    stopReelSpin()
    gsap.to('.video-modal-content', { scale: 0.8, y: 30, opacity: 0, duration: 0.3, ease: 'power2.in' })
    gsap.to(overlayRef.current, {
      opacity: 0, duration: 0.35, delay: 0.15,
      onComplete: () => {
        gsap.set('.video-modal-content', { opacity: 1 })
      }
    })
    gsap.to('.cassette-wrap', { rotation: -2, duration: 0.4 })
    gsap.to('.cassette-hint', { opacity: 1, duration: 0.4, delay: 0.3 })
    gsap.to('.cassette-play-btn', { opacity: 1, duration: 0.4, delay: 0.3 })
  }

  function handleVideoEnd() {
    closeVideo()
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
              {[0, 60, 120, 180, 240, 300].map(a => (
                <div key={a} className="reel-spoke" style={{ transform: `rotate(${a}deg)` }} />
              ))}
            </div>
            <div className="cassette-tape-line" />
            <div className="cassette-reel" ref={reelRRef}>
              <div className="reel-inner" />
              {[0, 60, 120, 180, 240, 300].map(a => (
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

      {/* Fullscreen Video Overlay */}
      <div className={`video-overlay ${playing ? 'active' : ''}`} ref={overlayRef} onClick={closeVideo}>
        <div className="video-modal-content" onClick={e => e.stopPropagation()}>
          <button className="video-close-btn" onClick={closeVideo}>✕</button>
          <div className="video-player-frame">
            <video
              ref={videoRef}
              src="/photos/firstdate.mp4"
              className="cassette-video"
              playsInline
              controls
              onEnded={handleVideoEnd}
            />
          </div>
          <p className="video-modal-caption">🎬 First Date — Kenangan Terindah 💕</p>
        </div>
      </div>
    </div>
  )
}
