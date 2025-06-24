"use client";

import Link from "next/link";
import { usePathname } from 'next/navigation';
import { useState, useEffect } from 'react';
import { cn } from '@/lib/utils';
import { ThemeToggle } from "@/components/common/ThemeToggle";

const navLinks = [
  { href: "/", label: "Home" },
  { href: "/artists", label: "Artists" },
  { href: "/join", label: "Join" },
  { href: "/manager/dashboard", label: "Dashboard" },
];

const PaintIcon = ({ className }: { className?: string }) => (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
    >
      <circle cx="13.5" cy="6.5" r=".5" fill="currentColor"/>
      <circle cx="17.5" cy="10.5" r=".5" fill="currentColor"/>
      <circle cx="8.5" cy="7.5" r=".5" fill="currentColor"/>
      <circle cx="6.5" cy="12.5" r=".5" fill="currentColor"/>
      <path d="M12 2C6.5 2 2 6.5 2 12s4.5 10 10 10c.926 0 1.648-.746 1.648-1.688 0-.437-.18-.835-.477-1.122-.297-.287-.703-.465-1.17-.465-1.11 0-2.015-.88-2.015-1.98 0-1.1 1.005-1.98 2.015-1.98.63 0 1.194.512 1.194 1.144 0 .63-.516 1.144-1.194 1.144a1.14 1.14 0 0 1-1.14-1.14c0-1.626 1.7-2.95 3.3-2.95 1.8 0 3.3 1.5 3.3 3.3 0 .73-.25 1.41-.67 1.94-.42.53-1 1-1.63 1.34-1.26.68-2.66 1.03-4.1 1.03-4.97 0-9-4.03-9-9s4.03-9 9-9"/>
    </svg>
  );

const MenuIcon = ({ className }: { className?: string }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
  >
    <line x1="4" x2="20" y1="12" y2="12" />
    <line x1="4" x2="20" y1="6" y2="6" />
    <line x1="4"x2="20" y1="18" y2="18" />
  </svg>
);

export default function Header() {
  const pathname = usePathname();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    if (isMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }
  }, [isMenuOpen]);

  return (
    <header className="bg-card shadow-sm sticky top-0 z-50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center">
            <Link href="/" className="flex items-center gap-2 text-2xl font-headline font-bold">
              <PaintIcon className="h-7 w-7 text-primary" />
              <span>Artistly</span>
            </Link>
          </div>
          <nav className="hidden md:flex md:items-center md:gap-2">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={cn(
                  'text-base font-medium px-3 py-2 rounded-md hover:bg-accent hover:text-accent-foreground',
                  pathname === link.href ? 'text-primary' : 'text-foreground/80 hover:text-foreground'
                )}
              >
                {link.label}
              </Link>
            ))}
             <Link href="/join" className="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium h-10 px-4 py-2 bg-primary text-primary-foreground hover:bg-primary/90 ml-2">
                Get Started
              </Link>
              <ThemeToggle />
          </nav>
          <div className="flex items-center gap-2 md:hidden">
            <ThemeToggle />
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-white hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white"
            >
              <span className="sr-only">Open main menu</span>
              <MenuIcon className="h-6 w-6" />
            </button>
          </div>
        </div>
      </div>
      
      {isMenuOpen && (
        <div className="md:hidden fixed inset-0 bg-black bg-opacity-50 z-40" onClick={() => setIsMenuOpen(false)}>
          <div
            onClick={(e) => e.stopPropagation()}
            className="fixed top-0 right-0 h-full w-3/4 max-w-sm bg-card p-6 shadow-lg z-50 flex flex-col"
          >
            <Link href="/" className="flex items-center gap-2 text-2xl font-headline font-bold mb-4">
              <PaintIcon className="h-7 w-7 text-primary" />
              <span>Artistly</span>
            </Link>
            <div className="flex flex-col gap-4 py-6">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setIsMenuOpen(false)}
                  className="text-lg font-medium text-foreground/80 hover:text-foreground"
                >
                  {link.label}
                </Link>
              ))}
              <Link href="/join" onClick={() => setIsMenuOpen(false)} className="mt-4 inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium h-10 px-4 py-2 bg-primary text-primary-foreground hover:bg-primary/90">
                Get Started
              </Link>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
