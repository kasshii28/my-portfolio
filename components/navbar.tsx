"use client"

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { navItems } from '@/lib/constants'
import { cn } from '@/lib/utils'
import { Menu, X } from 'lucide-react'

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setIsScrolled(true)
      } else {
        setIsScrolled(false)
      }
    }

    window.addEventListener('scroll', handleScroll)
    return () => {
      window.removeEventListener('scroll', handleScroll)
    }
  }, [])

  return (
    <header
      className={cn(
        'fixed top-0 left-0 right-0 z-50 transition-all duration-300 py-4 px-6 md:px-12',
        isScrolled
          ? 'backdrop-blur-md bg-[#0A1128]/80 shadow-md'
          : 'bg-transparent'
      )}
    >
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        <Link
          href="#hero"
          className="text-xl md:text-2xl font-semibold font-space text-white hover:opacity-80 transition-opacity"
        >
          <span className="text-[#C9B6E4]">Kasshii</span>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex space-x-8">
          {navItems.map((item, i) => (
            <Link
              key={i}
              href={item.url}
              className="text-sm uppercase tracking-wider hover:text-[#F2C1D1] transition-colors duration-300"
            >
              {item.title}
            </Link>
          ))}
        </nav>

        {/* Mobile Menu Button */}
        <button
          className="md:hidden text-white"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          aria-label={mobileMenuOpen ? 'Close menu' : 'Open menu'}
        >
          {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Navigation */}
      {mobileMenuOpen && (
        <nav className="md:hidden absolute top-full left-0 right-0 bg-[#0A1128]/95 backdrop-blur-md flex flex-col items-center py-6 space-y-6 shadow-lg">
          {navItems.map((item, i) => (
            <Link
              key={i}
              href={item.url}
              className="text-sm uppercase tracking-wider hover:text-[#F2C1D1] transition-colors duration-300"
              onClick={() => setMobileMenuOpen(false)}
            >
              {item.title}
            </Link>
          ))}
        </nav>
      )}
    </header>
  )
}