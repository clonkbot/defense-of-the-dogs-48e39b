import { useRef, useMemo } from 'react'
import { useFrame } from '@react-three/fiber'
import * as THREE from 'three'

interface HotDogProps {
  position: [number, number, number]
  velocity: [number, number, number]
  rotation: number
  isSliced: boolean
  sliceDirection?: [number, number]
  onSlice: () => void
  onMiss: () => void
}

function HotDogHalf({
  position,
  velocity,
  rotation,
  side,
}: {
  position: THREE.Vector3
  velocity: THREE.Vector3
  rotation: number
  side: 'left' | 'right'
}) {
  const ref = useRef<THREE.Group>(null!)
  const rotSpeed = useRef((Math.random() - 0.5) * 10)

  useFrame((_, delta) => {
    if (!ref.current) return

    velocity.y -= 15 * delta
    position.x += velocity.x * delta
    position.y += velocity.y * delta
    position.z += velocity.z * delta

    ref.current.position.copy(position)
    ref.current.rotation.z += rotSpeed.current * delta
  })

  const offsetX = side === 'left' ? -0.15 : 0.15

  return (
    <group ref={ref} rotation={[0, 0, rotation]}>
      {/* Bun half */}
      <mesh position={[offsetX, 0, 0]}>
        <cylinderGeometry args={[0.35, 0.35, 0.8, 16, 1, false, side === 'left' ? Math.PI : 0, Math.PI]} />
        <meshStandardMaterial color="#d4a574" roughness={0.8} />
      </mesh>
      {/* Sausage half */}
      <mesh position={[offsetX, 0.05, 0]}>
        <cylinderGeometry args={[0.18, 0.18, 0.9, 16, 1, false, side === 'left' ? Math.PI : 0, Math.PI]} />
        <meshStandardMaterial color="#c44536" roughness={0.6} />
      </mesh>
      {/* Mustard drizzle */}
      <mesh position={[offsetX, 0.25, 0]} rotation={[0, 0, 0.2]}>
        <torusGeometry args={[0.12, 0.03, 8, 16, Math.PI * 0.8]} />
        <meshStandardMaterial color="#f7c948" emissive="#f7c948" emissiveIntensity={0.3} />
      </mesh>
      {/* Ketchup drizzle */}
      <mesh position={[offsetX, 0.2, 0.05]} rotation={[0.3, 0, -0.2]}>
        <torusGeometry args={[0.1, 0.025, 8, 16, Math.PI * 0.6]} />
        <meshStandardMaterial color="#e63946" emissive="#e63946" emissiveIntensity={0.2} />
      </mesh>
    </group>
  )
}

export default function HotDog({
  position,
  velocity,
  rotation,
  isSliced,
  sliceDirection,
  onSlice,
  onMiss,
}: HotDogProps) {
  const ref = useRef<THREE.Group>(null!)
  const posRef = useRef(new THREE.Vector3(...position))
  const velRef = useRef(new THREE.Vector3(...velocity))
  const hasExited = useRef(false)
  const rotSpeed = useRef((Math.random() - 0.5) * 5)

  // Sliced halves state
  const slicedState = useMemo(() => {
    if (!isSliced || !sliceDirection) return null

    const dirX = sliceDirection[0] * 3
    const dirY = sliceDirection[1] * 3

    return {
      leftPos: posRef.current.clone(),
      rightPos: posRef.current.clone(),
      leftVel: new THREE.Vector3(velRef.current.x - dirX - 2, velRef.current.y + Math.abs(dirY), velRef.current.z),
      rightVel: new THREE.Vector3(velRef.current.x + dirX + 2, velRef.current.y + Math.abs(dirY), velRef.current.z),
    }
  }, [isSliced, sliceDirection])

  useFrame((_, delta) => {
    if (isSliced || hasExited.current) return
    if (!ref.current) return

    // Apply gravity
    velRef.current.y -= 15 * delta

    // Update position
    posRef.current.x += velRef.current.x * delta
    posRef.current.y += velRef.current.y * delta
    posRef.current.z += velRef.current.z * delta

    ref.current.position.copy(posRef.current)
    ref.current.rotation.z += rotSpeed.current * delta

    // Check if exited screen without being sliced
    if (posRef.current.y < -8 && !hasExited.current) {
      hasExited.current = true
      onMiss()
    }
  })

  if (isSliced && slicedState) {
    return (
      <>
        <HotDogHalf
          position={slicedState.leftPos}
          velocity={slicedState.leftVel}
          rotation={rotation}
          side="left"
        />
        <HotDogHalf
          position={slicedState.rightPos}
          velocity={slicedState.rightVel}
          rotation={rotation}
          side="right"
        />
      </>
    )
  }

  return (
    <group
      ref={ref}
      position={position}
      rotation={[0, 0, rotation]}
      onPointerDown={(e) => {
        e.stopPropagation()
        if (!isSliced && !hasExited.current) {
          onSlice()
        }
      }}
    >
      {/* Bun */}
      <mesh castShadow>
        <cylinderGeometry args={[0.35, 0.35, 1.6, 32]} />
        <meshStandardMaterial color="#d4a574" roughness={0.8} />
      </mesh>

      {/* Bun top groove */}
      <mesh position={[0, 0.2, 0]} rotation={[Math.PI / 2, 0, 0]}>
        <torusGeometry args={[0.2, 0.08, 8, 32, Math.PI]} />
        <meshStandardMaterial color="#c49a6c" roughness={0.9} />
      </mesh>

      {/* Sausage */}
      <mesh position={[0, 0.15, 0]} castShadow>
        <cylinderGeometry args={[0.18, 0.18, 1.8, 32]} />
        <meshStandardMaterial color="#c44536" roughness={0.6} metalness={0.1} />
      </mesh>

      {/* Sausage ends */}
      <mesh position={[0, 0.15, 0]} rotation={[Math.PI / 2, 0, 0]}>
        <sphereGeometry args={[0.18, 16, 16]} />
        <meshStandardMaterial color="#c44536" roughness={0.6} />
      </mesh>

      {/* Mustard zigzag */}
      <mesh position={[0, 0.35, 0]} rotation={[0, 0, 0.1]}>
        <torusGeometry args={[0.15, 0.04, 8, 32, Math.PI * 1.5]} />
        <meshStandardMaterial
          color="#f7c948"
          emissive="#f7c948"
          emissiveIntensity={0.4}
          roughness={0.3}
        />
      </mesh>

      {/* Ketchup zigzag */}
      <mesh position={[0, 0.32, 0.08]} rotation={[0.3, 0, -0.1]}>
        <torusGeometry args={[0.12, 0.035, 8, 32, Math.PI * 1.2]} />
        <meshStandardMaterial
          color="#e63946"
          emissive="#e63946"
          emissiveIntensity={0.3}
          roughness={0.3}
        />
      </mesh>

      {/* Glow effect */}
      <pointLight
        position={[0, 0, 0.5]}
        intensity={0.3}
        color="#ff6b35"
        distance={2}
      />
    </group>
  )
}
