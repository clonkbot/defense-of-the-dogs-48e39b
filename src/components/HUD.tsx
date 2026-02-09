interface HUDProps {
  score: number
  combo: number
  lives: number
}

export default function HUD({ score, combo, lives }: HUDProps) {
  return (
    <div className="absolute inset-0 pointer-events-none z-30">
      {/* Score display - top left */}
      <div className="absolute top-4 md:top-6 left-4 md:left-8">
        <div
          className="px-4 md:px-6 py-2 md:py-3 rounded-lg"
          style={{
            background: 'linear-gradient(135deg, rgba(20, 20, 30, 0.9) 0%, rgba(40, 40, 60, 0.8) 100%)',
            border: '2px solid rgba(247, 201, 72, 0.5)',
            boxShadow: '0 0 20px rgba(247, 201, 72, 0.3), inset 0 0 20px rgba(0, 0, 0, 0.5)',
          }}
        >
          <div
            className="text-[10px] md:text-xs tracking-widest mb-1"
            style={{
              fontFamily: "'Press Start 2P', monospace",
              color: '#ff6b35',
              textShadow: '0 0 10px rgba(255, 107, 53, 0.8)',
            }}
          >
            SCORE
          </div>
          <div
            className="text-xl md:text-3xl tracking-wider"
            style={{
              fontFamily: "'Press Start 2P', monospace",
              color: '#f7c948',
              textShadow: '0 0 15px rgba(247, 201, 72, 0.9), 0 0 30px rgba(247, 201, 72, 0.5)',
            }}
          >
            {score.toString().padStart(6, '0')}
          </div>
        </div>
      </div>

      {/* Combo display - top right */}
      {combo > 1 && (
        <div
          className="absolute top-4 md:top-6 right-4 md:right-8"
          style={{
            animation: 'pulse 0.3s ease-in-out',
          }}
        >
          <div
            className="px-4 md:px-6 py-2 md:py-3 rounded-lg"
            style={{
              background: 'linear-gradient(135deg, rgba(230, 57, 70, 0.9) 0%, rgba(196, 69, 54, 0.8) 100%)',
              border: '2px solid rgba(255, 107, 53, 0.8)',
              boxShadow: '0 0 30px rgba(230, 57, 70, 0.5), inset 0 0 20px rgba(0, 0, 0, 0.3)',
              transform: `scale(${1 + Math.min(combo * 0.02, 0.3)})`,
              transition: 'transform 0.1s ease-out',
            }}
          >
            <div
              className="text-[10px] md:text-xs tracking-widest mb-1 text-center"
              style={{
                fontFamily: "'Press Start 2P', monospace",
                color: '#f7c948',
                textShadow: '0 0 10px rgba(247, 201, 72, 0.8)',
              }}
            >
              COMBO
            </div>
            <div
              className="text-2xl md:text-4xl text-center"
              style={{
                fontFamily: "'Press Start 2P', monospace",
                color: '#ffffff',
                textShadow: '0 0 15px rgba(255, 255, 255, 0.9), 0 0 30px rgba(255, 107, 53, 0.8)',
              }}
            >
              x{combo}
            </div>
          </div>
        </div>
      )}

      {/* Lives display - bottom left */}
      <div className="absolute bottom-12 md:bottom-16 left-4 md:left-8">
        <div className="flex gap-2 md:gap-3">
          {[...Array(3)].map((_, i) => (
            <div
              key={i}
              className="relative"
              style={{
                filter: i < lives ? 'none' : 'grayscale(1) opacity(0.3)',
                transform: i < lives ? 'scale(1)' : 'scale(0.8)',
                transition: 'all 0.3s ease-out',
              }}
            >
              {/* Hot dog icon */}
              <svg
                width="32"
                height="32"
                viewBox="0 0 32 32"
                className="w-8 h-8 md:w-10 md:h-10"
              >
                {/* Bun */}
                <ellipse
                  cx="16"
                  cy="16"
                  rx="12"
                  ry="6"
                  fill="#d4a574"
                  stroke="#a67c52"
                  strokeWidth="1"
                />
                {/* Sausage */}
                <ellipse
                  cx="16"
                  cy="14"
                  rx="10"
                  ry="3"
                  fill="#c44536"
                />
                {/* Mustard */}
                <path
                  d="M8 12 Q12 14 16 12 Q20 14 24 12"
                  fill="none"
                  stroke="#f7c948"
                  strokeWidth="2"
                  strokeLinecap="round"
                />
              </svg>
              {i < lives && (
                <div
                  className="absolute inset-0 rounded-full"
                  style={{
                    boxShadow: '0 0 15px rgba(247, 201, 72, 0.6)',
                    animation: 'glow 2s ease-in-out infinite',
                    animationDelay: `${i * 0.2}s`,
                  }}
                />
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Instructions - center bottom (mobile friendly) */}
      <div className="absolute bottom-20 md:bottom-24 left-1/2 transform -translate-x-1/2">
        <div
          className="text-[8px] md:text-[10px] tracking-wider text-center opacity-60"
          style={{
            fontFamily: "'Press Start 2P', monospace",
            color: '#f7c948',
            textShadow: '0 0 10px rgba(247, 201, 72, 0.5)',
          }}
        >
          SWIPE TO SLICE!
        </div>
      </div>

      <style>{`
        @keyframes pulse {
          0%, 100% { transform: scale(1); }
          50% { transform: scale(1.1); }
        }
        @keyframes glow {
          0%, 100% { opacity: 0.6; }
          50% { opacity: 1; }
        }
      `}</style>
    </div>
  )
}
