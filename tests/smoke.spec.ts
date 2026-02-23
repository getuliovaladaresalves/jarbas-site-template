import { test, expect } from '@playwright/test'

/**
 * Smoke tests — validam que as rotas principais respondem corretamente.
 * Estes testes devem passar antes de qualquer deploy em produção.
 * Adicione novos testes conforme novas páginas são criadas pelo @dev.
 */

test.describe('Smoke — Rotas principais', () => {
  test('home carrega sem erro', async ({ page }) => {
    const response = await page.goto('/')
    expect(response?.status()).toBeLessThan(500)
    await expect(page).not.toHaveTitle(/error|500|not found/i)
  })

  test('admin panel acessível', async ({ page }) => {
    const response = await page.goto('/admin')
    expect(response?.status()).toBeLessThan(500)
  })

  test('API do Payload responde', async ({ request }) => {
    const response = await request.get('/api/pages')
    // 200 (autenticado) ou 401 (não autenticado) — ambos indicam que a API está no ar
    expect([200, 401, 403]).toContain(response.status())
  })

  test('sitemap.xml existe', async ({ request }) => {
    const response = await request.get('/sitemap.xml')
    expect(response.status()).toBe(200)
    expect(response.headers()['content-type']).toContain('xml')
  })

  test('robots.txt existe', async ({ request }) => {
    const response = await request.get('/robots.txt')
    expect(response.status()).toBe(200)
  })
})

test.describe('Smoke — Security headers', () => {
  test('headers de segurança presentes', async ({ request }) => {
    const response = await request.get('/')
    const headers = response.headers()
    expect(headers['x-frame-options']).toBe('SAMEORIGIN')
    expect(headers['x-content-type-options']).toBe('nosniff')
    expect(headers['referrer-policy']).toBe('strict-origin-when-cross-origin')
  })
})
