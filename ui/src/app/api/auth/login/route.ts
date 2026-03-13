import { NextRequest, NextResponse } from "next/server";
import { AuthService } from "../auth.service";

export const runtime = "nodejs";

export async function OPTIONS() {
  return new Response(null, {
    status: 204,
    headers: {
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "GET,POST,PUT,DELETE,OPTIONS",
      "Access-Control-Allow-Headers": "Content-Type, Authorization",
    },
  });
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { userid, accessToken, refreshToken } = await AuthService.login(
      body.username,
      body.password,
    );

    const res = NextResponse.json({
      success: true,
      message: "Đăng nhập thành công.",
      data: { userId: userid, accessToken },
    });

    res.cookies.set("next-auth.rftk", refreshToken, {
      httpOnly: true,
      secure: false,
      sameSite: "lax",
      maxAge: 7 * 24 * 60 * 60,
    });

    return res;
  } catch (err: any) {
    return NextResponse.json(
      { success: false, message: err.message },
      { status: 400 },
    );
  }
}
