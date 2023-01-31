import * as THREE from "three"
import { useRef, useState } from "react"
import { Canvas, useFrame } from "@react-three/fiber"
import { DebugLayerMaterial, LayerMaterial, Base, Depth, Noise } from "lamina"
import {
  useGLTF,
  PresentationControls,
  Environment,
  MeshDistortMaterial,
  Html,
} from "@react-three/drei"
import "./App.css"

export default function App() {
  return (
    <Canvas camera={{ position: [0, 0, 4], fov: 50 }}>
      <ambientLight intensity={15} />

      <PresentationControls
        global
        config={{ mass: 2, tension: 500 }}
        snap={{ mass: 4, tension: 1500 }}
        rotation={[160, 0, 0]}
        polar={[-Math.PI / 3, Math.PI / 3]}
        azimuth={[-Math.PI / 1.4, Math.PI / 2]}>
        <Jamesledger />
      </PresentationControls>
    </Canvas>
  )
}

function Jamesledger(props) {
  const ref = useRef()
  const { nodes } = useGLTF("/james.glb")
  const [hovered, hover] = useState(false)

  useFrame((state) => {
    const t = state.clock.getElapsedTime()
    ref.current.rotation.x = -Math.PI / 1.75 + Math.cos(t / 4) / 8
    ref.current.rotation.y = Math.sin(t / 4) / 8
    ref.current.rotation.z = (1 + Math.sin(t / 1.5)) / 20
    ref.current.position.y = (1 + Math.sin(t / 1.5)) / 10
  })

  return (
    <mesh
      {...props}
      ref={ref}
      geometry={nodes.Text.geometry}
      scale={0.8}
      onPointerOver={(event) => hover(true)}
      onPointerOut={(event) => hover(false)}
      onClick={(event) =>
        (window.location.href = "https://www.linkedin.com/in/jamesledger/")
      }>
      <MeshDistortMaterial
        distort={0.3}
        speed={hovered ? 30 : 2}
        color={hovered ? "darkred" : "#023020"}
        roughness={1}
      />
    </mesh>
  )
}
