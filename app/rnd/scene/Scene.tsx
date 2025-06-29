'use client';

import { Suspense, useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { useTexture } from '@react-three/drei';

// Import Three.js postprocessing modules
import { EffectComposer } from 'three/examples/jsm/postprocessing/EffectComposer.js';
import { RenderPass } from 'three/examples/jsm/postprocessing/RenderPass.js';
import { GlitchPass } from 'three/examples/jsm/postprocessing/GlitchPass.js';
import { OutputPass } from 'three/examples/jsm/postprocessing/OutputPass.js';

function Particles() {
    const particlesRef = useRef<THREE.Points>(null);
    const texture = useTexture('/textures/particles/2.png');

    // Create particle geometry
    const particleCount = 2000;
    const positions = new Float32Array(particleCount * 3);
    const colors = new Float32Array(particleCount * 3);

    for (let i = 0; i < particleCount * 3; i += 3) {
        positions[i] = (Math.random() - 0.5) * 10;
        positions[i + 1] = (Math.random() - 0.5) * 10;
        positions[i + 2] = (Math.random() - 0.5) * 10;
        colors[i] = 0.8 + Math.random() * 0.2;
        colors[i + 1] = 0.3 + Math.random() * 0.2;
        colors[i + 2] = 0.1 + Math.random() * 0.1;
    }

    // Animation loop
    useFrame(() => {
        if (particlesRef.current) {
            particlesRef.current.rotation.x += 0.001;
            particlesRef.current.rotation.y += 0.002;
        }
    });

    return (
        <points ref={particlesRef}>
            <bufferGeometry attach="geometry">
                <bufferAttribute
                    attach="attributes-position"
                    args={[positions, 3]}
                    count={positions.length / 3}
                />
                <bufferAttribute
                    attach="attributes-color"
                    args={[colors, 3]}
                    count={colors.length / 3}
                />
            </bufferGeometry>
            <pointsMaterial
                attach="material"
                map={texture}
                alphaMap={texture}
                size={0.2}
                sizeAttenuation
                vertexColors
                transparent
                opacity={0.9}
                blending={THREE.AdditiveBlending}
                depthWrite={false}
            />
        </points>
    );
}

function Effects() {
    const { gl, scene, camera, size } = useThree();
    const composerRef = useRef<EffectComposer | null>(null);
    const glitchPassRef = useRef<GlitchPass | null>(null);
    const lastGlitchTime = useRef<number>(0);
    const glitchInterval = useRef<number>(8000); // Start with 8 seconds between glitches

    useEffect(() => {
        const composer = new EffectComposer(gl);
        composer.addPass(new RenderPass(scene, camera));

        // Create GlitchPass with reduced intensity
        const glitchPass = new GlitchPass();
        glitchPassRef.current = glitchPass;

        // Reduce glitch parameters significantly
        setTimeout(() => {
            if (glitchPassRef.current?.material?.uniforms) {
                const uniforms = glitchPassRef.current.material.uniforms;
                uniforms.strength.value = 0.08;
                uniforms.perturbation.value = 0.02;
                uniforms.speed.value = 0.05;
                glitchPassRef.current.goWild = false;
            }
        }, 100);

        composer.addPass(glitchPass);
        composer.addPass(new OutputPass());
        composerRef.current = composer;

        return () => {
            composer.dispose();
        };
    }, [gl, scene, camera]);

    // Update composer on window resize
    useEffect(() => {
        if (composerRef.current) {
            composerRef.current.setSize(size.width, size.height);
        }
    }, [size]);

    useFrame((state, delta) => {
        // Only trigger glitches occasionally
        const now = state.clock.getElapsedTime() * 1000; // Convert to ms
        if (now - lastGlitchTime.current > glitchInterval.current) {
            if (glitchPassRef.current) {
                // Trigger a very subtle glitch
                glitchPassRef.current.goWild = true;

                // Set timeout to disable wild mode quickly
                setTimeout(() => {
                    if (glitchPassRef.current) {
                        glitchPassRef.current.goWild = false;
                    }
                }, 80); // Very short glitch duration
            }

            // Reset timing with random interval (5-12 seconds)
            lastGlitchTime.current = now;
            glitchInterval.current = 5000 + Math.random() * 7000;
        }

        if (composerRef.current) {
            composerRef.current.render();
        }
    }, 1); // Run after all other useFrames

    return null;
}

export default function GlitchScene() {
    const [dpr, setDpr] = useState(1);
    const [camera, setCamera] = useState<THREE.PerspectiveCamera | null>(null);

    // Handle window resize and pixel ratio changes
    useEffect(() => {
        const handleResize = () => {
            setDpr(window.devicePixelRatio);
            if (camera) {
                camera.aspect = window.innerWidth / window.innerHeight;
                camera.updateProjectionMatrix();
            }
        };

        window.addEventListener('resize', handleResize);
        handleResize(); // Initial call

        return () => window.removeEventListener('resize', handleResize);
    }, [camera]);

    return (
        <Canvas
            style={{
                position: 'fixed',
                top: 0,
                left: 0,
                width: '100%',
                height: '100%',
                zIndex: 0,
            }}
            gl={{
                antialias: true,
                alpha: true,
                powerPreference: "high-performance"
            }}
            camera={{
                position: [0, 0, 5],
                fov: 75
            }}
            dpr={dpr}
            onCreated={({ gl, camera }) => {
                gl.setClearColor(0x000000, 0);

                // Store the camera reference and update its aspect ratio
                const perspectiveCamera = camera as THREE.PerspectiveCamera;
                setCamera(perspectiveCamera);
                perspectiveCamera.aspect = window.innerWidth / window.innerHeight;
                perspectiveCamera.updateProjectionMatrix();
            }}
        >
            <Suspense fallback={null}>
                <Particles />
                <Effects />
            </Suspense>
        </Canvas>
    );
}