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

    player.setVolume(70)
    player.playVideo()
    setMusicPlaying(true)
    return true
  }, [])

  const handlePlayerReady = useCallback(() => {
    if (shouldPlayMusicRef.current) startMusic()
  }, [startMusic])

  function handleTap() {
    shouldPlayMusicRef.current = true
    setTimeout(() => {
      startMusic()
    }, 200)
  }

  function handleOpen() {
    setStarted(true)
  }

  function toggleMusic() {
    if (!playerRef.current) return
    if (musicPlaying) {
      playerRef.current.pauseVideo()
      setMusicPlaying(false)
    } else {
      shouldPlayMusicRef.current = true
      startMusic()
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
