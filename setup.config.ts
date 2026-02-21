/**
 * Configuração do scaffold — editada antes de executar scaffold/init.ts
 * Ou respondida interativamente pelo CLI
 */
export interface SetupConfig {
  /** Nome do projeto */
  projectName: string

  /** Tipo de site */
  siteType: 'institutional' | 'blog' | 'landing-page' | 'ecommerce'

  /** Banco de dados */
  database: 'postgres' | 'mongodb'

  /** Plataforma de deploy */
  deploy: 'vercel' | 'docker' | 'hostinger'

  /** Arquitetura */
  architecture: 'embedded' | 'separated'
}

export const config: SetupConfig = {
  projectName: 'meu-site',
  siteType: 'institutional',
  database: 'postgres',
  deploy: 'vercel',
  architecture: 'embedded',
}
