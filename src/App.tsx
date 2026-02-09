import { Canvas } from '@react-three/fiber'
import { Suspense, useState, useCallback } from 'react'
import { Environment, Stars } from '@react-three/drei'
import Game from './components/Game'
import HUD from './components/HUD'
import StartScreen from './components/StartScreen'
import GameOverScreen from './components/GameOverScreen'

export type GameState = 'start' | 'playing' | 'gameover'

function App() {
  const [gameState, setGameState] = useState<GameState>('start')
  const [score, setScore] = useState(0)
  const [combo, setCombo] = useState(0)
  const [lives, setLives] = useState(3)
  const [highScore, setHighScore] = useState(() => {
    const saved = localStorage.getItem('dotd-highscore')
    return saved ? parseInt(saved, 10) : 0
  })

  const startGame = useCallback(() => {
    setScore(0)
    setCombo(0)
    setLives(3)
    setGameState('playing')
  }, [])

  const onSlice = useCallback((points: number) => {
    setScore(prev => prev + points)
    setCombo(prev => prev + 1)
  }, [])

  const onMiss = useCallback(() => {
    setCombo(0)
    setLives(prev => {
      const newLives = prev - 1
      if (newLives <= 0) {
        setGameState('gameover')
        setScore(currentScore => {
          if (currentScore > highScore) {
            setHighScore(currentScore)
            localStorage.setItem('dotd-highscore', currentScore.toString())
          }
          return currentScore
        })
      }
      return newLives
    })
  }, [highScore])

  const resetCombo = useCallback(() => {
    setCombo(0)
  }, [])

  return (
    <div className="w-screen h-screen bg-slate-950 overflow-hidden relative">
      {/* Animated background gradient */}
      <div
        className="absolute inset-0 opacity-30"
        style={{
          background: 'radial-gradient(ellipse at 50% 0%, #ff6b35 0%, transparent 50%), radial-gradient(ellipse at 80% 80%, #f7c948 0%, transparent 40%), radial-gradient(ellipse at 20% 70%, #e63946 0%, transparent 40%)',
        }}
      />

      {/* Scanline effect */}
      <div
        className="absolute inset-0 pointer-events-none z-50 opacity-[0.03]"
        style={{
          backgroundImage: 'repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(0,0,0,0.3) 2px, rgba(0,0,0,0.3) 4px)',
        }}
      />

      <Canvas
        camera={{ position: [0, 0, 10], fov: 60 }}
        style={{ touchAction: 'none' }}
      >
        <color attach="background" args={['#0a0a0f']} />
        <fog attach="fog" args={['#0a0a0f', 15, 30]} />

        <ambientLight intensity={0.3} />
        <directionalLight position={[5, 5, 5]} intensity={0.8} color="#fff5e6" />
        <pointLight position={[-5, 3, 0]} intensity={0.5} color="#ff6b35" />
        <pointLight position={[5, -3, 0]} intensity={0.5} color="#f7c948" />

        <Suspense fallback={null}>
          <Stars radius={50} depth={50} count={1000} factor={4} saturation={0} fade speed={1} />
          <Environment preset="night" />

          {gameState === 'playing' && (
            <Game
              onSlice={onSlice}
              onMiss={onMiss}
              combo={combo}
              resetCombo={resetCombo}
            />
          )}
        </Suspense>
      </Canvas>

      {/* UI Overlays */}
      {gameState === 'start' && (
        <StartScreen onStart={startGame} highScore={highScore} />
      )}

      {gameState === 'playing' && (
        <HUD score={score} combo={combo} lives={lives} />
      )}

      {gameState === 'gameover' && (
        <GameOverScreen
          score={score}
          highScore={highScore}
          onRestart={startGame}
        />
      )}

      {/* Footer */}
      <footer className="absolute bottom-2 md:bottom-3 left-0 right-0 text-center z-40">
        <p
          className="text-[10px] md:text-xs tracking-wider opacity-40"
          style={{
            fontFamily: "'Press Start 2P', monospace",
            color: '#f7c948',
            textShadow: '0 0 10px rgba(247, 201, 72, 0.3)'
          }}
        >
          Requested by @CryptoCosm91341 · Built by @clonkbot
        </p>
      </footer>
    </div>
  )
}

export default App
