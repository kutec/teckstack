// lib/wp.ts

const WP_BASE =
  process.env.WP_API_BASE ||
  process.env.NEXT_PUBLIC_WP_API_BASE ||
  'http://teckstack.local'

const BASE = WP_BASE.replace(/\/$/, '')

export const WP_REST = `${BASE}/wp-json/wp/v2`
export const TS_OPTIONS_URL = `${BASE}/wp-json/teckstack/v1/options`
export const TS_SUBSCRIBE_URL = `${BASE}/wp-json/teckstack/v1/subscribe`

async function safeFetch (url: string) {
  if (!url.startsWith('http')) {
    throw new Error(`Invalid WP URL (relative): ${url}`)
  }

  const res = await fetch(url, { cache: 'no-store' })

  if (!res.ok) {
    const text = await res.text().catch(() => '')
    throw new Error(`WP fetch failed (${res.status}): ${text}`)
  }

  return res.json()
}

/* ---------------- OPTIONS ---------------- */

export async function getSiteOptions () {
  return safeFetch(TS_OPTIONS_URL)
}

/* ---------------- POSTS ---------------- */
export async function getLatestPosts (limit = 6, excludeIds: number[] = []) {
  const excludeQuery =
    excludeIds.length > 0 ? `&exclude=${excludeIds.join(',')}` : ''

  return safeFetch(
    `${WP_REST}/posts?_embed&per_page=${limit}&orderby=date&order=desc${excludeQuery}`
  )
}

export async function getPostById (id: number) {
  return safeFetch(`${WP_REST}/posts/${id}?_embed`)
}

export async function getPostBySlug (slug: string) {
  const arr = await safeFetch(
    `${WP_REST}/posts?slug=${encodeURIComponent(slug)}&_embed`
  )
  return arr?.[0] ?? null
}

/* ---------------- GUIDES (CPT) ---------------- */

export async function getGuideBySlug (slug: string) {
  const arr = await safeFetch(
    `${WP_REST}/guides?slug=${encodeURIComponent(slug)}&_embed`
  )
  return arr?.[0] ?? null
}

export async function getGuides (limit = 10) {
  return safeFetch(
    `${WP_REST}/guides?_embed&per_page=${limit}&orderby=date&order=desc`
  )
}
