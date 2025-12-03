import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";

const publicRoutes = ["/sign-in", "/sign-up"];

export async function proxy(request: NextRequest) {
  const cookiesIntance = await cookies();
  const token = cookiesIntance.get("token")?.value;
  const { pathname } = request.nextUrl;

  const isAuth = !!token;
  const isPublicRoute = publicRoutes.includes(pathname);

  // if user is not authenticated then redirect to sign in page
  if (!isAuth && !isPublicRoute) {
    return NextResponse.redirect(new URL("/sign-in", request.url));
  }

  // if user is authenticated - prevent to access sign in and sign up page
  if (isAuth && isPublicRoute) {
    return NextResponse.redirect(new URL("/todo", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/", "/sign-in", "/sign-up", "/todo/:path*"],
};
