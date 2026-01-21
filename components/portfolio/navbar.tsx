"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { Menu, X } from "lucide-react"
import { Button } from "@/components/ui/button"

const navLinks = [
  { label: "About", href: "#about" },
  { label: "Experience", href: "#experience" },
  { label: "Projects", href: "#projects" },
  { label: "Contact", href: "#contact" },
]

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50)
    }
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled 
          ? "bg-background/80 backdrop-blur-xl border-b border-border/50 shadow-lg shadow-background/20" 
          : "bg-transparent"
      }`}
    >
      <nav className="container mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          <Link 
            href="/" 
            className="text-2xl font-bold text-primary hover:scale-110 transition-transform duration-300 relative group"
          >
            <span className="relative z-10">JD</span>
            <span className="absolute inset-0 bg-primary/20 rounded-lg blur-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-1">
            {navLinks.map((link, index) => (
              <Link
                key={link.href}
                href={link.href}
                className={`relative px-4 py-2 text-muted-foreground hover:text-primary transition-colors text-sm tracking-wide uppercase group opacity-0 animate-fade-in-down`}
                style={{ animationDelay: `${index * 100}ms`, animationFillMode: 'forwards' }}
              >
                <span className="relative z-10">{link.label}</span>
                <span className="absolute inset-0 bg-primary/10 rounded-lg scale-0 group-hover:scale-100 transition-transform duration-300" />
                <span className="absolute bottom-0 left-1/2 -translate-x-1/2 w-0 h-0.5 bg-primary group-hover:w-full transition-all duration-300" />
              </Link>
            ))}
            <Button 
              asChild 
              size="sm" 
              className="ml-4 opacity-0 animate-fade-in-down hover:scale-105 transition-transform"
              style={{ animationDelay: '400ms', animationFillMode: 'forwards' }}
            >
              <a href="/resume.pdf" target="_blank" rel="noopener noreferrer">
                Resume
              </a>
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden text-foreground p-2 hover:bg-primary/10 rounded-lg transition-colors"
            onClick={() => setIsOpen(!isOpen)}
            aria-label="Toggle menu"
          >
            <div className="relative w-6 h-6">
              <Menu 
                size={24} 
                className={`absolute inset-0 transition-all duration-300 ${isOpen ? 'rotate-90 opacity-0' : 'rotate-0 opacity-100'}`}
              />
              <X 
                size={24} 
                className={`absolute inset-0 transition-all duration-300 ${isOpen ? 'rotate-0 opacity-100' : '-rotate-90 opacity-0'}`}
              />
            </div>
          </button>
        </div>

        {/* Mobile Navigation */}
        <div 
          className={`md:hidden overflow-hidden transition-all duration-500 ease-out ${
            isOpen ? 'max-h-96 opacity-100 mt-4' : 'max-h-0 opacity-0'
          }`}
        >
          <div className="py-4 border-t border-border/50 glass rounded-lg">
            <div className="flex flex-col gap-2 px-4">
              {navLinks.map((link, index) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="text-muted-foreground hover:text-primary hover:bg-primary/10 transition-all text-sm tracking-wide uppercase py-3 px-4 rounded-lg"
                  onClick={() => setIsOpen(false)}
                  style={{ 
                    transitionDelay: isOpen ? `${index * 50}ms` : '0ms',
                    transform: isOpen ? 'translateX(0)' : 'translateX(-20px)',
                    opacity: isOpen ? 1 : 0,
                  }}
                >
                  {link.label}
                </Link>
              ))}
              <Button asChild size="sm" className="w-fit mt-2 ml-4">
                <a href="/resume.pdf" target="_blank" rel="noopener noreferrer">
                  Resume
                </a>
              </Button>
            </div>
          </div>
        </div>
      </nav>
    </header>
  )
}
