'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Menu, X } from 'lucide-react';

export default function Navbar() {
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    const [hasScrolled, setHasScrolled] = useState(false);

    useEffect(() => {
        const handleScroll = () => setHasScrolled(window.scrollY > 150);
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const navLinks = [
        { href: '/', label: 'Home' },
        { href: '/about', label: 'About' },
        { href: '/rnd', label: 'R&D' },
        { href: '/contract', label: 'Contract' },
        { href: '/contact', label: 'Contact' },
    ];

    return (
        <header
            className={`fixed inset-x-0 top-0 z-50 ${hasScrolled
                ? 'backdrop-blur-[80px] border-b border-gray-800'
                : 'bg-transparent'
                } transition-all duration-300`}
        >
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex items-center justify-between h-24">
                    {/* Optional logo/branding */}
                    <div className="hidden md:block w-24" />

                    {/* Desktop Navigation */}
                    <nav className="hidden md:flex items-center gap-10">
                        {navLinks.map((link) => (
                            <Link
                                key={link.href}
                                href={link.href}
                                className="relative px-1 py-2 group"
                                style={{
                                    fontFamily: "'Bebas Neue', sans-serif",
                                    fontSize: '1.5rem',
                                    fontWeight: '400',
                                    letterSpacing: '1px',
                                    color: 'white',
                                    textTransform: 'uppercase'
                                }}
                            >
                                <span className="text-inherit">{link.label}</span>
                                <span
                                    className="absolute left-0 bottom-0 w-full h-0.5 bg-white scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left"
                                    style={{
                                        height: '2px'
                                    }}
                                />
                            </Link>
                        ))}
                    </nav>

                    {/* Mobile menu toggle */}
                    <div className="md:hidden relative z-50">
                        <button
                            className="w-12 h-12 flex items-center justify-center focus:outline-none"
                            onClick={() => setMobileMenuOpen((prev) => !prev)}
                            aria-label="Toggle menu"
                        >
                            {mobileMenuOpen ? (
                                <X className="h-8 w-8 text-white" />
                            ) : (
                                <Menu className="h-8 w-8 text-white" />
                            )}
                        </button>

                        {/* Mobile Dropdown Menu */}
                        {mobileMenuOpen && (
                            <div className="absolute top-full right-0 mt-2 w-64 bg-black/90 backdrop-blur rounded-lg shadow-xl z-40 overflow-hidden">
                                <div className="flex flex-col py-2">
                                    {navLinks.map((link) => (
                                        <Link
                                            key={link.href}
                                            href={link.href}
                                            className="px-6 py-4 text-left transition-colors duration-200"
                                            style={{
                                                fontFamily: "'Bebas Neue', sans-serif",
                                                fontSize: '1.25rem',
                                                letterSpacing: '1px',
                                                color: 'white',
                                                textTransform: 'uppercase'
                                            }}
                                            onClick={() => setMobileMenuOpen(false)}
                                            onMouseEnter={(e) =>
                                                (e.currentTarget.style.backgroundColor = 'rgba(255, 255, 255, 0.2)')
                                            }
                                            onMouseLeave={(e) =>
                                                (e.currentTarget.style.backgroundColor = 'transparent')
                                            }
                                        >
                                            {link.label}
                                        </Link>
                                    ))}
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </header>
    );
}