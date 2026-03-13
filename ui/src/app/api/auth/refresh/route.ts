import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { AuthService } from "../auth.service";

export const runtime = "nodejs";

export async function POST() {
  try {
    const cookieStore = await cookies();
    const refresh = cookieStore.get("next-auth.rftk")?.value;

    if (!refresh) {
      return NextResponse.json(
        {
          success: false,
          message: "Token không tồn tại",
        },
        { status: 400 },
      );
    }

    const result = await AuthService.refreshToken(refresh);

    return NextResponse.json({
      success: true,
      message: "Refresh token thành công",
      data: {
        userId: result.userId,
        accessToken: result.accessToken,
      },
    });
  } catch (err: any) {
    return NextResponse.json(
      {
        success: false,
        message: err.message,
      },
      { status: 403 },
    );
  }
}
