import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { NextResponse } from "next/server";

export async function GET() {
  const { token } = await auth.api.getToken({
    headers: await headers(),
  });
  return NextResponse.json({ token });
}
