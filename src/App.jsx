import { useState, useRef } from 'react'
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

  function handleOpen() {
    setStarted(true)
  }

  function toggleMusic() {
    if (!playerRef.current) return
    if (musicPlaying) {
      playerRef.current.pauseVideo()
      setMusicPlaying(false)
    } else {
      playerRef.current.playVideo()
      setMusicPlaying(true)
    }
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

