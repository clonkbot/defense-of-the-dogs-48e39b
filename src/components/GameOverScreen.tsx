interface GameOverScreenProps {
  score: number
  highScore: number
  onRestart: () => void
}

export default function GameOverScreen({ score, highScore, onRestart }: GameOverScreenProps) {
  const isNewHighScore = score >= highScore && score > 0

  return (
    <div className="absolute inset-0 z-40 flex items-center justify-center">
      {/* Backdrop */}
      <div
        className="absolute inset-0"
        style={{
          background: 'radial-gradient(ellipse at center, rgba(196, 69, 54, 0.3) 0%, rgba(10, 10, 20, 0.95) 100%)',
          animation: 'fadeIn 0.5s ease-out',
        }}
      />

      {/* Content */}
      <div
        className="relative z-10 text-center px-4 max-w-md"
        style={{
          animation: 'slideUp 0.6s ease-out',
        }}
      >
        {/* Game Over text */}
        <h1
          className="text-4xl md:text-6xl mb-4 md:mb-6"
          style={{
            fontFamily: "'Bowlby One SC', sans-serif",
            color: '#e63946',
            textShadow: `
              0 0 20px rgba(230, 57, 70, 0.8),
              0 0 40px rgba(230, 57, 70, 0.5),
              4px 4px 0 #8b1a1a,
              6px 6px 0 rgba(0, 0, 0, 0.5)
            `,
            letterSpacing: '0.05em',
          }}
        >
          GAME OVER
        </h1>

        {/* Sad hot dog */}
        <div className="flex justify-center mb-6 md:mb-8">
          <svg
            width="100"
            height="60"
            viewBox="0 0 100 60"
            className="w-24 md:w-28"
            style={{ opacity: 0.8 }}
          >
            {/* Bun */}
            <ellipse
              cx="50"
              cy="35"
              rx="40"
              ry="14"
              fill="#d4a574"
              stroke="#a67c52"
              strokeWidth="2"
            />
            {/* Sausage */}
            <ellipse
              cx="50"
              cy="30"
              rx="35"
              ry="10"
              fill="#c44536"
            />
            {/* Sad face */}
            <ellipse cx="35" cy="28" rx="3" ry="4" fill="#8b1a1a" />
            <ellipse cx="65" cy="28" rx="3" ry="4" fill="#8b1a1a" />
            <path
              d="M40 38 Q50 32 60 38"
              fill="none"
              stroke="#8b1a1a"
              strokeWidth="3"
              strokeLinecap="round"
            />
            {/* X eyes */}
            <path d="M32 24 L38 32 M38 24 L32 32" stroke="#8b1a1a" strokeWidth="2" />
            <path d="M62 24 L68 32 M68 24 L62 32" stroke="#8b1a1a" strokeWidth="2" />
          </svg>
        </div>

        {/* New high score badge */}
        {isNewHighScore && (
          <div
            className="mb-4 md:mb-6 inline-block px-4 md:px-6 py-2 rounded-full"
            style={{
              background: 'linear-gradient(135deg, #f7c948 0%, #ff6b35 100%)',
              boxShadow: '0 0 30px rgba(247, 201, 72, 0.6)',
              animation: 'bounce 0.6s ease-out',
            }}
          >
            <span
              className="text-xs md:text-sm tracking-widest"
              style={{
                fontFamily: "'Press Start 2P', monospace",
                color: '#0a0a0f',
              }}
            >
              NEW HIGH SCORE!
            </span>
          </div>
        )}

        {/* Score display */}
        <div className="mb-6 md:mb-8">
          <div
            className="text-[10px] md:text-xs tracking-widest mb-2 opacity-70"
            style={{
              fontFamily: "'Press Start 2P', monospace",
              color: '#ff6b35',
            }}
          >
            FINAL SCORE
          </div>
          <div
            className="text-3xl md:text-5xl mb-4"
            style={{
              fontFamily: "'Press Start 2P', monospace",
              color: '#f7c948',
              textShadow: '0 0 20px rgba(247, 201, 72, 0.8)',
            }}
          >
            {score.toString().padStart(6, '0')}
          </div>

          {!isNewHighScore && highScore > 0 && (
            <div className="opacity-60">
              <div
                className="text-[8px] md:text-[10px] tracking-widest mb-1"
                style={{
                  fontFamily: "'Press Start 2P', monospace",
                  color: '#ff6b35',
                }}
              >
                HIGH SCORE
              </div>
              <div
                className="text-lg md:text-xl"
                style={{
                  fontFamily: "'Press Start 2P', monospace",
                  color: '#f7c948',
                }}
              >
                {highScore.toString().padStart(6, '0')}
              </div>
            </div>
          )}
        </div>

        {/* Restart button */}
        <button
          onClick={onRestart}
          className="relative px-8 md:px-12 py-4 md:py-5 rounded-lg transition-all duration-200 hover:scale-105 active:scale-95"
          style={{
            fontFamily: "'Press Start 2P', monospace",
            fontSize: 'clamp(10px, 2.5vw, 14px)',
            color: '#0a0a0f',
            background: 'linear-gradient(180deg, #e63946 0%, #c44536 50%, #a83832 100%)',
            boxShadow: `
              0 4px 0 #6b1a1a,
              0 6px 20px rgba(230, 57, 70, 0.5),
              inset 0 2px 0 rgba(255, 255, 255, 0.2)
            `,
            border: 'none',
            cursor: 'pointer',
            letterSpacing: '0.1em',
          }}
        >
          <span className="relative z-10">TRY AGAIN</span>
        </button>

        {/* Stats hint */}
        <p
          className="mt-6 md:mt-8 text-[8px] md:text-[10px] tracking-wider opacity-40"
          style={{
            fontFamily: "'Press Start 2P', monospace",
            color: '#f7c948',
          }}
        >
          PROTECT THOSE DOGS!
        </p>
      </div>

      <style>{`
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        @keyframes slideUp {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        @keyframes bounce {
          0%, 100% { transform: scale(1); }
          50% { transform: scale(1.1); }
        }
      `}</style>
    </div>
  )
}
