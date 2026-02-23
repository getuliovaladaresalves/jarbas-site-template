// SHELL — sem estilo. O @dev aplica o design-system.md neste componente.
import { RichText } from '@payloadcms/richtext-lexical/react'
import type { SerializedEditorState } from '@payloadcms/richtext-lexical/lexical'

interface ContentProps {
  content?: SerializedEditorState
  columns?: '1' | '2' | '3'
}

export function Content({ content, columns = '1' }: ContentProps) {
  return (
    <section className="container" data-columns={columns}>
      {content && <RichText data={content} />}
    </section>
  )
}
