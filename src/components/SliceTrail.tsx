import { useRef, useMemo } from 'react'
import { useFrame } from '@react-three/fiber'
import * as THREE from 'three'
import { Line } from '@react-three/drei'

interface SliceTrailProps {
  points: THREE.Vector3[]
}

export default function SliceTrail({ points }: SliceTrailProps) {
  const opacityRef = useRef(1)

  const linePoints = useMemo(() => {
    if (points.length < 2) return null
    return points.map(p => [p.x, p.y, p.z + 0.1] as [number, number, number])
  }, [points])

  useFrame(() => {
    opacityRef.current = points.length > 0 ? 0.9 : 0
  })

  if (!linePoints || linePoints.length < 2) return null

  return (
    <>
      {/* Main trail */}
      <Line
        points={linePoints}
        color="#f7c948"
        lineWidth={3}
        transparent
        opacity={0.9}
      />

      {/* Glow trail */}
      <Line
        points={linePoints}
        color="#ff6b35"
        lineWidth={6}
        transparent
        opacity={0.4}
      />

      {/* Trail head glow */}
      {points.length > 0 && (
        <mesh position={points[points.length - 1]}>
          <sphereGeometry args={[0.15, 16, 16]} />
          <meshBasicMaterial color="#f7c948" transparent opacity={0.8} />
        </mesh>
      )}

      {/* Particle sparks at trail head */}
      {points.length > 2 && (
        <pointLight
          position={[
            points[points.length - 1].x,
            points[points.length - 1].y,
            points[points.length - 1].z + 0.5,
          ]}
          color="#f7c948"
          intensity={2}
          distance={3}
        />
      )}
    </>
  )
}
