import { useState } from 'react'
import { gsap } from 'gsap'

export default function SlideFlipbook() {
  const [currentPage, setCurrentPage] = useState(0)

  // Array of pages. Each object represents a physical leaf in the book.
  // Front and Back faces of the leaf.
  const leaves = [
    {
      id: 0,
      front: { isCover: true, title: 'Pesona Putri ✨', emoji: '📸' },
      back: { }
    },
    { id: 1, front: { photo: '/photos/putri-1.jpg' }, back: { } },
    { id: 2, front: { photo: '/photos/putri-2.jpg' }, back: { } },
    { id: 3, front: { photo: '/photos/putri-3.jpg' }, back: { } },
    { id: 4, front: { photo: '/photos/putri-4.jpg' }, back: { } },
    { id: 5, front: { photo: '/photos/putri-5.jpg' }, back: { } },
    { id: 6, front: { photo: '/photos/putri-6.jpg' }, back: { } },
    { id: 7, front: { photo: '/photos/putri-7.jpg' }, back: { } },
    { id: 8, front: { photo: '/photos/putri-8.jpg' }, back: { } },
    { id: 9, front: { photo: '/photos/putri-9.jpg' }, back: { } },
    {
      id: 10,
      front: { photo: '/photos/putri-10.jpg' },
      back: { isCover: true, title: 'Cantik Banget!', emoji: '❤️' }
    }
  ]

  const totalLeaves = leaves.length

  function turnPage(direction) {
    if (direction === 'next' && currentPage < totalLeaves) {
      setCurrentPage(currentPage + 1)
    } else if (direction === 'prev' && currentPage > 0) {
      setCurrentPage(currentPage - 1)
    }
  }

  return (
    <div className="slide-inner slide-flipbook">
      <p className="section-label">📸 Khusus Putri</p>
      <h2 className="section-title">Album<br />Pesona Putri</h2>

      {/* Book Container */}
      <div className={`book-container ${currentPage === 0 ? 'closed' : currentPage === totalLeaves ? 'closed-end' : 'opened'}`}>
        <div className="book">
          {leaves.map((leaf, index) => {
            const isFlipped = index < currentPage
            const zIndex = isFlipped ? index : totalLeaves - index

            return (
              <div 
                key={leaf.id} 
                className={`leaf ${isFlipped ? 'flipped' : ''}`} 
                style={{ zIndex }}
                onClick={() => turnPage(isFlipped ? 'prev' : 'next')}
              >
                {/* FRONT FACE */}
                <div className={`leaf-face leaf-front ${leaf.front.isCover ? 'cover' : ''}`}>
                  {leaf.front.isCover ? (
                    <div className="cover-content">
                      <span className="cover-emoji">{leaf.front.emoji}</span>
                      <h3 className="cover-title">{leaf.front.title}</h3>
                    </div>
                  ) : (
                    <div className="page-content">
                      {leaf.front.photo && (
                        <div className="page-img-wrap" style={{ height: leaf.front.caption ? '160px' : '100%', marginBottom: leaf.front.caption ? '12px' : '0' }}>
                          <img src={leaf.front.photo} alt="Putri" className="page-img" />
                        </div>
                      )}
                      {leaf.front.caption && <p className="page-caption">{leaf.front.caption}</p>}
                    </div>
                  )}
                  {/* Page curl effect / shading */}
                  <div className="leaf-shading" />
                </div>

                {/* BACK FACE */}
                <div className={`leaf-face leaf-back ${leaf.back && leaf.back.isCover ? 'cover' : ''}`}>
                  {leaf.back && leaf.back.isCover ? (
                    <div className="cover-content">
                      <span className="cover-emoji">{leaf.back.emoji}</span>
                      <h3 className="cover-title">{leaf.back.title}</h3>
                    </div>
                  ) : (
                    <div className="page-content back-content">
                      {leaf.back && leaf.back.text && <p className="back-text">{leaf.back.text}</p>}
                      {leaf.back && leaf.back.photo && (
                        <div className="page-img-wrap" style={{ height: '100%', marginBottom: '0' }}>
                          <img src={leaf.back.photo} alt="Putri" className="page-img" />
                        </div>
                      )}
                    </div>
                  )}
                  <div className="leaf-shading back-shading" />
                </div>
              </div>
            )
          })}
        </div>
      </div>

      <p className="book-hint">Ketuk bukunya untuk membuka halaman ✨</p>
    </div>
  )
}
