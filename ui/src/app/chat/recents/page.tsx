import { Plus, Search } from "lucide-react";
import React from "react";

export default function page() {
  return (
    <div className="w-full h-full flex justify-center">
      <div className="w-full h-full p-5 sm:w-[80%] sm:p-0 xl:w-[65%] flex flex-col">
        <div className="h-10 flex justify-between">
          <div className="text-[20px] font-semibold flex justify-center items-center">
            Đoạn chat
          </div>
          <button className="flex items-center gap-2 px-10 rounded-[8px] bg-black text-white">
            <span></span>
            <Plus strokeWidth="1.6" className="w-6 h-6" />
            <span>Tạo chat</span>
            <span></span>
          </button>
        </div>
        <div className="h-20 py-2 relative">
          <input
            type="text"
            autoComplete="off"
            className="w-full h-full rounded-[8px] border border-gray-300 px-4"
          />
        </div>
      </div>
    </div>
  );
}
