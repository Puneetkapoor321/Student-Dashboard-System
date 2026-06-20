import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { jwtVerify } from 'jose'

const secretKey = process.env.SESSION_SECRET || 'super-secret-key-for-local-dev-only'
const encodedKey = new TextEncoder().encode(secretKey)

export async function proxy(request: NextRequest) {
  const session = request.cookies.get('session')?.value

  // Protected routes
  const isProtectedRoute = request.nextUrl.pathname.startsWith('/dashboard') || 
                           request.nextUrl.pathname.startsWith('/courses') || 
                           request.nextUrl.pathname.startsWith('/progress') || 
                           request.nextUrl.pathname.startsWith('/achievements') || 
                           request.nextUrl.pathname.startsWith('/profile')

  const isPublicRoute = request.nextUrl.pathname.startsWith('/login') || 
                        request.nextUrl.pathname.startsWith('/signup')

  if (isProtectedRoute && !session) {
    return NextResponse.redirect(new URL('/login', request.url))
  }

  if (session) {
    try {
      // Validate session
      await jwtVerify(session, encodedKey, { algorithms: ['HS256'] })
      
      // Redirect to dashboard if trying to access login/signup while authenticated
      if (isPublicRoute) {
        return NextResponse.redirect(new URL('/dashboard', request.url))
      }
    } catch {
      // Invalid session, delete cookie
      const response = NextResponse.redirect(new URL('/login', request.url))
      response.cookies.delete('session')
      return response
    }
  }

  // Refresh cookie if needed (done by the helper in updateSession for simplicity, or we can just pass the request)
  // For now, this is enough to protect routes.
  return NextResponse.next()
}

export default proxy;

export const config = {
  matcher: [
    '/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)',
  ],
}
