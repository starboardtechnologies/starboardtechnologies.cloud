// app/rnd/page.tsx
'use client';
import GlitchScene from './scene/Scene';
import { Chapter } from '../../components/Chapter';

export default function RnDPage() {
    return (
        <div className="relative h-screen w-full">
            {/* Three.js Canvas is now self-contained with proper sizing */}
            <GlitchScene />

            {/* Content Layer */}
            <div className="relative z-10 h-full w-full snap-y snap-mandatory overflow-y-auto">
                <Chapter
                    title="Research and Development"
                    url="https://starboardtechnologies.gitbook.io/r-and-d"
                    description="Overview"
                />
            </div>
        </div>
    );
}