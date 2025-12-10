// app/api/subscribe/route.ts
import { NextResponse } from 'next/server'

export async function POST (req: Request) {
  try {
    const body = await req.json()
    const email = (body?.email || '').toString()

    if (!/^\S+@\S+\.\S+$/.test(email)) {
      return NextResponse.json(
        { ok: false, error: 'invalid_email' },
        { status: 400 }
      )
    }

    // LOCAL MOCK: store or forward to real service later.
    // For now we just return success. Optionally, log to console:
    console.log('[subscribe] email:', email)

    return NextResponse.json({ ok: true })
  } catch (err) {
    return NextResponse.json(
      { ok: false, error: `server_error: ${err}` },
      { status: 500 }
    )
  }
}
