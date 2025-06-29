'use client';

import { Canvas } from '@react-three/fiber';
import dynamic from 'next/dynamic';
import { Suspense, useEffect, useRef } from 'react';
import { Html } from '@react-three/drei';
import Saga from '@/components/Saga';

// Dynamically import Scene, with no SSR
const Scene = dynamic(() => import('./scene/Scene'), {
  ssr: false
});

export default function AboutPage() {
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleResize = () => {
      if (contentRef.current) {
        contentRef.current.style.minHeight = `${window.innerHeight * 2}px`;
      }
    };

    handleResize();
    const resizeObserver = new ResizeObserver(handleResize);
    if (contentRef.current) {
      resizeObserver.observe(contentRef.current);
    }

    return () => resizeObserver.disconnect();
  }, []);

  return (
    <div className="relative w-full h-full">
      {/* Three.js Canvas */}
      <div className="fixed inset-0 z-0 bg-black">
        <Canvas
          camera={{ position: [0, 8, 10], fov: 60 }}
          gl={{
            antialias: true,
            powerPreference: 'high-performance',
            alpha: false
          }}
          style={{
            position: 'fixed',
            width: '100vw',
            height: '100vh'
          }}
          dpr={[1, 2]}
        >
          <Suspense
            fallback={
              <Html center>
                <div className="flex flex-col items-center gap-4 bg-black/80 p-6 rounded">
                  {/* SVG Spinner */}
                  <svg
                    className="w-10 h-10 text-pink-500 animate-spin"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                    ></circle>
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"
                    ></path>
                  </svg>
                  <p className="text-gray-300 text-sm">Loading scene...</p>
                </div>
              </Html>
            }
          >
            <Scene />
          </Suspense>
        </Canvas>
      </div>

      {/* Scrollable Content */}
      <div
        ref={contentRef}
        className="relative z-10 w-full"
        style={{ minHeight: '200vh' }}
      >
        <div className="h-screen flex items-center justify-center px-4">
          <Saga>
            <div className="text-center">
              <h1 className="text-fluid-hero font-bebas text-pinks-razzledazzlerose">
                ABOUT
              </h1>
              <p className="text-3xl md:text-4xl leading-relaxed text-gray-300 max-w-4xl mx-auto">
                For over ten years, Starboard Technologies has been in operation servicing multi-national corporations.
              </p>
              <p className="text-3xl md:text-4xl leading-relaxed text-gray-300 max-w-4xl mx-auto">
                Delivering solutions embedded in the fields of IoT, supply chain management, and cloud administration.
              </p>
            </div>
          </Saga>
        </div>

        <div className="container mx-auto px-4 space-y-40 py-20">
          <Saga delay={0.2}>
            <div className="bg-black/70 backdrop-blur-sm p-8 rounded-xl max-w-2xl border border-white/10">
              <h2 className="text-3xl font-bold text-white mb-4">
                Our Expertise
              </h2>
              <p className="text-gray-300">
                Specializing in cutting-edge 3D visualization and interactive experiences.
              </p>
            </div>
          </Saga>

          <Saga delay={0.4}>
            <div className="bg-black/70 backdrop-blur-sm p-8 rounded-xl max-w-2xl ml-auto border border-white/10">
              <h2 className="text-3xl font-bold text-white mb-4">
                Global Reach
              </h2>
              <p className="text-gray-300">
                Serving clients across multiple continents with tailored solutions.
              </p>
            </div>
          </Saga>
        </div>
      </div>
    </div>
  );
}
