interface StartScreenProps {
  onStart: () => void
  highScore: number
}

export default function StartScreen({ onStart, highScore }: StartScreenProps) {
  return (
    <div className="absolute inset-0 z-40 flex items-center justify-center">
      {/* Backdrop with animated gradient */}
      <div
        className="absolute inset-0"
        style={{
          background: 'radial-gradient(ellipse at center, rgba(10, 10, 20, 0.85) 0%, rgba(5, 5, 10, 0.95) 100%)',
        }}
      />

      {/* Content */}
      <div className="relative z-10 text-center px-4 max-w-lg">
        {/* Decorative top element */}
        <div className="flex justify-center mb-4 md:mb-6">
          <div
            className="w-24 md:w-32 h-1"
            style={{
              background: 'linear-gradient(90deg, transparent, #f7c948, transparent)',
              boxShadow: '0 0 20px rgba(247, 201, 72, 0.5)',
            }}
          />
        </div>

        {/* Title */}
        <h1
          className="text-3xl md:text-5xl lg:text-6xl mb-2 md:mb-4 leading-tight"
          style={{
            fontFamily: "'Bowlby One SC', sans-serif",
            color: '#f7c948',
            textShadow: `
              0 0 20px rgba(247, 201, 72, 0.8),
              0 0 40px rgba(247, 201, 72, 0.5),
              0 0 60px rgba(255, 107, 53, 0.3),
              4px 4px 0 #c44536,
              6px 6px 0 rgba(0, 0, 0, 0.5)
            `,
            letterSpacing: '0.05em',
          }}
        >
          DEFENSE
        </h1>
        <h2
          className="text-xl md:text-3xl lg:text-4xl mb-4 md:mb-8"
          style={{
            fontFamily: "'Press Start 2P', monospace",
            color: '#ff6b35',
            textShadow: '0 0 15px rgba(255, 107, 53, 0.8), 0 0 30px rgba(255, 107, 53, 0.4)',
          }}
        >
          of the DOGS
        </h2>

        {/* Hot dog illustration */}
        <div className="flex justify-center mb-6 md:mb-8">
          <div
            className="relative"
            style={{
              animation: 'float 3s ease-in-out infinite',
            }}
          >
            <svg
              width="160"
              height="80"
              viewBox="0 0 160 80"
              className="w-32 md:w-40 lg:w-48"
            >
              {/* Bun shadow */}
              <ellipse
                cx="80"
                cy="50"
                rx="60"
                ry="18"
                fill="rgba(0,0,0,0.3)"
              />
              {/* Bun */}
              <ellipse
                cx="80"
                cy="45"
                rx="60"
                ry="18"
                fill="#d4a574"
                stroke="#a67c52"
                strokeWidth="2"
              />
              {/* Bun highlight */}
              <ellipse
                cx="80"
                cy="40"
                rx="50"
                ry="10"
                fill="#e8c49a"
                opacity="0.5"
              />
              {/* Sausage */}
              <ellipse
                cx="80"
                cy="38"
                rx="55"
                ry="12"
                fill="#c44536"
              />
              {/* Sausage highlight */}
              <ellipse
                cx="80"
                cy="34"
                rx="45"
                ry="6"
                fill="#d45646"
                opacity="0.6"
              />
              {/* Mustard zigzag */}
              <path
                d="M25 32 Q40 26 55 32 Q70 26 85 32 Q100 26 115 32 Q130 26 145 32"
                fill="none"
                stroke="#f7c948"
                strokeWidth="5"
                strokeLinecap="round"
                style={{
                  filter: 'drop-shadow(0 0 5px rgba(247, 201, 72, 0.8))',
                }}
              />
              {/* Ketchup zigzag */}
              <path
                d="M30 38 Q45 44 60 38 Q75 44 90 38 Q105 44 120 38 Q135 44 140 38"
                fill="none"
                stroke="#e63946"
                strokeWidth="4"
                strokeLinecap="round"
                style={{
                  filter: 'drop-shadow(0 0 5px rgba(230, 57, 70, 0.6))',
                }}
              />
            </svg>

            {/* Glow effect */}
            <div
              className="absolute inset-0"
              style={{
                background: 'radial-gradient(ellipse at center, rgba(247, 201, 72, 0.3) 0%, transparent 70%)',
                animation: 'pulse 2s ease-in-out infinite',
              }}
            />
          </div>
        </div>

        {/* High score */}
        {highScore > 0 && (
          <div className="mb-6 md:mb-8">
            <div
              className="text-[10px] md:text-xs tracking-widest mb-1"
              style={{
                fontFamily: "'Press Start 2P', monospace",
                color: '#ff6b35',
                textShadow: '0 0 10px rgba(255, 107, 53, 0.6)',
              }}
            >
              HIGH SCORE
            </div>
            <div
              className="text-xl md:text-2xl"
              style={{
                fontFamily: "'Press Start 2P', monospace",
                color: '#f7c948',
                textShadow: '0 0 15px rgba(247, 201, 72, 0.8)',
              }}
            >
              {highScore.toString().padStart(6, '0')}
            </div>
          </div>
        )}

        {/* Start button */}
        <button
          onClick={onStart}
          className="relative px-8 md:px-12 py-4 md:py-5 rounded-lg transition-all duration-200 hover:scale-105 active:scale-95"
          style={{
            fontFamily: "'Press Start 2P', monospace",
            fontSize: 'clamp(12px, 3vw, 16px)',
            color: '#0a0a0f',
            background: 'linear-gradient(180deg, #f7c948 0%, #e5b63a 50%, #d4a52c 100%)',
            boxShadow: `
              0 4px 0 #a67c1a,
              0 6px 20px rgba(247, 201, 72, 0.5),
              inset 0 2px 0 rgba(255, 255, 255, 0.3)
            `,
            border: 'none',
            cursor: 'pointer',
            letterSpacing: '0.1em',
          }}
        >
          <span className="relative z-10">TAP TO START</span>
          <div
            className="absolute inset-0 rounded-lg"
            style={{
              background: 'linear-gradient(180deg, rgba(255,255,255,0.2) 0%, transparent 50%)',
            }}
          />
        </button>

        {/* Instructions */}
        <div className="mt-8 md:mt-10 space-y-2">
          <p
            className="text-[8px] md:text-[10px] tracking-wider opacity-70"
            style={{
              fontFamily: "'Press Start 2P', monospace",
              color: '#f7c948',
            }}
          >
            SWIPE TO SLICE THE HOT DOGS
          </p>
          <p
            className="text-[8px] md:text-[10px] tracking-wider opacity-50"
            style={{
              fontFamily: "'Press Start 2P', monospace",
              color: '#ff6b35',
            }}
          >
            DON'T LET THEM ESCAPE!
          </p>
        </div>

        {/* Decorative bottom element */}
        <div className="flex justify-center mt-6 md:mt-8">
          <div
            className="w-16 md:w-24 h-1"
            style={{
              background: 'linear-gradient(90deg, transparent, #ff6b35, transparent)',
              boxShadow: '0 0 15px rgba(255, 107, 53, 0.5)',
            }}
          />
        </div>
      </div>

      <style>{`
        @keyframes float {
          0%, 100% { transform: translateY(0) rotate(-2deg); }
          50% { transform: translateY(-10px) rotate(2deg); }
        }
        @keyframes pulse {
          0%, 100% { opacity: 0.3; }
          50% { opacity: 0.6; }
        }
      `}</style>
    </div>
  )
}
