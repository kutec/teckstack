// lib/wp.ts
export const WP_API_BASE = process.env.WP_API_BASE ?? 'http://teckstack.local'
export const WP_URL = `${WP_API_BASE.replace(/\/$/, '')}/wp-json/wp/v2`
export const TS_OPTIONS_URL = `${WP_API_BASE.replace(
  /\/$/,
  ''
)}/wp-json/teckstack/v1/options`
export const TS_SUBSCRIBE_URL = `${WP_API_BASE.replace(
  /\/$/,
  ''
)}/wp-json/teckstack/v1/subscribe`

async function safeFetch (url: string) {
  try {
    const res = await fetch(url)
    if (!res.ok) {
      const txt = await res.text().catch(() => '')
      throw new Error(
        `WP fetch failed (${res.status}) ${res.statusText} - ${txt}`
      )
    }
    return res.json()
  } catch (err) {
    console.error('[lib/wp] safeFetch error:', err)
    throw err
  }
}

export async function getSiteOptions () {
  return safeFetch(TS_OPTIONS_URL)
}

export async function getPostById (id: number) {
  return safeFetch(`${WP_URL}/posts/${id}?_embed`)
}

export async function getLatestPosts (limit = 6) {
  return safeFetch(
    `${WP_URL}/posts?_embed&per_page=${limit}&orderby=date&order=desc`
  )
}

/** Get all posts (careful with volume) */
export async function getAllPosts () {
  const url = `${WP_URL}/posts?_embed&per_page=100`
  console.debug('[lib/wp] getAllPosts ->', url)
  return safeFetch(url)
}

/** Get latest posts with a limit */
// export async function getLatestPosts (limit = 6) {
//   const url = `${WP_URL}/posts?_embed&per_page=${limit}&orderby=date&order=desc`
//   console.debug('[lib/wp] getLatestPosts ->', url)
//   return safeFetch(url)
// }

/** Get one post by slug */
export async function getPostBySlug (slug: string) {
  if (!slug) return null
  const url = `${WP_URL}/posts?slug=${encodeURIComponent(slug)}&_embed`
  console.debug('[lib/wp] getPostBySlug ->', url)
  const arr = await safeFetch(url)
  if (!Array.isArray(arr) || arr.length === 0) {
    console.warn(`[lib/wp] getPostBySlug: no post found for slug=${slug}`)
    return null
  }
  return arr[0]
}
