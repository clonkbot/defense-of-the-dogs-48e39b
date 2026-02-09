import { useRef, useState, useCallback, useEffect } from 'react'
import { useFrame, useThree } from '@react-three/fiber'
import * as THREE from 'three'
import HotDog from './HotDog'
import SliceTrail from './SliceTrail'
import ScorePopup from './ScorePopup'

interface HotDogData {
  id: number
  position: [number, number, number]
  velocity: [number, number, number]
  rotation: number
  isSliced: boolean
  sliceDirection?: [number, number]
}

interface ScorePopupData {
  id: number
  position: [number, number, number]
  score: number
}

interface GameProps {
  onSlice: (points: number) => void
  onMiss: () => void
  combo: number
  resetCombo: () => void
}

export default function Game({ onSlice, onMiss, combo, resetCombo }: GameProps) {
  const [hotDogs, setHotDogs] = useState<HotDogData[]>([])
  const [scorePopups, setScorePopups] = useState<ScorePopupData[]>([])
  const [trailPoints, setTrailPoints] = useState<THREE.Vector3[]>([])
  const nextId = useRef(0)
  const spawnTimer = useRef(0)
  const lastPointerPos = useRef<THREE.Vector3 | null>(null)
  const { viewport, camera } = useThree()
  const difficulty = useRef(1)
  const gameTime = useRef(0)

  // Spawn hot dogs
  useFrame((_, delta) => {
    gameTime.current += delta
    difficulty.current = 1 + Math.floor(gameTime.current / 15) * 0.3

    spawnTimer.current += delta
    const spawnRate = Math.max(0.6, 1.5 - difficulty.current * 0.15)

    if (spawnTimer.current >= spawnRate) {
      spawnTimer.current = 0

      const count = Math.random() < 0.3 ? 2 : 1

      for (let i = 0; i < count; i++) {
        const side = Math.random() > 0.5 ? 1 : -1
        const x = side * (viewport.width / 2 + 1) * (0.3 + Math.random() * 0.7)
        const vx = -side * (3 + Math.random() * 2 + difficulty.current)
        const vy = 12 + Math.random() * 5 + difficulty.current * 2

        const newDog: HotDogData = {
          id: nextId.current++,
          position: [x, -6, 0],
          velocity: [vx, vy, 0],
          rotation: Math.random() * Math.PI * 2,
          isSliced: false,
        }

        setHotDogs((prev) => [...prev, newDog])
      }
    }

    // Clean up old hot dogs
    setHotDogs((prev) =>
      prev.filter((dog) => {
        if (dog.isSliced) return true
        return true
      })
    )
  })

  // Clean up hot dogs that have fallen off screen
  useEffect(() => {
    const cleanup = setInterval(() => {
      setHotDogs((prev) => prev.filter((_, i) => i > prev.length - 20))
      setScorePopups((prev) => prev.filter((_, i) => i > prev.length - 10))
    }, 3000)
    return () => clearInterval(cleanup)
  }, [])

  const handleSlice = useCallback(
    (id: number, position: [number, number, number]) => {
      const sliceDir: [number, number] = lastPointerPos.current
        ? [lastPointerPos.current.x * 0.5, lastPointerPos.current.y * 0.5]
        : [Math.random() - 0.5, Math.random()]

      setHotDogs((prev) =>
        prev.map((dog) =>
          dog.id === id ? { ...dog, isSliced: true, sliceDirection: sliceDir } : dog
        )
      )

      const points = 10 + combo * 5
      onSlice(points)

      // Add score popup
      setScorePopups((prev) => [
        ...prev,
        {
          id: Date.now() + Math.random(),
          position,
          score: points,
        },
      ])
    },
    [combo, onSlice]
  )

  const handleMiss = useCallback(() => {
    resetCombo()
    onMiss()
  }, [onMiss, resetCombo])

  // Pointer tracking for slice trail
  const handlePointerMove = useCallback(
    (e: THREE.Event) => {
      const event = e as unknown as { point: THREE.Vector3 }
      const point = event.point.clone()

      if (lastPointerPos.current) {
        const velocity = point.clone().sub(lastPointerPos.current)

        // Check for collisions with hot dogs if moving fast enough
        if (velocity.length() > 0.1) {
          setHotDogs((prev) => {
            const updated = [...prev]
            for (const dog of updated) {
              if (dog.isSliced) continue

              const dogPos = new THREE.Vector3(...dog.position)
              const dist = point.distanceTo(dogPos)

              if (dist < 1.2) {
                // Slice this dog
                handleSlice(dog.id, dog.position)
              }
            }
            return updated
          })
        }
      }

      lastPointerPos.current = point

      setTrailPoints((prev) => {
        const newPoints = [...prev, point]
        if (newPoints.length > 15) {
          return newPoints.slice(-15)
        }
        return newPoints
      })
    },
    [handleSlice]
  )

  const handlePointerLeave = useCallback(() => {
    lastPointerPos.current = null
    setTrailPoints([])
  }, [])

  const removeScorePopup = useCallback((id: number) => {
    setScorePopups((prev) => prev.filter((p) => p.id !== id))
  }, [])

  return (
    <>
      {/* Invisible plane for pointer tracking */}
      <mesh
        position={[0, 0, 0]}
        onPointerMove={handlePointerMove}
        onPointerLeave={handlePointerLeave}
        visible={false}
      >
        <planeGeometry args={[100, 100]} />
        <meshBasicMaterial transparent opacity={0} />
      </mesh>

      {/* Hot dogs */}
      {hotDogs.map((dog) => (
        <HotDog
          key={dog.id}
          position={dog.position}
          velocity={dog.velocity}
          rotation={dog.rotation}
          isSliced={dog.isSliced}
          sliceDirection={dog.sliceDirection}
          onSlice={() => handleSlice(dog.id, dog.position)}
          onMiss={handleMiss}
        />
      ))}

      {/* Slice trail */}
      <SliceTrail points={trailPoints} />

      {/* Score popups */}
      {scorePopups.map((popup) => (
        <ScorePopup
          key={popup.id}
          position={popup.position}
          score={popup.score}
          onComplete={() => removeScorePopup(popup.id)}
        />
      ))}
    </>
  )
}
