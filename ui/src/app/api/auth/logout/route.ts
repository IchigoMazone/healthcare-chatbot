import { NextResponse } from "next/server";

export async function POST() {
  try {
    const response = NextResponse.json({
      success: true,
      message: "Đăng xuất thành công",
    });

    response.cookies.delete("next-auth.rftk");

    return response;
  } catch (error) {
    return NextResponse.json(
      {
        success: false,
        message: "Logout thất bại",
      },
      { status: 500 },
    );
  }
}
