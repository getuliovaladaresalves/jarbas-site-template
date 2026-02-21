export const preset = {
  name: 'blog',
  description: 'Blog/portal de conteúdo com tags, autores, busca e posts relacionados',
  collections: ['Tags', 'Authors'],
  blocks: [],
  pages: ['blog', 'blog/[slug]', 'blog/category/[slug]'],
}
