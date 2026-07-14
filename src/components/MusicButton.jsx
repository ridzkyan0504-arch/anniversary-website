export default function MusicButton({ playing, onToggle }) {
  return (
    <button
      className={`music-fab ${playing ? 'playing' : 'paused'}`}
      onClick={onToggle}
      aria-label={playing ? 'Pause' : 'Play'}
    >
      <span className="music-fab-icon">{playing ? '🎵' : '🎶'}</span>
      <span className="music-fab-bars">
        <span />
        <span />
        <span />
        <span />
      </span>
    </button>
  )
}
