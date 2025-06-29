'use client';
import { useRef, Suspense, useState, useEffect } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, Html, Stats, Environment } from '@react-three/drei';
import * as THREE from 'three';

// Create a custom model loader with enhanced features
function useGLTFModel(modelPath: string) {
    // Use Object3D as the base type
    const [model, setModel] = useState<THREE.Object3D | null>(null);
    const [error, setError] = useState<string | null>(null);
    const [progress, setProgress] = useState(0);
    const [sizeMB, setSizeMB] = useState<number | null>(null);

    useEffect(() => {
        let isMounted = true;
        setError(null);
        setProgress(0);

        // First fetch the file size
        fetch(modelPath)
            .then(response => {
                if (!response.ok) throw new Error(`HTTP ${response.status}`);
                return response.blob();
            })
            .then(blob => {
                if (isMounted) {
                    const mb = parseFloat((blob.size / (1024 * 1024)).toFixed(1));
                    setSizeMB(mb);
                }
                return blob;
            })
            .catch(err => {
                if (isMounted) setError(`Network error: ${err.message}`);
            });

        // Then load the model
        import('three/examples/jsm/loaders/GLTFLoader')
            .then(({ GLTFLoader }) => {
                const loader = new GLTFLoader();
                const manager = new THREE.LoadingManager();

                manager.onProgress = (url, loaded, total) => {
                    if (isMounted) setProgress(Math.round((loaded / total) * 100));
                };

                loader.manager = manager;

                loader.load(
                    modelPath,
                    (gltf) => {
                        if (isMounted) {
                            // Center and scale model automatically
                            const box = new THREE.Box3().setFromObject(gltf.scene);
                            const size = box.getSize(new THREE.Vector3()).length();
                            const center = box.getCenter(new THREE.Vector3());

                            gltf.scene.position.x -= center.x;
                            gltf.scene.position.y -= center.y;
                            gltf.scene.position.z -= center.z;

                            // Adjust scale based on model size
                            const targetSize = 5; // Target size in world units
                            const scale = targetSize / size;
                            gltf.scene.scale.set(scale, scale, scale);

                            // Correctly set as Object3D
                            setModel(gltf.scene);
                        }
                    },
                    undefined,
                    (err) => {
                        if (isMounted) {
                            console.error('GLTF Load Error:', err);
                            setError(`Model load failed: ${err.message || 'Check browser console'}`);
                        }
                    }
                );
            })
            .catch((importErr) => {
                if (isMounted) {
                    setError(`Loader error: ${importErr.message}`);
                }
            });

        return () => {
            isMounted = false;
        };
    }, [modelPath]);

    return { model, error, progress, sizeMB };
}

function Model({ modelPath }: { modelPath: string }) {
    const { model, error, progress, sizeMB } = useGLTFModel(modelPath);
    // Use Object3D for the ref
    const meshRef = useRef<THREE.Object3D>(null);

    useFrame(() => {
        if (meshRef.current) {
            meshRef.current.rotation.y += 0.002;
        }
    });

    if (error) {
        return (
            <Html center>
                <div className="text-red-400 text-center p-6 bg-black/80 rounded-xl max-w-md">
                    <h3 className="font-bold text-xl mb-2">⚠️ Model Error</h3>
                    <p className="mb-3">{error}</p>

                    {sizeMB && sizeMB > 10 && (
                        <p className="text-yellow-300 mb-3">
                            Large file size: {sizeMB}MB - Consider optimizing
                        </p>
                    )}

                    <div className="mt-4">
                        <a
                            href={modelPath}
                            target="_blank"
                            rel="noopener"
                            className="text-blue-400 underline text-sm"
                        >
                            Test model URL
                        </a>
                    </div>
                </div>
            </Html>
        );
    }

    if (!model) {
        return (
            <Html center>
                <div className="text-white bg-black/60 p-6 rounded-xl text-center">
                    <h3 className="font-bold mb-2">Loading 3D Model</h3>

                    {sizeMB && (
                        <p className="text-sm text-gray-300 mb-3">
                            File size: {sizeMB}MB
                        </p>
                    )}

                    <div className="w-64 h-2 bg-gray-700 rounded-full overflow-hidden mx-auto">
                        <div
                            className="h-full bg-gradient-to-r from-blue-500 to-purple-500 transition-all duration-300"
                            style={{ width: `${progress}%` }}
                        ></div>
                    </div>
                    <p className="mt-3 text-lg">{progress}%</p>

                    {progress > 0 && sizeMB && sizeMB > 10 && (
                        <p className="text-xs text-gray-400 mt-4">
                            Large models may take time to load...
                        </p>
                    )}
                </div>
            </Html>
        );
    }

    return (
        <primitive
            object={model}
            ref={meshRef}
        />
    );
}

export default function Scene({ modelPath }: { modelPath: string }) {
    return (
        <div className="relative h-[100vh]">
            <Canvas
                style={{ height: '100%', background: 'black' }}
                camera={{ position: [0, 2, 10], fov: 50, near: 0.1, far: 1000 }}
                shadows
            >
                <color attach="background" args={['#111']} />

                {/* Enhanced lighting setup */}
                <ambientLight intensity={0.8} />
                <directionalLight
                    position={[5, 10, 7]}
                    intensity={1.2}
                    castShadow
                    shadow-mapSize-width={1024}
                    shadow-mapSize-height={1024}
                />
                <pointLight position={[-5, 5, -5]} intensity={0.7} color="#ff7eb3" />
                <pointLight position={[3, 3, -8]} intensity={0.5} color="#7afcff" />

                {/* Environment effects */}
                <fog attach="fog" args={['#222', 5, 25]} />
                <Environment preset="apartment" />

                {/* Model with Suspense boundary */}
                <Suspense fallback={null}>
                    <Model modelPath={modelPath} />
                </Suspense>

                {/* Camera controls */}
                <OrbitControls
                    enableZoom={true}
                    enablePan={true}
                    minDistance={3}
                    maxDistance={20}
                    autoRotate={true}
                    autoRotateSpeed={0.5}
                />

                {/* Performance stats */}
                <Stats className="!fixed !top-auto !bottom-4 !left-4" />
            </Canvas>

            {/* User instructions */}
            <div className="absolute bottom-6 left-0 right-0 text-center">
                <div className="inline-block bg-black/40 px-4 py-2 rounded-full backdrop-blur-sm">
                    <p className="text-white/80 text-sm">
                        Drag to rotate • Scroll to zoom • {modelPath.split('/').pop()}
                    </p>
                </div>
            </div>
        </div>
    );
}