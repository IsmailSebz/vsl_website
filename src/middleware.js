import { NextResponse } from 'next/server'
import { createServerClient } from '@supabase/ssr'

export async function middleware(request) {
  const { pathname } = request.nextUrl
  const hostname = request.headers.get('host') || ''

  // Detect admin subdomain in production, or /admin path in dev
  const isAdminHost =
    hostname.startsWith('admin.') ||
    hostname === 'admin.victoriasugar.ug'

  // ── Admin subdomain routing ───────────────────────────────────────────────
  if (isAdminHost) {
    // Rewrite root to /admin
    const rewritePath = pathname === '/'
      ? '/admin'
      : pathname.startsWith('/admin')
        ? pathname
        : `/admin${pathname}`

    const rewriteUrl = new URL(rewritePath, request.url)

    // Auth check — allow /admin/login through
    if (rewritePath === '/admin/login' || rewritePath === '/admin/login/') {
      return NextResponse.rewrite(rewriteUrl)
    }

    // Check session
    let response = NextResponse.rewrite(rewriteUrl)

    const supabase = createServerClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL,
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
      {
        cookies: {
          getAll() {
            return request.cookies.getAll()
          },
          setAll(cookiesToSet) {
            cookiesToSet.forEach(({ name, value, options }) => {
              request.cookies.set(name, value)
              response.cookies.set(name, value, options)
            })
          },
        },
      }
    )

    const { data: { session } } = await supabase.auth.getSession()

    if (!session) {
      // Redirect unauthenticated to login
      const loginUrl = new URL('/admin/login', request.url)
      return NextResponse.redirect(loginUrl)
    }

    return response
  }

  // ── Public site — pass through ────────────────────────────────────────────
  return NextResponse.next()
}

export const config = {
  matcher: [
    // Skip Next.js internals and static files
    '/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)',
  ],
}
