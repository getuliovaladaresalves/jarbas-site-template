'use client'

import { useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'

interface NavItem {
  label: string
  link?: { type?: string; url?: string; reference?: { slug?: string } | null; newTab?: boolean }
  children?: NavItem[]
}

interface HeaderProps {
  data: {
    logo?: { url?: string; alt?: string } | null
    navItems?: NavItem[]
    ctaButton?: { label?: string; link?: { type?: string; url?: string; reference?: { slug?: string } | null }; show?: boolean }
  }
  siteSettings: {
    siteName?: string
    logo?: { url?: string; alt?: string } | null
  }
}

function getHref(link?: NavItem['link']): string {
  if (!link) return '#'
  if (link.type === 'external') return link.url || '#'
  if (link.type === 'internal' && link.reference) {
    const ref = link.reference as { slug?: string }
    return `/${ref.slug || ''}`
  }
  return link.url || '#'
}

export function Header({ data, siteSettings }: HeaderProps) {
  const [mobileOpen, setMobileOpen] = useState(false)
  const logo = data.logo || siteSettings.logo

  return (
    <header className="sticky top-0 z-50 bg-white border-b border-gray-200">
      <div className="container flex items-center justify-between h-16">
        <Link href="/" className="flex items-center gap-2">
          {logo?.url ? (
            <Image src={logo.url} alt={logo.alt || siteSettings.siteName || 'Logo'} width={140} height={40} className="h-8 w-auto" />
          ) : (
            <span className="text-xl font-bold">{siteSettings.siteName || 'Site'}</span>
          )}
        </Link>

        <nav className="hidden md:flex items-center gap-6">
          {data.navItems?.map((item, i) => (
            <Link
              key={i}
              href={getHref(item.link)}
              target={item.link?.newTab ? '_blank' : undefined}
              className="text-sm font-medium text-gray-700 hover:text-blue-600 transition-colors"
            >
              {item.label}
            </Link>
          ))}
          {data.ctaButton?.show && data.ctaButton.label && (
            <Link
              href={getHref(data.ctaButton.link)}
              className="px-4 py-2 bg-blue-600 text-white text-sm font-medium rounded-lg hover:bg-blue-700 transition-colors"
            >
              {data.ctaButton.label}
            </Link>
          )}
        </nav>

        <button
          className="md:hidden p-2"
          onClick={() => setMobileOpen(!mobileOpen)}
          aria-label="Menu"
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            {mobileOpen ? (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            ) : (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            )}
          </svg>
        </button>
      </div>

      {mobileOpen && (
        <nav className="md:hidden border-t border-gray-200 bg-white px-4 py-4 space-y-3">
          {data.navItems?.map((item, i) => (
            <Link
              key={i}
              href={getHref(item.link)}
              className="block text-gray-700 hover:text-blue-600"
              onClick={() => setMobileOpen(false)}
            >
              {item.label}
            </Link>
          ))}
          {data.ctaButton?.show && data.ctaButton.label && (
            <Link
              href={getHref(data.ctaButton.link)}
              className="block w-full text-center px-4 py-2 bg-blue-600 text-white rounded-lg"
              onClick={() => setMobileOpen(false)}
            >
              {data.ctaButton.label}
            </Link>
          )}
        </nav>
      )}
    </header>
  )
}
