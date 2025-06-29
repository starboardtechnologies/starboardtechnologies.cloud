// components/GitbookLink.tsx
import React from "react";

interface ChapterProps {
    title: string;
    url: string;
    description?: string;
}

export const Chapter: React.FC<ChapterProps> = ({ title, url, description }) => {
    return (
        <div className="snap-section w-full h-full flex items-center justify-center">
            <a
                href={url}
                target="_blank"
                rel="noopener noreferrer"
                className="max-w-md p-8 rounded-2xl text-center no-underline text-white hover:text-white focus:text-white visited:text-white active:text-white"
            >
                <h3 className="text-4xl font-bebas tracking-wider mb-4">
                    {title}
                </h3>
                {description && (
                    <p className="text-base mb-6">
                        {description}
                    </p>
                )}
            </a>
        </div>
    );
};