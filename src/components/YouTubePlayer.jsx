import { useEffect, useRef } from 'react'

const YT_VIDEO_ID = 'awWKxGftWh4'
let youtubeApiPromise

function loadYouTubeApi() {
  if (window.YT?.Player) return Promise.resolve()
  if (youtubeApiPromise) return youtubeApiPromise

  youtubeApiPromise = new Promise((resolve) => {
    const previousReadyHandler = window.onYouTubeIframeAPIReady
    window.onYouTubeIframeAPIReady = () => {
      previousReadyHandler?.()
      resolve()
    }

    if (!document.querySelector('script[src="https://www.youtube.com/iframe_api"]')) {
      const tag = document.createElement('script')
      tag.src = 'https://www.youtube.com/iframe_api'
      document.head.appendChild(tag)
    }
  })

  return youtubeApiPromise
}

export default function YouTubePlayer({ playerRef, onReady }) {
  const containerRef = useRef(null)

  useEffect(() => {
    let destroyed = false
    let player

    loadYouTubeApi().then(() => {
      if (destroyed || !containerRef.current) return
      player = new window.YT.Player(containerRef.current, {
        videoId: YT_VIDEO_ID,
        playerVars: {
          autoplay: 0,
          controls: 0,
          loop: 1,
          playlist: YT_VIDEO_ID,
          modestbranding: 1,
          rel: 0,
          iv_load_policy: 3,
          disablekb: 1,
        },
        events: {
          onReady: () => onReady && onReady(),
        },
      })
      playerRef.current = player
    })

    return () => {
      destroyed = true
      if (player) {
        player.destroy()
      }
      if (playerRef.current === player) {
        playerRef.current = null
      }
    }
  }, [onReady, playerRef])

  return (
    <div
      style={{ position: 'fixed', top: -9999, left: -9999, width: 1, height: 1, overflow: 'hidden' }}
      aria-hidden="true"
    >
      <div ref={containerRef} />
    </div>
  )
}
