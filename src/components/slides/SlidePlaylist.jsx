import { useState } from 'react'

const SONGS = [
  { title: 'Satu Bulan', artist: 'Bernadya', emoji: '🌷', color: 'peach' },
  { title: 'Bunga Maaf', artist: 'The Lantis', emoji: '🎧', color: 'violet' },
  { title: 'Bergema Sampai Selamanya', artist: 'Nadhif Basalamah', emoji: '✨', color: 'rose' },
]

export default function SlidePlaylist() {
  const [activeSong, setActiveSong] = useState(0)
  const song = SONGS[activeSong]

  function selectSong(index) {
    setActiveSong(index)
  }

  return (
    <div className="slide-inner slide-playlist">
      <p className="section-label">🎵 Lagu Kita</p>
      <h2 className="section-title">Playlist<br />Untuk Kita Berdua</h2>
      <div className="apple-music-player">
        <div className={`apple-album-art ${song.color}`}>
          <span>{song.emoji}</span>
          <i>♥</i>
        </div>
        <p className="apple-playing-label">SEDANG DIPUTAR</p>
        <h3 className="apple-song-title">{song.title}</h3>
        <p className="apple-artist">{song.artist}</p>
        <div className="apple-progress" aria-hidden="true"><span /></div>
        <div className="apple-time"><span>0:42</span><span>3:28</span></div>
        <div className="apple-controls" aria-label="Kontrol playlist">
          <button onClick={() => selectSong((activeSong + SONGS.length - 1) % SONGS.length)} aria-label="Lagu sebelumnya">⏮</button>
          <button className="apple-play" aria-label="Putar lagu">▶</button>
          <button onClick={() => selectSong((activeSong + 1) % SONGS.length)} aria-label="Lagu berikutnya">⏭</button>
        </div>
      </div>
      <div className="playlist-card">
        {SONGS.map((song, index) => (
          <button className={`playlist-song ${activeSong === index ? 'active' : ''}`} key={song.title} onClick={() => selectSong(index)}>
            <span className="playlist-number">{String(index + 1).padStart(2, '0')}</span>
            <span className="playlist-emoji">{song.emoji}</span>
            <span className="playlist-info"><strong>{song.title}</strong><small>{song.artist}</small></span>
            <span className="playlist-note">{activeSong === index ? '⋮' : '♫'}</span>
          </button>
        ))}
      </div>
      <p className="playlist-hint">Pilih lagu untuk mengganti tampilannya. Musik utama tetap ada di tombol kanan bawah 💗</p>
    </div>
  )
}
