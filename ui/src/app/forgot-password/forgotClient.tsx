"use client";

import { User, Code } from "lucide-react";
import { useState } from "react";
import { LoginForm } from "../types/loginForm";
import { useRouter } from "next/navigation";

export default function ForgotClient() {
  const router = useRouter();
  const [information, setInformation] = useState<LoginForm>({
    username: "",
    password: "",
  });
  const [showPassword, setShowPassword] = useState<boolean>(false);

  const handleLogin = () => {
    router.push("/login");
  };

  const handleForgot = () => {
    router.push("/register");
  };

  return (
    <div className="w-screen h-screen flex justify-center items-center bg-gradient-to-r from-blue-400 to-[#d97757]">
      <div className="grid grid-cols-1 md:grid-cols-2 w-[95vw] max-w-4xl bg-white/30 rounded-xl border-[2px] border-white/5 overflow-hidden">
        <div className="hidden md:flex justify-center items-center">
          <img
            src="/assets/claude-color.png"
            alt="logo brand"
            className="w-[320px] h-[320px]"
          />
        </div>
        <div className="px-12 py-8 flex flex-col justify-center">
          <h2 className="text-white flex justify-center mb-2 font-semibold text-[25px]">
            Quên mật khẩu
          </h2>
          <p className="flex justify-center mb-[30px] text-white/85 text-[14px]">
            Hãy nhập các thông tin để khôi phục tài khoản
          </p>
          <div className="flex relative mb-[30px]">
            <input
              type="text"
              placeholder="Nhập mã giới thiệu"
              className="border-[2px] border-white/5 rounded-[5px] px-12 py-[10px] bg-white/30 w-[100%] placeholder-white/85 text-white/85"
            />
            <Code className="text-white/85 absolute top-3 left-3" />
          </div>

          <div className="flex relative">
            <input
              type="text"
              placeholder="Nhập tài khoản"
              className="border-[2px] border-white/5 rounded-[5px] px-12 py-[10px] bg-white/30 w-[100%] placeholder-white/85 text-white/85"
            />
            <User className="text-white/85 absolute top-3 left-3" />
          </div>

          {/* <p className="text-center text-[14px] text-white/85 mt-10 mb-5">
            Tài khoản hoặc mật khẩu không chính xác.
          </p> */}
          <p className="text-center text-[14px] text-white/85 mt-10 mb-5"></p>

          <button className="text-white/85 flex justify-center items-center p-2 border-[2px] border-white/5 rounded-[5px] bg-white/30 cursor-pointer">
            Xác nhận
          </button>

          <p
            className="flex justify-center items-center text-[14px] mt-5 text-white/85 cursor-pointer hover:text-white"
            onClick={handleLogin}
          >
            Quay lại đăng nhập
          </p>
        </div>
      </div>
    </div>
  );
}
