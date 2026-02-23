// SHELL — sem estilo. O @dev aplica o design-system.md neste componente.
'use client'

import { useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'

interface NavItem {
  label: string
  link?: { type?: string; url?: string; reference?: { slug?: string } | null; newTab?: boolean }
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
  if (link.type === 'internal' && link.reference) return `/${(link.reference as { slug?: string }).slug || ''}`
  return link.url || '#'
}

export function Header({ data, siteSettings }: HeaderProps) {
  const [mobileOpen, setMobileOpen] = useState(false)
  const logo = data.logo || siteSettings.logo

  return (
    <header>
      <div className="container">
        <Link href="/">
          {logo?.url ? (
            <Image src={logo.url} alt={logo.alt || siteSettings.siteName || 'Logo'} width={140} height={40} />
          ) : (
            <span>{siteSettings.siteName || 'Site'}</span>
          )}
        </Link>

        <nav aria-label="Principal">
          {data.navItems?.map((item, i) => (
            <Link
              key={i}
              href={getHref(item.link)}
              target={item.link?.newTab ? '_blank' : undefined}
            >
              {item.label}
            </Link>
          ))}
          {data.ctaButton?.show && data.ctaButton.label && (
            <Link href={getHref(data.ctaButton.link)}>
              {data.ctaButton.label}
            </Link>
          )}
        </nav>

        <button
          aria-label={mobileOpen ? 'Fechar menu' : 'Abrir menu'}
          aria-expanded={mobileOpen}
          onClick={() => setMobileOpen(!mobileOpen)}
        >
          <svg width="24" height="24" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
            {mobileOpen ? (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            ) : (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            )}
          </svg>
        </button>
      </div>

      {mobileOpen && (
        <nav aria-label="Menu mobile">
          {data.navItems?.map((item, i) => (
            <Link key={i} href={getHref(item.link)} onClick={() => setMobileOpen(false)}>
              {item.label}
            </Link>
          ))}
          {data.ctaButton?.show && data.ctaButton.label && (
            <Link href={getHref(data.ctaButton.link)} onClick={() => setMobileOpen(false)}>
              {data.ctaButton.label}
            </Link>
          )}
        </nav>
      )}
    </header>
  )
}
