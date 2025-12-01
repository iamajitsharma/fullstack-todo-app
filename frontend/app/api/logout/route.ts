import { NextResponse } from "next/server";

export async function POST() {
  const res = NextResponse.json({ success: true });

  // Delete token by expiring cookie
  res.cookies.set("token", "", {
    httpOnly: true,
    secure: true,
    sameSite: "strict",
    path: "/",
    expires: new Date(0),
  });

  return res;
}
