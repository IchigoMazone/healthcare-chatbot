"use client";

import { useRouter } from "next/navigation";
import { useAuthStore } from "@/src/store/auth.store";

export default function LogoutModal({ open, email, onClose }) {
  const router = useRouter();
  const setAuth = useAuthStore((state) => state.setAuth);

  if (!open) return null;

  const handleLogout = async () => {
    try {
      const res = await fetch("/api/auth/logout", {
        method: "POST",
        credentials: "include",
      });

      const data = await res.json();

      if (data.success) {
        setAuth(null, null);
        router.push("/login");
        router.refresh();
      } else {
        console.error("Logout failed:", data);
      }
    } catch (error) {
      console.error("Logout error:", error);
    }
  };

  return (
    <div
      className="fixed inset-0 bg-black/50 flex justify-center items-center z-[100]"
      onClick={onClose}
    >
      <div
        className="bg-[#faf9f5] rounded-[15px] p-5 w-90 shadow-lg lg:w-115"
        onClick={(e) => e.stopPropagation()}
      >
        <p className="text-[20px] text-center font-semibold">
          Bạn có chắc muốn
        </p>
        <p className="text-[20px] text-center font-semibold mb-4">
          Đăng xuất không?
        </p>
        <p className="text-[14px] text-center">Đăng xuất khỏi tài khoản</p>
        <p className="text-[14px] text-center">{email} trên</p>
        <p className="text-[14px] text-center mb-6">ChatIZN?</p>
        <div className="flex justify-center">
          <button
            className="text-white w-full bg-black py-2 rounded-[10px] mb-4 hover:bg-black/70"
            onClick={handleLogout}
          >
            Đăng xuất
          </button>
        </div>
        <div className="flex justify-center">
          <button
            className="border border-[#bbbbbb] py-2 rounded-[10px] w-full hover:bg-[#dad2d2]"
            onClick={onClose}
          >
            Hủy
          </button>
        </div>
      </div>
    </div>
  );
}
