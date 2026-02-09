import { useRef, useEffect } from 'react'
import { useFrame } from '@react-three/fiber'
import { Text } from '@react-three/drei'
import * as THREE from 'three'

interface ScorePopupProps {
  position: [number, number, number]
  score: number
  onComplete: () => void
}

export default function ScorePopup({ position, score, onComplete }: ScorePopupProps) {
  const ref = useRef<THREE.Group>(null!)
  const life = useRef(0)
  const maxLife = 1.2

  useEffect(() => {
    life.current = 0
  }, [])

  useFrame((_, delta) => {
    if (!ref.current) return

    life.current += delta

    // Float up
    ref.current.position.y += delta * 2

    // Scale animation
    const progress = life.current / maxLife
    const scale = progress < 0.1 ? progress * 10 : 1 - (progress - 0.1) * 0.5
    ref.current.scale.setScalar(Math.max(0.01, scale))

    // Fade out
    const children = ref.current.children
    for (const child of children) {
      if ((child as THREE.Mesh).material) {
        const mat = (child as THREE.Mesh).material as THREE.MeshBasicMaterial
        if (mat.opacity !== undefined) {
          mat.opacity = 1 - progress
        }
      }
    }

    if (life.current >= maxLife) {
      onComplete()
    }
  })

  const color = score >= 50 ? '#f7c948' : score >= 30 ? '#ff6b35' : '#ffffff'

  return (
    <group ref={ref} position={position}>
      <Text
        fontSize={0.6}
        color={color}
        anchorX="center"
        anchorY="middle"
        outlineWidth={0.05}
        outlineColor="#000000"
        font="https://fonts.gstatic.com/s/pressstart2p/v15/e3t4euO8T-267oIAQAu6jDQyK0nSgPJE4580.woff2"
      >
        +{score}
      </Text>
    </group>
  )
}
