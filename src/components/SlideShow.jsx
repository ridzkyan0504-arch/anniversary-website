import { useState, useRef, useCallback, useEffect, useMemo } from 'react'
import { gsap } from 'gsap'

import FloatingHearts from './FloatingHearts'
import SlideHero from './slides/SlideHero'
import SlideCountdown from './slides/SlideCountdown'
import SlideScrapbook from './slides/SlideScrapbook'
import SlideQuiz from './slides/SlideQuiz'
import SlideCassette from './slides/SlideCassette'
import SlideLoveLetter from './slides/SlideLoveLetter'
import SlideReasons from './slides/SlideReasons'
import SlidePromise from './slides/SlidePromise'
import SlideFinal from './slides/SlideFinal'
import SlideGift from './slides/SlideGift'
import SlideStars from './slides/SlideStars'
import SlideFlipbook from './slides/SlideFlipbook'

const SLIDE_LABELS = [
  '💕 Pembuka',
  '⏳ Waktu Kita',
  '📷 Kenangan',
  '🎲 Kuis Kita',
  '📖 Buku Cerita',
  '🎬 Video',
  '💌 Surat',
  '💝 Alasan',
  '🎁 Kado',
  '⭐ Bintang',
  '💍 Janji',
  '❤️ Penutup',
]

export default function SlideShow({ onKiss }) {
  const [current, setCurrent] = useState(0)
  const [animating, setAnimating] = useState(false)
  const containerRef = useRef(null)
  const transitionRef = useRef(null)
  const total = SLIDE_LABELS.length

  const slides = useMemo(() => [
    <SlideHero key="hero" />,
    <SlideCountdown key="countdown" />,
    <SlideScrapbook key="scrapbook" />,
    <SlideQuiz key="quiz" />,
    <SlideFlipbook key="flipbook" />,
    <SlideCassette key="cassette" />,
    <SlideLoveLetter key="loveletter" />,
    <SlideReasons key="reasons" />,
    <SlideGift key="gift" />,
    <SlideStars key="stars" />,
    <SlidePromise key="promise" />,
    <SlideFinal key="final" onKiss={onKiss} />,
  ], [onKiss])

  useEffect(() => () => transitionRef.current?.kill(), [])

  const goTo = useCallback(
    (next, dir) => {
      if (animating || next === current) return
      setAnimating(true)
      const outX = dir === 1 ? '-100%' : '100%'
      const inX = dir === 1 ? '100%' : '-100%'

      // Animate out current
      transitionRef.current = gsap.to(containerRef.current, {
        x: outX,
        opacity: 0,
        duration: 0.4,
        ease: 'power2.inOut',
        onComplete: () => {
          setCurrent(next)
          requestAnimationFrame(() => {
            transitionRef.current = gsap.fromTo(
              containerRef.current,
              { x: inX, opacity: 0 },
              {
                x: '0%', opacity: 1, duration: 0.4, ease: 'power2.out',
                onComplete: () => setAnimating(false),
              }
            )
          })
        },
      })
    },
    [animating, current]
  )

  function next() {
    if (current < total - 1) goTo(current + 1, 1)
  }

  function prev() {
    if (current > 0) goTo(current - 1, -1)
  }

  // Swipe support
  const touchStart = useRef(null)

  function onTouchStart(e) {
    touchStart.current = e.touches[0].clientX
  }

  function onTouchEnd(e) {
    if (touchStart.current === null) return
    const diff = touchStart.current - e.changedTouches[0].clientX
    if (Math.abs(diff) > 50) {
      if (diff > 0) next()
      else prev()
    }
    touchStart.current = null
  }

  const isFinal = current === total - 1

  return (
    <div
      className={`slideshow-wrapper ${isFinal ? 'is-final' : ''}`}
      onTouchStart={onTouchStart}
      onTouchEnd={onTouchEnd}
    >
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
        <span className="slide-counter">
          {current + 1} / {total}
        </span>
      </div>

      {/* Slide label */}
      <div className="slide-label-top">{SLIDE_LABELS[current]}</div>

      {/* Slide content */}
      <div className={`slide-content ${current === total - 1 ? 'is-final' : ''}`} ref={containerRef}>
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
