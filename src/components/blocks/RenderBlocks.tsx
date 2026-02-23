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

interface Block {
  blockType: string
  id?: string
  [key: string]: unknown
}

type BlockComponent = React.FC<Record<string, unknown>>

const blockComponents: Record<string, BlockComponent> = {
  hero: Hero as BlockComponent,
  content: Content as BlockComponent,
  cta: CTA as BlockComponent,
  features: Features as BlockComponent,
  testimonials: Testimonials as BlockComponent,
  faq: FAQ as BlockComponent,
  gallery: Gallery as BlockComponent,
  pricing: Pricing as BlockComponent,
  banner: Banner as BlockComponent,
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
