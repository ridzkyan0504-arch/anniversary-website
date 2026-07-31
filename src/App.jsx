import { useCallback, useRef, useState } from 'react'
import './App.css'

import YouTubePlayer from './components/YouTubePlayer'
import EnvelopeIntro from './components/EnvelopeIntro'
import MusicButton from './components/MusicButton'
import SlideShow from './components/SlideShow'
import KissPopup from './components/KissPopup'

export default function App() {
  const [started, setStarted] = useState(false)
  const [kissVisible, setKissVisible] = useState(false)
  const [musicPlaying, setMusicPlaying] = useState(false)
  const playerRef = useRef(null)
  const shouldPlayMusicRef = useRef(false)

  const startMusic = useCallback(() => {
    const player = playerRef.current
    if (!player?.playVideo) return false

    try {
      player.seekTo(20, true)
      player.setVolume(70)
      player.unMute?.()
      player.playVideo()
    } catch (err) {
      console.warn('[music] playVideo failed:', err)
      return false
    }
    setMusicPlaying(true)
    return true
  }, [])

  const handlePlayerReady = useCallback(() => {
    if (shouldPlayMusicRef.current) {
      requestAnimationFrame(() => startMusic())
    }
  }, [startMusic])

  function handleTap() {
    shouldPlayMusicRef.current = true
    startMusic()
  }

  function handleOpen() {
    setStarted(true)
  }

  function toggleMusic() {
    if (!playerRef.current?.playVideo) return
    if (musicPlaying) {
      playerRef.current.pauseVideo()
      setMusicPlaying(false)
    } else {
      playerRef.current.unMute?.()
      playerRef.current.playVideo()
      setMusicPlaying(true)
    }
  }

  return (
    <>
      <YouTubePlayer playerRef={playerRef} onReady={handlePlayerReady} />
      {!started ? (
        <EnvelopeIntro onOpen={handleOpen} onTap={handleTap} />
      ) : (
        <>
          <MusicButton playing={musicPlaying} onToggle={toggleMusic} />
          <SlideShow onKiss={() => setKissVisible(true)} />
          <KissPopup visible={kissVisible} onClose={() => setKissVisible(false)} />
        </>
      )}
    </>
  )
}
