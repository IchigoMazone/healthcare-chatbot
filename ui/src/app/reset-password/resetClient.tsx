"use client";

import { KeySquare, KeyRound, Lock, Eye, EyeOff } from "lucide-react";
import { useState } from "react";
import { LoginForm } from "../types/loginForm";
import { useRouter } from "next/navigation";

export default function ResetClient() {
  const router = useRouter();
  const [information, setInformation] = useState<LoginForm>({
    username: "",
    password: "",
  });
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [showConfirm, setShowConfig] = useState<boolean>(false);

  const handleForgot = () => {
    router.push("/forgotpassword");
  };

  const handleLogin = () => {
    router.push("/login");
  };

  return (
    <div className="w-screen h-screen flex justify-center items-center bg-gradient-to-r from-[#1e1b64] to-[#6b5bf1]">
      <div className="grid grid-cols-1 md:grid-cols-2 w-[95vw] max-w-4xl bg-white/30 rounded-xl border-[2px] border-white/5 overflow-hidden">
        <div className="hidden md:flex justify-center items-center">
          <img
            src="/assets/rwkv-color.png"
            alt="logo brand"
            className="w-[320px] h-[320px]"
          />
        </div>
        <div className="px-12 py-8 flex flex-col justify-center">
          <h2 className="text-white flex justify-center mb-2 font-semibold text-[25px]">
            Đổi mật khẩu
          </h2>
          <p className="flex justify-center mb-[30px] text-white/85 text-[14px]">
            Thay đổi mật khẩu hiện tại
          </p>
          <div className="flex relative mb-[30px]">
            <input
              type={showPassword ? "text" : "password"}
              placeholder="Nhập mật khẩu mới"
              className="border-[2px] border-white/5 rounded-[5px] px-12 py-[10px] bg-white/30 w-[100%] placeholder-white/85 text-white/85"
            />
            <KeyRound className="text-white/85 absolute top-3 left-3 " />
            {showPassword ? (
              <EyeOff
                className="text-white/85 absolute top-3 right-3 cursor-pointer"
                onClick={() => setShowPassword(!showPassword)}
              />
            ) : (
              <Eye
                className="text-white/85 absolute top-3 right-3 cursor-pointer"
                onClick={() => setShowPassword(!showPassword)}
              />
            )}
          </div>

          <div className="flex relative">
            <input
              type={showConfirm ? "text" : "password"}
              placeholder="Nhập mật khẩu xác nhận"
              className="border-[2px] border-white/5 rounded-[5px] px-12 py-[10px] bg-white/30 w-[100%] placeholder-white/85 text-white/85"
            />
            <KeySquare className="text-white/85 absolute top-3 left-3 " />
            {showConfirm ? (
              <EyeOff
                className="text-white/85 absolute top-3 right-3 cursor-pointer"
                onClick={() => setShowConfig(!showConfirm)}
              />
            ) : (
              <Eye
                className="text-white/85 absolute top-3 right-3 cursor-pointer"
                onClick={() => setShowConfig(!showConfirm)}
              />
            )}
          </div>

          <p className="text-white/85 text-[14px] text-right mt-2 mb-8 cursor-pointer hover:text-white"></p>

          {/* <p className="text-center text-[14px] text-white/85 mb-5">
            Tài khoản hoặc mật khẩu không chính xác.
          </p> */}
          <p className="text-center text-[14px] text-white/85 mb-5"></p>

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
