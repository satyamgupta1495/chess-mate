import { Canvas } from '@react-three/fiber'
import { OrbitControls, Environment, useGLTF } from '@react-three/drei'

const Models = [
    { title: 'Piece', url: '/models/piece.glb' },
]

function Model({ url }) {
    const { scene } = useGLTF(url) as any;

    return <primitive object={scene} scale={0.018} position={[0, -0.08, 0]} />
}

export default function App() {

    return (
        <>
            <Canvas camera={{ position: [0, 0, -0.2], near: 0.029 }}>
                <Environment preset="warehouse" />
                <group>
                    <Model url={Models[0].url} />
                </group>
                <OrbitControls
                    autoRotate />
                {/* <Stats /> */}
            </Canvas>
        </>
    )
}