import { NextRequest, NextResponse } from "next/server";
import { AuthService } from "./../../auth.service";

export async function GET(
  req: NextRequest,
  context: { params: Promise<{ userid: string }> },
) {
  const { userid } = await context.params;

  try {
    const result = await AuthService.getInfo(userid);

    return NextResponse.json({
      success: true,
      message: "Lấy thông tin tài khoản thành công.",
      data: {
        code: result.code,
        username: result.username,
        fullname: result.fullname,
        avatar_url: result.avatar_url,
      },
    });
  } catch (err: any) {
    return NextResponse.json(
      {
        success: false,
        message: err.message,
      },
      { status: 400 },
    );
  }
}
