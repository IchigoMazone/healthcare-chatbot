"use client";

import { User, Lock, Eye, EyeOff } from "lucide-react";
import { useState } from "react";
import { LoginForm } from "../types/loginForm";
import { useAuthStore } from "@/src/store/auth.store";
import { useRouter } from "next/navigation";

export default function page() {
  const router = useRouter();
  const [information, setInformation] = useState<LoginForm>({
    username: "",
    password: "",
  });
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const setAuth = useAuthStore((state) => state.setAuth);

  const handleForgot = () => {
    router.push("/forgot-password");
  };

  const handleRegister = () => {
    router.push("/register");
  };

  const handleLogin = async (username: string, password: string) => {
    try {
      const res = await fetch("http://localhost:3000/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password }),
        credentials: "include",
      });
      const data = await res.json();
      console.log(data);
      if (!data.success) {
        throw new Error(data.message);
      }
      setAuth(data.data.userId, data.data.accessToken);
      router.push("/chat");
    } catch (err: any) {
      setError(err.message);
    }
  };

  return (
    <div className="w-screen h-screen flex justify-center items-center bg-gradient-to-r from-[#f34749] to-purple-500">
      <div className="grid grid-cols-1 md:grid-cols-2 w-[95vw] max-w-4xl bg-white/30 rounded-xl border-[2px] border-white/5 overflow-hidden">
        <div className="hidden md:flex justify-center items-center">
          <img
            src="/assets/gemini-color.png"
            alt="logo brand"
            className="w-[320px] h-[320px]"
          />
        </div>
        <div className="px-12 py-8 flex flex-col justify-center">
          <h2 className="text-white flex justify-center mb-2 font-semibold text-[25px]">
            Đăng nhập
          </h2>
          <p className="flex justify-center mb-[30px] text-white/85 text-[14px]">
            Đăng nhập tài khoản của bạn
          </p>
          <div className="flex relative mb-[30px]">
            <input
              type="text"
              placeholder="Nhập tài khoản"
              className="border-[2px] border-white/5 rounded-[5px] px-12 py-[10px] bg-white/30 w-[100%] placeholder-white/85 text-white/85"
              value={information.username}
              onChange={(e) =>
                setInformation({ ...information, username: e.target.value })
              }
            />
            <User className="text-white/85 absolute top-3 left-3" />
          </div>

          <div className="flex relative">
            <input
              type={showPassword ? "text" : "password"}
              placeholder="Nhập mật khẩu"
              className="border-[2px] border-white/5 rounded-[5px] px-12 py-[10px] bg-white/30 w-[100%] placeholder-white/85 text-white/85"
              value={information.password}
              onChange={(e) =>
                setInformation({ ...information, password: e.target.value })
              }
            />
            <Lock className="text-white/85 absolute top-3 left-3 " />
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

          <p
            className="text-white/85 text-[14px] text-right mt-2 mb-8 cursor-pointer hover:text-white"
            onClick={handleForgot}
          >
            Quên mật khẩu?
          </p>

          <p className="text-center text-[14px] text-white/85 mb-5">
            {error ? error : ""}
          </p>

          <button
            className="text-white/85 flex justify-center items-center p-2 border-[2px] border-white/5 rounded-[5px] bg-white/30 cursor-pointer"
            onClick={() =>
              handleLogin(information.username, information.password)
            }
          >
            Đăng nhập
          </button>

          <p className="flex justify-center items-center text-[14px] mt-5 text-white/85">
            Chưa có tài khoản?.{" "}
            <span
              className="cursor-pointer hover:text-white"
              onClick={handleRegister}
            >
              Tạo tài khoản
            </span>
          </p>
        </div>
      </div>
    </div>
  );
}
