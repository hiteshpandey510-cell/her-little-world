import { useState, useEffect } from 'react'
import './App.css'

const memories = [
  {
    title: 'Our First Meeting',
    subtitle: 'Where our story began 💗',
    icon: '🏡',
    text: 'That day at Abhilash’s flat became special in a way we probably never expected. A simple meeting turned into a beautiful memory.',
    scene: 'meeting'
  },
  {
    title: 'The Bike Ride',
    subtitle: 'A little ride together 🏍️',
    icon: '🏍️',
    text: 'We went together on the bike to get Magic Moments. It was just a small ride, but it became part of our story.',
    scene: 'bike'
  },
  {
    title: 'Magic Moments',
    subtitle: 'A memory with a name ✨',
    icon: '🍾',
    text: 'Remember Magic Moments? Some memories become special not because of what happened, but because of who was there.',
    scene: 'magic'
  },
  {
    title: 'Our First Kiss',
    subtitle: 'A moment to remember 💋',
    icon: '💋',
    text: 'At Abhilash’s flat, we shared our first kiss. I may not remember every little detail, but I will always remember how special that moment was.',
    scene: 'kiss'
  },
  {
    title: 'Jaipur Together',
    subtitle: 'Pink City memories 🌸',
    icon: '🏰',
    text: 'Our Jaipur trip! Another place, another chapter, and another set of memories that I want to keep close to my heart.',
    scene: 'jaipur'
  },
  {
    title: 'Kasauli Trip',
    subtitle: 'Mountains and memories ⛰️',
    icon: '🌲',
    text: 'Kasauli gave us another beautiful chapter together. A trip that I will always remember.',
    scene: 'kasauli'
  },
  {
    title: 'The Bro Code Incident',
    subtitle: 'Okay, this was embarrassing 😂',
    icon: '😂',
    text: 'I drank Bro Code and ended up vomiting. Definitely not my proudest moment. But somehow, even this became one of our memories.',
    scene: 'brocode'
  },
  {
    title: 'You Took Care of Me',
    subtitle: 'One reason you are special ❤️',
    icon: '🥹',
    text: 'When I was not feeling well, you took care of me. Maybe it seemed like a small thing to you, but it meant a lot to me. Thank you for being there.',
    scene: 'care'
  }
]

const questions = [
  {
    question: 'Who is the cutest person ever?',
    options: ['Me 😎', 'Avuuu 💗', 'A teddy bear 🧸'],
    answer: 1
  },
  {
    question: 'Who owns my heart?',
    options: ['Nobody', 'Avuuu 💕', 'Pizza 🍕'],
    answer: 1
  },
  {
    question: 'Where is my favourite place?',
    options: ['My bedroom', 'With Avuuu ❤️', 'The moon 🌙'],
    answer: 1
  },
  {
    question: 'Who deserves unlimited hugs?',
    options: ['Me', 'Avuuu 🥰', 'My teddy'],
    answer: 1
  }
]

const secretMessages = [
  'You are my favourite human. ❤️',
  'I love your smile, Avuuu! 🥹',
  'You make ordinary days special.',
  'Sending you unlimited hugs! 🤗',
  'You are my favourite notification. 💗',
  'Hitesh loves you more than anything! 🧸',
  'You are my little sunshine! ☀️'
]

const cards = ['💗', '🌸', '🧸', '🌙', '💗', '🌸', '🧸', '🌙']

function App() {
  const [intro, setIntro] = useState(true)
  const [welcome, setWelcome] = useState(false)
  const [night, setNight] = useState(false)

  const [selectedMemory, setSelectedMemory] = useState(null)
  const [secret, setSecret] = useState('')

  const [teddyBounce, setTeddyBounce] = useState(false)

  const [letterOpen, setLetterOpen] = useState(false)
  const [giftOpen, setGiftOpen] = useState(false)
  const [missOpen, setMissOpen] = useState(false)

  const [question, setQuestion] = useState(0)
  const [score, setScore] = useState(0)
  const [quizDone, setQuizDone] = useState(false)

  const [hearts, setHearts] = useState(0)

  const [match, setMatch] = useState([])
  const [matched, setMatched] = useState([])

  const [music, setMusic] = useState(false)
  const [finalOpen, setFinalOpen] = useState(false)

  // MAGICAL CURSOR EFFECT
  useEffect(() => {
    let lastSparkle = 0

    const createSparkle = (e) => {
      if (e.pointerType === 'touch') return

      const now = Date.now()

      if (now - lastSparkle < 65) return

      lastSparkle = now

      const sparkle = document.createElement('span')

      const symbols = ['💗', '✨', '💕', '✦', '🌸', '💖']

      sparkle.className = 'cursor-sparkle'

      sparkle.textContent =
        symbols[Math.floor(Math.random() * symbols.length)]

      sparkle.style.left = `${e.clientX}px`
      sparkle.style.top = `${e.clientY}px`

      document.body.appendChild(sparkle)

      window.setTimeout(() => {
        sparkle.remove()
      }, 1000)
    }

    window.addEventListener('pointermove', createSparkle, {
      passive: true
    })

    return () => {
      window.removeEventListener('pointermove', createSparkle)

      document
        .querySelectorAll('.cursor-sparkle')
        .forEach((element) => element.remove())
    }
  }, [])

  // TEDDY CLICK ANIMATION
  const handleTeddyClick = () => {
    const randomMessage =
      secretMessages[
        Math.floor(Math.random() * secretMessages.length)
      ]

    setSecret(randomMessage)

    setTeddyBounce(false)

    requestAnimationFrame(() => {
      setTeddyBounce(true)
    })

    window.setTimeout(() => {
      setTeddyBounce(false)
    }, 850)
  }

  // LOVE QUIZ
  const chooseAnswer = (index) => {
    if (index === questions[question].answer) {
      setScore((previous) => previous + 1)
    }

    if (question + 1 < questions.length) {
      setQuestion((previous) => previous + 1)
    } else {
      setQuizDone(true)
    }
  }

  const resetQuiz = () => {
    setQuestion(0)
    setScore(0)
    setQuizDone(false)
  }

  // MEMORY MATCH GAME
  const chooseCard = (index) => {
    if (
      match.includes(index) ||
      matched.includes(index) ||
      match.length === 2
    ) {
      return
    }

    const next = [...match, index]

    setMatch(next)

    if (next.length === 2) {
      if (cards[next[0]] === cards[next[1]]) {
        window.setTimeout(() => {
          setMatched((old) => [...old, ...next])
          setMatch([])
        }, 500)
      } else {
        window.setTimeout(() => {
          setMatch([])
        }, 900)
      }
    }
  }

  return (
    <main className={night ? 'app night' : 'app'}>

      {/* CINEMATIC INTRO */}

      {intro && (
        <section className="cinematic-intro">

          <div className="intro-stars">
            ✦ ⋆ ✧ ⋆ ✦
          </div>

          <div className="intro-content">

            <p className="intro-small">
              A LITTLE WORLD MADE FOR YOU
            </p>

            <h1>
              Some stories are written in destiny...
            </h1>

            <h2>
              Ours started with a little bike ride. ❤️
            </h2>

            <p className="intro-note">
              And I would choose our story again and again.
            </p>

            <button
              className="main-button"
              onClick={() => setIntro(false)}
            >
              Begin Our Story 💗
            </button>

            <button
              className="skip-button"
              onClick={() => setIntro(false)}
            >
              Skip intro
            </button>

          </div>
        </section>
      )}

      {/* WELCOME SCREEN */}

      {!intro && !welcome && (
        <section className="welcome-screen">

          <div className="welcome-heart">
            💗
          </div>

          <p>
            A little surprise for someone special
          </p>

          <h1>
            Hey Avuuu!
          </h1>

          <h2>
            Someone made a whole little world for you.
          </h2>

          <button
            className="main-button"
            onClick={() => setWelcome(true)}
          >
            Open Your Little World ✨
          </button>

        </section>
      )}

      {/* MAIN WEBSITE */}

      {!intro && welcome && (
        <>

          {/* DECORATIVE SKY */}

          <div className="sky-decoration">

            <div className="moon">🌙</div>

            <div className="sky-star star-one">✦</div>
            <div className="sky-star star-two">✧</div>
            <div className="sky-star star-three">⋆</div>
            <div className="sky-star star-four">✦</div>
            <div className="sky-star star-five">✧</div>

            <div className="day-decoration day-flower-one">🌸</div>
            <div className="day-decoration day-flower-two">🌷</div>
            <div className="day-decoration day-flower-three">💗</div>

          </div>

          {/* NAVBAR */}

          <nav className="navbar">

            <a href="#home" className="logo">
              For Avuuu 💗
            </a>

            <button
              className="theme-button"
              onClick={() => setNight(!night)}
            >
              {night ? '☀️ Day Mode' : '🌙 Night Mode'}
            </button>

          </nav>

          {/* HERO */}

          <section className="hero" id="home">

            <div className="hero-hearts">
              💗 ✨ 💕
            </div>

            <p className="eyebrow">
              WELCOME TO YOUR LITTLE UNIVERSE
            </p>

            <h1>
              Avuuu's Little World
            </h1>

            <h2>
              Made with love, just for you. ❤️
            </h2>

            <p className="hero-description">
              A place filled with our memories, silly moments,
              little surprises and a whole lot of love.
            </p>

            <a href="#memories" className="main-button">
              Explore Our Story ↓
            </a>

            {/* INTERACTIVE TEDDY */}

            <div
              className={`teddy ${teddyBounce ? 'teddy-bounce' : ''}`}
              role="button"
              tabIndex={0}
              aria-label="Tap teddy for a secret message"
              onClick={handleTeddyClick}
              onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                  e.preventDefault()
                  handleTeddyClick()
                }
              }}
            >
              🧸
            </div>

            <p className="teddy-hint">
              Tap your teddy for a little surprise! 💗
            </p>

            {secret && (
              <div className="secret-message">
                {secret}
              </div>
            )}

          </section>

          {/* MEMORIES */}

          <section className="section" id="memories">

            <p className="eyebrow">
              CHAPTERS OF US
            </p>

            <h2 className="section-title">
              Our Little Story 📖
            </h2>

            <p className="section-description">
              Every memory has a little piece of my heart.
              Tap any chapter to open it.
            </p>

            <div className="memory-story-grid">

              {memories.map((memory, index) => (

                <button
                  className="memory-card"
                  key={memory.title}
                  onClick={() => setSelectedMemory(memory)}
                >

                  <span className="memory-number">
                    CHAPTER {index + 1}
                  </span>

                  <span className="memory-icon">
                    {memory.icon}
                  </span>

                  <h3>
                    {memory.title}
                  </h3>

                  <p>
                    {memory.subtitle}
                  </p>

                  <span className="memory-link">
                    Open memory →
                  </span>

                </button>

              ))}

            </div>

          </section>

          {/* PHOTO GALLERY */}

          <section
            className="section gallery-section"
            id="gallery"
          >

            <p className="eyebrow">
              LITTLE MOMENTS, FOREVER
            </p>

            <h2 className="section-title">
              Our Photo Gallery 📸
            </h2>

            <p className="section-description">
              These spaces are waiting for our favourite pictures.
            </p>

            <div className="photo-grid">

              {[
                'Our favourite picture',
                'A silly moment',
                'Jaipur memories',
                'Kasauli memories'
              ].map((name, index) => (

                <div
                  className="photo-placeholder"
                  key={name}
                >

                  <span>
                    {['📷', '🥰', '🏰', '⛰️'][index]}
                  </span>

                  <h3>{name}</h3>

                  <p>
                    Add our photo here later
                  </p>

                </div>

              ))}

            </div>

          </section>

          {/* LOVE LETTERS */}

          <section
            className="section letters-section"
            id="letters"
          >

            <p className="eyebrow">
              WORDS FROM MY HEART
            </p>

            <h2 className="section-title">
              A Few Little Surprises 💌
            </h2>

            <div className="letter-grid">

              <div className="letter-card">

                <span>💌</span>

                <h3>A Letter For You</h3>

                <p>
                  Something I want you to know...
                </p>

                <button
                  className="small-button"
                  onClick={() => setLetterOpen(!letterOpen)}
                >
                  {letterOpen ? 'Close Letter' : 'Open Letter'}
                </button>

                {letterOpen && (
                  <div className="letter-text">

                    Dear Avuuu,

                    <br /><br />

                    I don't know how to explain everything you mean
                    to me. You make my life happier in so many little
                    ways. Thank you for being part of my story.
                    I hope we keep making beautiful memories together.

                    <br /><br />

                    Always yours,
                    <br />

                    Hitesh ❤️

                  </div>
                )}

              </div>

              <div className="letter-card">

                <span>🎁</span>

                <h3>A Little Gift</h3>

                <p>
                  There is a surprise waiting for you.
                </p>

                <button
                  className="small-button"
                  onClick={() => setGiftOpen(!giftOpen)}
                >
                  {giftOpen ? 'Close Gift' : 'Open Gift'}
                </button>

                {giftOpen && (
                  <div className="gift-surprise">

                    💐 🌷 💗 🌸 🧸

                    <br />

                    Your gift is unlimited love, hugs and kisses!

                  </div>
                )}

              </div>

              <div className="letter-card">

                <span>🌙</span>

                <h3>Open When You Miss Me</h3>

                <p>
                  A little message for those moments.
                </p>

                <button
                  className="small-button"
                  onClick={() => setMissOpen(!missOpen)}
                >
                  {missOpen ? 'Lock Letter' : 'Unlock Letter 🔒'}
                </button>

                {missOpen && (
                  <div className="letter-text">

                    Close your eyes for a second.
                    Imagine me giving you the biggest hug.
                    Distance or busy days cannot change how special
                    you are to me. I am always cheering for you.
                    I love you, Avuuu. ❤️

                  </div>
                )}

              </div>

            </div>

          </section>

          {/* GAMES */}

          <section
            className="section games-section"
            id="games"
          >

            <p className="eyebrow">
              TIME TO PLAY
            </p>

            <h2 className="section-title">
              Our Little Love Arcade 🎮
            </h2>

            {/* LOVE QUIZ */}

            <div className="game-card">

              <h3>💕 Love Quiz</h3>

              {!quizDone ? (

                <>

                  <p>
                    Question {question + 1} of {questions.length}
                  </p>

                  <h2>
                    {questions[question].question}
                  </h2>

                  <div className="quiz-options">

                    {questions[question].options.map(
                      (option, index) => (

                        <button
                          key={option}
                          onClick={() => chooseAnswer(index)}
                        >
                          {option}
                        </button>

                      )
                    )}

                  </div>

                </>

              ) : (

                <>

                  <h2>
                    You scored {score}/{questions.length}! 💗
                  </h2>

                  <p>
                    But the real winner is our love!
                  </p>

                  <button
                    className="small-button"
                    onClick={resetQuiz}
                  >
                    Play Again
                  </button>

                </>

              )}

            </div>

            {/* CATCH HEARTS */}

            <div className="game-card">

              <h3>💗 Catch My Hearts</h3>

              <p>
                Click the heart to collect it!
              </p>

              <button
                className="catch-heart"
                onClick={() => setHearts((previous) => previous + 1)}
              >
                💗
              </button>

              <h2>
                Hearts collected: {hearts}
              </h2>

              <p>
                Collect as many as you want, Avuuu!
              </p>

            </div>

            {/* MEMORY MATCH */}

            <div className="game-card">

              <h3>🧠 Memory Match</h3>

              <p>
                Find all matching pairs!
              </p>

              <div className="match-grid">

                {cards.map((card, index) => (

                  <button
                    key={index}
                    className="match-card"
                    onClick={() => chooseCard(index)}
                    disabled={matched.includes(index)}
                  >

                    {matched.includes(index) || match.includes(index)
                      ? card
                      : '❔'}

                  </button>

                ))}

              </div>

              <p>
                {matched.length === 8
                  ? 'You found all the pairs! 🎉'
                  : `${matched.length / 2} of 4 pairs found`}
              </p>

              <button
                className="small-button"
                onClick={() => {
                  setMatch([])
                  setMatched([])
                }}
              >
                Restart Game
              </button>

            </div>

          </section>

          {/* MUSIC */}

          <section
            className="section music-section"
            id="music"
          >

            <p className="eyebrow">
              A LITTLE MUSIC FOR US
            </p>

            <h2 className="section-title">
              Our Love Corner 🎵
            </h2>

            <p>
              Some moments feel even more special with music.
            </p>

            <button
              className="main-button"
              onClick={() => setMusic(!music)}
            >
              {music ? 'Hide Music Player' : 'Open Music Player 🎶'}
            </button>

            {music && (

              <div className="music-player">

                <iframe
                  src="https://www.youtube.com/embed/cUmUOb7j3dc"
                  title="Music for Avuuu"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                />

              </div>

            )}

          </section>

          {/* FINAL SURPRISE */}

          <section className="final-section">

            <div>
              💗 ✨ 💕
            </div>

            <h2>
              One Last Thing, Avuuu...
            </h2>

            <p>
              There is something I want you to know.
            </p>

            <button
              className="main-button"
              onClick={() => setFinalOpen(true)}
            >
              Open Your Final Surprise ❤️
            </button>

          </section>

          {/* FOOTER */}

          <footer>

            Made with endless love by Hitesh for Avuuu 💗

            <p>
              You are my favourite notification. 🥹
            </p>

          </footer>

          {/* MEMORY POPUP */}

          {selectedMemory && (

            <div
              className="modal-backdrop"
              onClick={() => setSelectedMemory(null)}
            >

              <div
                className="memory-modal"
                onClick={(e) => e.stopPropagation()}
              >

                <button
                  className="close-button"
                  onClick={() => setSelectedMemory(null)}
                >
                  ×
                </button>

                <div className={`memory-scene ${selectedMemory.scene}`}>

                  {selectedMemory.scene === 'jaipur'
                    ? '🏰 🌸 🕌'
                    : selectedMemory.scene === 'kasauli'
                      ? '🌲 ⛰️ ☁️'
                      : selectedMemory.scene === 'brocode'
                        ? '🍾 😂'
                        : selectedMemory.scene === 'care'
                          ? '🧸 ❤️ 🥹'
                          : selectedMemory.icon}

                </div>

                <h2>
                  {selectedMemory.title}
                </h2>

                <h3>
                  {selectedMemory.subtitle}
                </h3>

                <p>
                  {selectedMemory.text}
                </p>

                <button
                  className="small-button"
                  onClick={() => setSelectedMemory(null)}
                >
                  Keep this memory ❤️
                </button>

              </div>

            </div>

          )}

          {/* FINAL MESSAGE */}

          {finalOpen && (

            <div
              className="modal-backdrop"
              onClick={() => setFinalOpen(false)}
            >

              <div
                className="final-modal"
                onClick={(e) => e.stopPropagation()}
              >

                <button
                  className="close-button"
                  onClick={() => setFinalOpen(false)}
                >
                  ×
                </button>

                <div className="final-big-heart">
                  ❤️
                </div>

                <h1>
                  Dear Avuuu,
                </h1>

                <p>

                  I don't need a perfect story.
                  I just want a story where you are there.

                  <br /><br />

                  Thank you for every smile, every memory,
                  every little moment and every hug.

                  <br /><br />

                  No matter how many chapters life gives us,
                  I hope we keep writing them together.

                  <br /><br />

                  I LOVE YOU! 💗

                </p>

                <h2>
                  Forever yours, Hitesh 🥹
                </h2>

              </div>

            </div>

          )}

        </>
      )}

    </main>
  )
}

export default App