"use client";

import { AudioLines, Plus, Settings2 } from "lucide-react";
import { useEffect } from "react";
import { useUserStore } from "@/src/store/user.store";

export default function NewPage() {
  const user = useUserStore((state) => state.user);
  return (
    <div className="w-full h-full p-5 sm:p-25">
      <div className="h-[25%] flex flex-col justify-center">
        <div className="">
          <div className="h-[30%] flex gap-2 sm:w-[100%] md:w-[100%] lg:w-[80%] xl:w-[65%] mx-auto">
            <span className="h-full flex items-center">
              <img
                src="/assets/gemini-color.png"
                alt="logo"
                className="w-7 h-7"
              />
            </span>
            <p className="h-full text-[25px] flex items-center">
              {`Xin chào ${user?.fullname}!`}
            </p>
          </div>
          <p className="h-[70%] text-[32px] font-semibold flex items-center sm:w-[100%] md:w-[100%] lg:w-[80%] xl:w-[65%] mx-auto">
            Chúng ta nên bắt đầu từ đâu?
          </p>
        </div>
      </div>
      <div className="h-[65%] pt-5 pb-25 grid grid-cols-2 grid-rows-2 gap-4 sm:hidden">
        <div className="col-start-1 row-start-1 border border-[#d7d7d2] rounded-[30px] bg-white shadow-lg flex justify-center items-center">
          <img
            src={`/assets/${user?.avatar_url}`}
            alt="avatar"
            className="w-full h-full rounded-[30px]"
          />
        </div>
        <div className="col-start-1 row-start-2 border border-[#d7d7d2] rounded-[30px] bg-white shadow-lg flex justify-center items-center">
          <img
            src="/assets/doubao-color.png"
            alt="avatar"
            className="w-[80%] h-[80%] rounded-[30px]"
          />
        </div>
        <div className="row-start-1 row-span-2 border border-[#d7d7d2] rounded-[30px] bg-white shadow-lg bg-gradient-to-t from-[#a569ff] to-[#37e1be]"></div>
      </div>
      <div className="sticky left-5 bottom-5 right-5 border border-[#d7d7d2] rounded-[30px] sm:rounded-[18px] bg-white shadow-lg flex flex-col p-1 sm:w-[100%] md:w-[100%] lg:w-[80%] xl:w-[65%] mx-auto sm:gap-4">
        <div className="flex items-center mt-2 py-2 md:py-2 mx-1">
          <textarea
            placeholder="Hỏi đáp về bệnh viện X"
            rows={1}
            className="w-full md:h-10 md:text-[16px] px-4 outline-none resize-none overflow-hidden"
            onInput={(e) => {
              const el = e.target as HTMLTextAreaElement;
              el.style.height = "auto";
              el.style.height = el.scrollHeight + "px";
            }}
          />
        </div>
        <div className="grid grid-cols-6 pb-2 sm:pb-4">
          <div className="flex justify-center items-center">
            <Plus strokeWidth="1.6" className="w-6 h-6" />
          </div>
          <div className="col-start-5 flex justify-center items-center">
            <Settings2 strokeWidth="1.6" className="w-6 h-6" />
          </div>
          <div className="col-start-6 flex justify-center items-center">
            <div className="w-8 h-8 rounded-full flex justify-center items-center hover:bg-gray-200">
              <AudioLines strokeWidth="1.6" className="w-6 h-6" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
