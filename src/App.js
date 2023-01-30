import * as THREE from "three"
import { useRef } from "react"
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
      <Environment background resolution={64}>
        <mesh scale={100}>
          <sphereGeometry args={[1, 64, 64]} />
          <DebugLayerMaterial color="#ffffff">
            <Depth
              colorA="#810000" //
              colorB="#ffd0d0"
              alpha={0.5}
              mode="multiply"
              near={0}
              far={2}
              origin={[1, 1, 1]}
            />
          </DebugLayerMaterial>
        </mesh>
      </Environment>

      <ambientLight intensity={0.5} />

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

  useFrame((state) => {
    const t = state.clock.getElapsedTime()
    ref.current.rotation.x = -Math.PI / 1.75 + Math.cos(t / 4) / 8
    ref.current.rotation.y = Math.sin(t / 4) / 8
    ref.current.rotation.z = (1 + Math.sin(t / 1.5)) / 20
    ref.current.position.y = (1 + Math.sin(t / 1.5)) / 10
  })

  return (
    <group ref={ref} {...props} dispose={null}>
      <mesh geometry={nodes.Text.geometry} scale={0.8}>
        <MeshDistortMaterial distort={0.15} speed={3} />
      </mesh>
    </group>
  )
}

function Links(props) {
  const data = [
    { key: "linkedin", link: "linkedin" },
    { key: "github", link: "github" },
  ]
  const links = data.map((l) => (
    <h1>
      <a key={l.key} href={l.link}>
        {l.name}
      </a>
    </h1>
  ))

  return <Html>{links}</Html>
}
