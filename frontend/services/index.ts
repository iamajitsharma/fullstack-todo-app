"use server";
import { cookies } from "next/headers";

export async function getToken() {
  const cookiesInstance = await cookies();
  const token = cookiesInstance.get("token")?.value;

  if (!token) return null;

  return token;
}
