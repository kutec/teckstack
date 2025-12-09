// lib/wp.ts
export const WP_URL =
  process.env.WP_URL ?? 'http://teckstack.local/wp-json/wp/v2'

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

export async function getAllPosts () {
  const url = `${WP_URL}/posts?_embed`
  console.debug('[lib/wp] getAllPosts ->', url)
  return safeFetch(url)
}

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
