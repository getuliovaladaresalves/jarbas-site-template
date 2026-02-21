import Link from 'next/link'

interface FooterLink {
  label?: string
  link?: { type?: string; url?: string; reference?: { slug?: string } | null; newTab?: boolean }
}

interface FooterColumn {
  title?: string
  links?: FooterLink[]
}

interface FooterProps {
  data: {
    columns?: FooterColumn[]
    copyrightText?: string
    showSocialLinks?: boolean
  }
  siteSettings: {
    siteName?: string
    socialLinks?: Array<{ platform?: string; url?: string }>
    contact?: { phone?: string; email?: string; address?: string }
  }
}

function getHref(link?: FooterLink['link']): string {
  if (!link) return '#'
  if (link.type === 'external') return link.url || '#'
  if (link.type === 'internal' && link.reference) {
    return `/${(link.reference as { slug?: string }).slug || ''}`
  }
  return link.url || '#'
}

const socialIcons: Record<string, string> = {
  facebook: 'Facebook',
  instagram: 'Instagram',
  twitter: 'Twitter/X',
  linkedin: 'LinkedIn',
  youtube: 'YouTube',
  tiktok: 'TikTok',
  whatsapp: 'WhatsApp',
}

export function Footer({ data, siteSettings }: FooterProps) {
  const year = new Date().getFullYear()
  const copyright = data.copyrightText?.replace('{year}', String(year))
    ?? `© ${year} ${siteSettings.siteName || 'Site'}. Todos os direitos reservados.`

  return (
    <footer className="bg-gray-900 text-gray-300">
      <div className="container py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {data.columns?.map((col, i) => (
            <div key={i}>
              {col.title && <h3 className="text-white font-semibold mb-4">{col.title}</h3>}
              <ul className="space-y-2">
                {col.links?.map((link, j) => (
                  <li key={j}>
                    <Link
                      href={getHref(link.link)}
                      target={link.link?.newTab ? '_blank' : undefined}
                      className="hover:text-white transition-colors text-sm"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}

          {siteSettings.contact && (
            <div>
              <h3 className="text-white font-semibold mb-4">Contato</h3>
              <ul className="space-y-2 text-sm">
                {siteSettings.contact.phone && <li>{siteSettings.contact.phone}</li>}
                {siteSettings.contact.email && (
                  <li>
                    <a href={`mailto:${siteSettings.contact.email}`} className="hover:text-white">
                      {siteSettings.contact.email}
                    </a>
                  </li>
                )}
                {siteSettings.contact.address && <li>{siteSettings.contact.address}</li>}
              </ul>
            </div>
          )}
        </div>

        {data.showSocialLinks && siteSettings.socialLinks && siteSettings.socialLinks.length > 0 && (
          <div className="flex gap-4 mt-8 pt-8 border-t border-gray-700">
            {siteSettings.socialLinks.map((social, i) => (
              <a
                key={i}
                href={social.url}
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-white transition-colors text-sm"
              >
                {socialIcons[social.platform || ''] || social.platform}
              </a>
            ))}
          </div>
        )}

        <div className="mt-8 pt-8 border-t border-gray-700 text-center text-sm text-gray-500">
          {copyright}
        </div>
      </div>
    </footer>
  )
}
