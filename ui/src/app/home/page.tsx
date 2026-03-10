"use client";

import React, { useEffect } from "react";
import { useState } from "react";
import {
  SquarePen,
  PanelLeft,
  PanelRight,
  Search,
  ImagePlus,
  ChevronDown,
  ChevronRight,
  Ellipsis,
} from "lucide-react";

export default function page() {
  const [hoverLogo, setHoverLogo] = useState<boolean>(false);
  const [small, setSmall] = useState<boolean>(true);
  const [showHistory, setShowHistory] = useState<boolean>(true);
  const [openItem, setOpenItem] = useState<Object>({});

  const chats = [
    { id: 1, title: "Hỏi về React hooks" },
    { id: 2, title: "Cách dùng Tailwind" },
    { id: 3, title: "Fix lỗi Next.js build" },
    { id: 4, title: "Tạo sidebar chat" },
    { id: 5, title: "Cách dùng useEffect đúng" },
    { id: 6, title: "Responsive layout Tailwind  aaaaaaaaaaaaaaaaaaaaaa" },
    { id: 7, title: "Fix lỗi hydration Next.js" },
    { id: 8, title: "Tối ưu performance React" },
    { id: 9, title: "Tạo dropdown menu" },
    { id: 10, title: "Làm dark mode" },
  ];

  return (
    <div className="w-screen h-screen bg-[#faf9f5] overflow-hidden">
      <div
        className={`h-screen grid grid-cols-1 ${small ? "md:grid-cols-[59px_1fr]" : "md:grid-cols-[260px_1fr]"}`}
      >
        <div className="hidden md:grid md:grid-rows-[52px_46px_46px_46px_1fr_52px] border-r border-[#d7d7d2] bg-transparent">
          {small ? (
            <div className="flex justify-center items-center py-[6px]">
              <div
                className="w-10 h-10 rounded-[10px] hover:bg-gray-200 flex justify-center items-center cursor-pointer"
                onMouseEnter={() => setHoverLogo(true)}
                onMouseLeave={() => setHoverLogo(false)}
                onClick={() => setSmall(false)}
              >
                {!hoverLogo ? (
                  <img
                    src="/assets/gemini-color.png"
                    alt="logo"
                    className="w-6 h-6"
                  />
                ) : (
                  <PanelRight className="w-[18px] h-[18px]" strokeWidth="1.6" />
                )}
              </div>
            </div>
          ) : (
            <div className="py-[6px] flex justify-between">
              <div className="w-[59px] flex justify-center items-center">
                <div className="w-10 h-10 rounded-[10px] hover:bg-gray-200 flex justify-center items-center cursor-pointer">
                  <img
                    src="/assets/gemini-color.png"
                    alt="logo"
                    className="w-6 h-6"
                  />
                </div>
              </div>
              <div className="w-[59px] flex justify-center items-center">
                <div
                  className="w-10 h-10 rounded-[10px] hover:bg-gray-200 flex justify-center items-center cursor-pointer"
                  onClick={() => {
                    setSmall(!small);
                    setHoverLogo(false);
                  }}
                >
                  <PanelLeft className="w-[18px] h-[18px]" strokeWidth="1.6" />
                </div>
              </div>
            </div>
          )}
          {small ? (
            <div className="flex justify-center items-center pt-[6px]">
              <div className="w-10 h-10 rounded-[10px] hover:bg-gray-200 flex justify-center items-center cursor-pointer">
                <SquarePen className="w-[18px] h-[18px]" strokeWidth="1.6" />
              </div>
            </div>
          ) : (
            <div className="mt-[6px] mx-2 hover:bg-gray-200 rounded-[10px] flex cursor-pointer">
              <div className="w-[42px] flex justify-center items-center">
                <SquarePen className="w-[18px] h-[18px]" strokeWidth="1.6" />
              </div>
              <div className="flex items-center text-[14px] select-none">
                Tạo đoạn chat mới
              </div>
            </div>
          )}
          {small ? (
            <div className="flex justify-center items-center pt-[6px]">
              <div className="w-10 h-10 rounded-[10px] hover:bg-gray-200 flex justify-center items-center cursor-pointer">
                <Search className="w-[18px] h-[18px]" strokeWidth="1.6" />
              </div>
            </div>
          ) : (
            <div className="mt-[6px] mx-2 hover:bg-gray-200 rounded-[10px] flex cursor-pointer">
              <div className="w-[42px] flex justify-center items-center">
                <Search className="w-[18px] h-[18px]" strokeWidth="1.6" />
              </div>
              <div className="flex items-center text-[14px] select-none">
                Tìm kiếm đoạn chat
              </div>
            </div>
          )}
          {small ? (
            <div className="flex justify-center items-center pt-[6px]">
              <div className="w-10 h-10 rounded-[10px] hover:bg-gray-200 flex justify-center items-center cursor-pointer">
                <ImagePlus className="w-[18px] h-[18px]" strokeWidth="1.6" />
              </div>
            </div>
          ) : (
            <div className="mt-[6px] mx-2 hover:bg-gray-200 rounded-[10px] flex cursor-pointer">
              <div className="w-[42px] flex justify-center items-center">
                <ImagePlus className="w-[18px] h-[18px]" strokeWidth="1.6" />
              </div>
              <div className="flex items-center text-[14px] select-none">
                Ảnh
              </div>
            </div>
          )}
          <div
            className={`${!small ? "mt-[6px] border-y border-[#d7d7d2] overflow-y-auto min-h-0 max-h-[calc(100vh-248px)] scrollbar-hide" : ""}`}
          >
            {!small && (
              <div className="text-[14px]">
                <div
                  className="mt-[8px] mx-2 hover:bg-gray-200 rounded-[10px] flex items-center gap-2 cursor-pointer"
                  onClick={() => setShowHistory(!showHistory)}
                >
                  <div className="h-[42px] flex items-center pl-[12px] select-none">
                    Gần đây
                  </div>
                  {!showHistory ? (
                    <ChevronRight
                      className="w-[18px] h-[18px] flex items-center"
                      strokeWidth="1.6"
                    />
                  ) : (
                    <ChevronDown
                      className="w-[18px] h-[18px] flex items-center"
                      strokeWidth="1.6"
                    />
                  )}
                </div>
                {showHistory && (
                  <ul className="flex flex-col">
                    {chats.map((chat, index) => (
                      <button
                        className="h-[42px] mx-[8px] mt-[8px] text-left pl-[12px] hover:bg-gray-200 rounded-[10px] flex justify-between items-center"
                        onMouseEnter={() =>
                          setOpenItem((prev) => ({
                            ...prev,
                            [chat.id]: true,
                          }))
                        }
                        onMouseLeave={() =>
                          setOpenItem((prev) => ({
                            ...prev,
                            [chat.id]: false,
                          }))
                        }
                      >
                        <li key={index} className="flex items-center truncate">
                          {chat.title.length > 30
                            ? chat.title.slice(0, 30) + "..."
                            : chat.title}
                        </li>
                        {openItem[chat.id] && (
                          <div className="w-[35px] h-[35px] flex justify-center items-center rounded-[10px] mr-1">
                            <Ellipsis
                              strokeWidth="1.6"
                              className="w-[18px] h-[18px]"
                              onClick={() => console.log(chat.id)}
                            />
                          </div>
                        )}
                      </button>
                    ))}
                  </ul>
                )}
                <div className="mb-2"></div>
              </div>
            )}
          </div>
          {small ? (
            <div className="flex justify-center items-center py-[6px]">
              <div className="w-10 h-10 rounded-[10px] hover:bg-gray-200 flex justify-center items-center cursor-pointer">
                <img
                  src="/assets/avatar.webp"
                  alt="avatar"
                  className="w-6 h-6 rounded-[50%]"
                />
              </div>
            </div>
          ) : (
            <div className="my-[6px] mx-2 hover:bg-gray-200 rounded-[10px] flex cursor-pointer">
              <div className="w-[42px] flex justify-center items-center">
                <img
                  src="/assets/avatar.webp"
                  alt="avatar"
                  className="w-6 h-6 rounded-[50%]"
                />
              </div>
              <div className="flex items-center text-[14px] select-none">
                Trịnh Như Nhất
              </div>
            </div>
          )}
        </div>
        <div className="bg-transparent flex justify-center items-center">
          Nguyễn Diệu Lyng
        </div>
      </div>
    </div>
  );
}
