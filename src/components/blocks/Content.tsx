import { RichText } from '@payloadcms/richtext-lexical/react'
import type { SerializedEditorState } from '@payloadcms/richtext-lexical/lexical'

interface ContentProps {
  content?: SerializedEditorState
  columns?: '1' | '2' | '3'
}

export function Content({ content, columns = '1' }: ContentProps) {
  const colClass = columns === '3' ? 'columns-3' : columns === '2' ? 'columns-2' : ''

  return (
    <section className="container py-12">
      <div className={`prose prose-lg max-w-none ${colClass}`}>
        {content && <RichText data={content} />}
      </div>
    </section>
  )
}
