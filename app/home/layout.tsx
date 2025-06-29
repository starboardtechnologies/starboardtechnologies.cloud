// components/HomeLayout.tsx
import React from 'react';
import Image from 'next/image';

export default function HomeLayout({ children }: { children: React.ReactNode }) {
    return (
        <main className="relative min-h-screen flex flex-col items-center justify-center pt-20 pb-6 px-4 bg-black text-white overflow-hidden">
            {/* Centered and larger logo */}
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                <div className="p-6">
                    <Image
                        src="/images/st_logo.png"
                        alt="Starboard Logo"
                        width={800}
                        height={800}
                        className="w-full max-w-[700px] sm:max-w-[500px] md:max-w-[600px] lg:max-w-[700px] object-contain"
                        priority
                    />
                </div>
            </div>

            {/* Foreground content */}
            <div className="relative z-10 w-full">
                {children}
            </div>
        </main>
    );
}
