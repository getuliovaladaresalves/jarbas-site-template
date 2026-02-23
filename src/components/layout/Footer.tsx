// SHELL — sem estilo. O @dev aplica o design-system.md neste componente.
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
  if (link.type === 'internal' && link.reference) return `/${(link.reference as { slug?: string }).slug || ''}`
  return link.url || '#'
}

export function Footer({ data, siteSettings }: FooterProps) {
  const year = new Date().getFullYear()
  const copyright = data.copyrightText?.replace('{year}', String(year))
    ?? `© ${year} ${siteSettings.siteName || 'Site'}. Todos os direitos reservados.`

  return (
    <footer>
      <div className="container">
        <div>
          {data.columns?.map((col, i) => (
            <div key={i}>
              {col.title && <h3>{col.title}</h3>}
              <ul>
                {col.links?.map((link, j) => (
                  <li key={j}>
                    <Link href={getHref(link.link)} target={link.link?.newTab ? '_blank' : undefined}>
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}

          {siteSettings.contact && (
            <div>
              <h3>Contato</h3>
              <ul>
                {siteSettings.contact.phone && <li>{siteSettings.contact.phone}</li>}
                {siteSettings.contact.email && (
                  <li>
                    <a href={`mailto:${siteSettings.contact.email}`}>{siteSettings.contact.email}</a>
                  </li>
                )}
                {siteSettings.contact.address && <li>{siteSettings.contact.address}</li>}
              </ul>
            </div>
          )}
        </div>

        {data.showSocialLinks && siteSettings.socialLinks && siteSettings.socialLinks.length > 0 && (
          <div>
            {siteSettings.socialLinks.map((social, i) => (
              <a key={i} href={social.url} target="_blank" rel="noopener noreferrer">
                {social.platform}
              </a>
            ))}
          </div>
        )}

        <div>{copyright}</div>
      </div>
    </footer>
  )
}
