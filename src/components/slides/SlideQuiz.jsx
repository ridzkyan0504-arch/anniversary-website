import { useState } from 'react'

const QUESTIONS = [
  {
    question: 'Kalau kita jalan bareng, hal paling wajib apa?',
    options: ['Foto-foto dulu 📸', 'Cari makan enak 🍜', 'Dua-duanya dong! 💕'],
    answer: 2,
  },
  {
    question: 'Siapa yang paling bikin hari jadi lebih seru?',
    options: ['Kian', 'Putri', 'Kita berdua! 🥰'],
    answer: 2,
  },
  {
    question: 'Hadiah terbaik untuk anniversary ini?',
    options: ['Pelukan lama 🤍', 'Waktu bersama', 'Semua jawaban benar ✨'],
    answer: 2,
  },
]

export default function SlideQuiz() {
  const [current, setCurrent] = useState(0)
  const [selected, setSelected] = useState(null)
  const question = QUESTIONS[current]
  const isCorrect = selected === question.answer

  function choose(optionIndex) {
    if (selected !== null) return
    setSelected(optionIndex)
  }

  function nextQuestion() {
    if (current === QUESTIONS.length - 1) {
      setCurrent(0)
    } else {
      setCurrent((value) => value + 1)
    }
    setSelected(null)
  }

  return (
    <div className="slide-inner slide-quiz">
      <p className="section-label">🎲 Mini Game Kita</p>
      <h2 className="section-title">Kuis Kecil<br />Tentang Kita</h2>
      <div className="quiz-card" key={current}>
        <p className="quiz-progress">{current + 1} dari {QUESTIONS.length}</p>
        <h3 className="quiz-question">{question.question}</h3>
        <div className={`quiz-options ${selected !== null ? 'answered' : ''}`}>
          {question.options.map((option, index) => (
            <button
              className={`quiz-option ${selected === index ? (index === question.answer ? 'correct' : 'wrong') : ''}`}
              key={option}
              onClick={() => choose(index)}
              style={{ '--quiz-index': index }}
            >
              {option}
            </button>
          ))}
        </div>
        {selected !== null && (
          <div className="quiz-result" aria-live="polite">
            <p>{isCorrect ? 'Benar! Memang paling seru kalau bersama kamu 💖' : 'Hampir! Jawaban paling manis adalah “kita berdua” 💕'}</p>
            <button onClick={nextQuestion}>{current === QUESTIONS.length - 1 ? 'Ulangi Kuis ↻' : 'Pertanyaan Berikutnya →'}</button>
          </div>
        )}
      </div>
    </div>
  )
}
