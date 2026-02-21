import React from 'react'
import { Hero } from './Hero'
import { Content } from './Content'
import { CTA } from './CTA'
import { Features } from './Features'
import { Testimonials } from './Testimonials'
import { FAQ } from './FAQ'
import { Gallery } from './Gallery'
import { Pricing } from './Pricing'
import { Banner } from './Banner'

/* eslint-disable @typescript-eslint/no-explicit-any */
const blockComponents: Record<string, React.FC<any>> = {
  hero: Hero,
  content: Content,
  cta: CTA,
  features: Features,
  testimonials: Testimonials,
  faq: FAQ,
  gallery: Gallery,
  pricing: Pricing,
  banner: Banner,
}

interface Block {
  blockType: string
  id?: string
  [key: string]: unknown
}

export function RenderBlocks({ blocks }: { blocks: Block[] }) {
  if (!blocks || blocks.length === 0) return null

  return (
    <>
      {blocks.map((block, i) => {
        const Component = blockComponents[block.blockType]
        if (!Component) return null
        return <Component key={block.id || i} {...block} />
      })}
    </>
  )
}
