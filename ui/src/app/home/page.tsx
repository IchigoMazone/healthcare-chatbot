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
  Star,
  Pencil,
  Trash2,
  Sparkles,
} from "lucide-react";

export default function page() {
  const [hoverLogo, setHoverLogo] = useState<boolean>(false);
  const [small, setSmall] = useState<boolean>(true);
  const [showHistory, setShowHistory] = useState<boolean>(true);
  const [showPin, setShowPin] = useState<boolean>(true);
  const [openItem, setOpenItem] = useState<Object>({});
  const [clickItem, setClickItem] = useState<Object>({});
  const [pinItem, setPinItem] = useState<Object>({});
  const [clickPin, setClickPin] = useState<Object>({});

  const [chats, setChats] = useState<{ id: number; title: string }[]>([
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
  ]);

  const [chatPin, setChatPin] = useState<{ id: number; title: string }[]>([]);
  const [rename, setRename] = useState<boolean>(false);
  const [splice, setSplice] = useState<boolean>(false);
  const [openMobile, setOpenMobile] = useState<boolean>(false);
  const [profile, setProfile] = useState<boolean>(false);

  return (
    <div className="w-screen h-screen bg-[#faf9f5] overflow-hidden">
      {openMobile && (
        <div
          className="fixed inset-0 bg-black/40 z-40 md:hidden"
          onClick={() => setOpenMobile(false)}
        />
      )}

      {rename && (
        <div
          className="fixed inset-0 bg-black/50 flex justify-center items-center z-[100]"
          onClick={() => {
            setRename(false);
          }}
        >
          <div
            className="bg-[#faf9f5] rounded-[15px] p-5 w-90 shadow-lg"
            onClick={(e) => {
              e.stopPropagation();
            }}
          >
            <p className="text-[18px] mb-5">Đổi tên đoạn chat</p>
            <input
              type="text"
              value="IchigoMazone"
              className="border border-[#bbbbbb] w-[100%] px-[12px] py-[6px] rounded-[5px] outline-2 outline-offset-2 outline-blue-500 mb-6"
            />
            <div className="flex justify-end gap-2">
              <button
                className="w-16 h-8 bg-transparent border border-[#bbbbbb] rounded-[8px] hover:bg-[#dad2d2] flex justify-center items-center cursor-pointer"
                onClick={() => {
                  setRename(false);
                }}
              >
                Hủy
              </button>
              <button
                className="w-16 h-8 bg-black text-white border border-[#bbbbbb] rounded-[8px] flex justify-center items-center hover:bg-black/70 cursor-pointer"
                onClick={() => {
                  setRename(false);
                }}
              >
                Lưu
              </button>
            </div>
          </div>
        </div>
      )}

      {splice && (
        <div
          className="fixed inset-0 bg-black/50 flex justify-center items-center z-[100]"
          onClick={() => {
            setSplice(false);
          }}
        >
          <div
            className="bg-[#faf9f5] rounded-[15px] p-5 w-90 shadow-lg"
            onClick={(e) => {
              e.stopPropagation();
            }}
          >
            <p className="text-[18px] mb-1">Xóa đoạn chat</p>
            <p className="mb-5">Bạn có muốn xóa đoạn chat này không?</p>
            <div className="flex justify-end gap-2">
              <button
                className="w-16 h-8 bg-transparent border border-[#bbbbbb] rounded-[8px] hover:bg-[#dad2d2] flex justify-center items-center cursor-pointer"
                onClick={() => {
                  setSplice(false);
                }}
              >
                Hủy
              </button>
              <button
                className="w-16 h-8 bg-black text-white border border-[#bbbbbb] rounded-[8px] flex justify-center items-center hover:bg-black/70 cursor-pointer"
                onClick={() => {
                  setSplice(false);
                }}
              >
                Xóa
              </button>
            </div>
          </div>
        </div>
      )}

      {profile && (
        <div
          className="fixed inset-0 bg-black/50 flex justify-center items-center z-[100]"
          onClick={() => {
            setProfile(false);
          }}
        >
          <div
            className="bg-[#faf9f5] rounded-[15px] p-5 w-90 shadow-lg"
            onClick={(e) => {
              e.stopPropagation();
            }}
          >
            <div className=""></div>
            <div className=""></div>
            <div className=""></div>
          </div>
        </div>
      )}

      <div
        className={`h-screen grid grid-cols-1 ${small ? "md:grid-cols-[59px_1fr]" : "md:grid-cols-[260px_1fr]"}`}
      >
        <div
          className={`
            fixed md:static top-0 left-0 z-50 h-screen
            ${openMobile ? "translate-x-0" : "-translate-x-full"}
            md:translate-x-0
            transition-transform duration-300
            w-[260px] md:w-auto
            flex flex-col md:grid md:grid-rows-[52px_46px_46px_46px_1fr_52px]
            border-r border-[#d7d7d2] bg-[#faf9f5]
          `}
        >
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
              <div className="w-[58px] flex justify-center items-center">
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
                    if (!openMobile) {
                      setSmall(!small);
                      setHoverLogo(false);
                    } else setOpenMobile(false);
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
            <div className="h-10 mt-[6px] mx-2 hover:bg-gray-200 rounded-[10px] flex cursor-pointer">
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
            <div className="h-10 mt-[6px] mx-2 hover:bg-gray-200 rounded-[10px] flex cursor-pointer">
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
            <div className="h-10 mt-[6px] mx-2 hover:bg-gray-200 rounded-[10px] flex cursor-pointer">
              <div className="w-[42px] flex justify-center items-center">
                <ImagePlus className="w-[18px] h-[18px]" strokeWidth="1.6" />
              </div>
              <div className="flex items-center text-[14px] select-none">
                Ảnh
              </div>
            </div>
          )}

          <div
            className={`${!small ? "mt-[6px] border-y border-[#d7d7d2] overflow-y-auto min-h-0 flex-1 scrollbar-hide" : ""}`}
          >
            {!small && (
              <div className="text-[14px] select-none">
                Ẩn hiện đã gắn sao
                {chatPin.length > 0 && (
                  <div
                    className="mt-[8px] mx-2 hover:bg-gray-200 rounded-[10px] flex items-center gap-2 cursor-pointer"
                    onClick={() => setShowPin(!showPin)}
                  >
                    <div className="h-[42px] flex items-center pl-[12px] select-none">
                      Được gắn sao
                    </div>
                    Ẩn hiện Đã gắn sao
                    {!showPin ? (
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
                )}
                {showPin && (
                  <ul className="flex flex-col">
                    {chatPin.map((chat, index) => (
                      <button
                        key={chat.id}
                        className="h-[42px] mx-[8px] mt-[8px] text-left pl-[12px] hover:bg-gray-200 rounded-[10px] flex justify-between items-center"
                        onMouseEnter={() =>
                          setPinItem((prev) => ({
                            ...prev,
                            [chat.id]: true,
                          }))
                        }
                        onMouseLeave={() => {
                          setPinItem((prev) => ({
                            ...prev,
                            [chat.id]: false,
                          }));
                          setClickPin((prev) => ({
                            ...prev,
                            [chat.id]: false,
                          }));
                        }}
                      >
                        <li key={index} className="flex items-center truncate">
                          {chat.title.length > 25
                            ? chat.title.slice(0, 25) + "..."
                            : chat.title}
                        </li>
                        {pinItem[chat.id] && (
                          <div className="w-[35px] h-[35px] flex justify-center items-center rounded-[10px] mr-1 relative">
                            <Ellipsis
                              strokeWidth="1.6"
                              className="w-[18px] h-[18px]"
                              onClick={() =>
                                setClickPin((prev) => ({
                                  ...prev,
                                  [chat.id]: true,
                                }))
                              }
                            />
                            {clickPin[chat.id] && (
                              <div className="w-32 h-28 absolute top-7 right-[-5px] bg-white rounded-[15px] border border-[#bbbbbb] flex flex-col p-1 gap-1">
                                <div
                                  className="h-8 flex items-center gap-2 pl-3 rounded-[10px] hover:bg-[#faf9f5] hover:outline hover:outline-[#3d3d3a]"
                                  onClick={() => {
                                    const index = chatPin.findIndex(
                                      (u) => u.id === chat.id,
                                    );
                                    if (index === -1) return;

                                    const newChatPin = [...chatPin];
                                    const [value] = newChatPin.splice(index, 1);

                                    setChatPin(newChatPin);
                                    setChats((prev) => [value, ...prev]);
                                  }}
                                >
                                  <Star
                                    fill="black"
                                    strokeWidth="1.6"
                                    className="w-[16px] h-[16px]"
                                  />
                                  <span className="flex items-center">
                                    Bỏ dấu
                                  </span>
                                </div>
                                <div
                                  className="h-8 flex items-center gap-2 pl-3 rounded-[10px] hover:bg-[#faf9f5] hover:outline hover:outline-[#3d3d3a]"
                                  onClick={() => {
                                    console.log(chat.id, chat.title);
                                  }}
                                >
                                  <Pencil
                                    strokeWidth="1.6"
                                    className="w-[16px] h-[16px]"
                                  />
                                  <span className="flex items-center">
                                    Đổi tên
                                  </span>
                                </div>
                                <div
                                  className="h-8 flex items-center gap-2 pl-3 rounded-[10px] hover:bg-[#faf9f5] hover:outline hover:outline-[#3d3d3a]"
                                  onClick={() => {
                                    console.log(chat.id, chat.title);
                                  }}
                                >
                                  <Trash2
                                    strokeWidth="1.6"
                                    className="w-[16px] h-[16px]"
                                  />
                                  <span className="flex items-center">Xóa</span>
                                </div>
                              </div>
                            )}
                          </div>
                        )}
                      </button>
                    ))}
                  </ul>
                )}
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
                        key={chat.id}
                        className="h-[42px] mx-[8px] mt-[8px] text-left pl-[12px] hover:bg-gray-200 rounded-[10px] flex justify-between items-center"
                        onMouseEnter={() =>
                          setOpenItem((prev) => ({
                            ...prev,
                            [chat.id]: true,
                          }))
                        }
                        onMouseLeave={() => {
                          setOpenItem((prev) => ({
                            ...prev,
                            [chat.id]: false,
                          }));
                          setClickItem((prev) => ({
                            ...prev,
                            [chat.id]: false,
                          }));
                        }}
                      >
                        <li key={index} className="flex items-center truncate">
                          {chat.title.length > 30
                            ? chat.title.slice(0, 30) + "..."
                            : chat.title}
                        </li>
                        {openItem[chat.id] && (
                          <div className="w-[35px] h-[35px] flex justify-center items-center rounded-[10px] mr-1 relative">
                            <Ellipsis
                              strokeWidth="1.6"
                              className="w-[18px] h-[18px]"
                              onClick={() =>
                                setClickItem((prev) => ({
                                  ...prev,
                                  [chat.id]: true,
                                }))
                              }
                            />

                            {clickItem[chat.id] && (
                              <div className="w-32 h-28 absolute top-7 right-[-5px] bg-white rounded-[15px] border border-[#bbbbbb] flex flex-col p-1 gap-1">
                                <div
                                  className="h-8 flex items-center gap-2 pl-3 rounded-[10px] hover:bg-[#faf9f5] hover:outline hover:outline-[#3d3d3a]"
                                  onClick={() => {
                                    const index = chats.findIndex(
                                      (u) => u.id === chat.id,
                                    );
                                    if (index === -1) return;

                                    const newChats = [...chats];
                                    const [value] = newChats.splice(index, 1);

                                    setChats(newChats);
                                    setChatPin((prev) => [value, ...prev]);
                                  }}
                                >
                                  <Star
                                    strokeWidth="1.6"
                                    className="w-[16px] h-[16px]"
                                  />
                                  <span className="flex items-center">
                                    Đánh dấu
                                  </span>
                                </div>
                                <div
                                  className="h-8 flex items-center gap-2 pl-3 rounded-[10px] hover:bg-[#faf9f5] hover:outline hover:outline-[#3d3d3a]"
                                  onClick={() => {
                                    // console.log(chat.id, chat.title);
                                    setRename(true);
                                    setClickItem((prev) => ({
                                      ...prev,
                                      [chat.id]: false,
                                    }));
                                  }}
                                >
                                  <Pencil
                                    strokeWidth="1.6"
                                    className="w-[16px] h-[16px]"
                                  />
                                  <span className="flex items-center">
                                    Đổi tên
                                  </span>
                                </div>
                                <div
                                  className="h-8 flex items-center gap-2 pl-3 rounded-[10px] hover:bg-[#faf9f5] hover:outline hover:outline-[#3d3d3a]"
                                  onClick={() => {
                                    setSplice(true);
                                  }}
                                >
                                  <Trash2
                                    strokeWidth="1.6"
                                    className="w-[16px] h-[16px]"
                                  />
                                  <span className="flex items-center">Xóa</span>
                                </div>
                              </div>
                            )}
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
              <div
                className="w-10 h-10 rounded-[10px] hover:bg-gray-200 flex justify-center items-center cursor-pointer"
                onClick={() => {
                  setProfile(true);
                }}
              >
                <img
                  src="/assets/avatar.webp"
                  alt="avatar"
                  className="w-6 h-6 rounded-[50%]"
                />
              </div>
            </div>
          ) : (
            <div
              className="h-10 my-[6px] mx-2 hover:bg-gray-200 rounded-[10px] flex cursor-pointer"
              onClick={() => {
                setProfile(true);
              }}
            >
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

        <div className="bg-transparent grid grid-rows-[54px_1fr] min-w-0">
          <div className="border-b border-[#d7d7d2] grid grid-cols-[58px_1fr_58px] md:grid-cols-[1fr_58px] py-[6px] min-w-0">
            <div className="ml-4 md:hidden flex justify-center items-center">
              <div
                className="w-10 h-10 rounded-[10px] hover:bg-gray-200 flex justify-center items-center"
                onClick={() => {
                  setOpenMobile(true);
                }}
              >
                <PanelRight strokeWidth="1.6" className="w-[18px] h-[18px]" />
              </div>
            </div>
            <div className="pl-1 md:pl-4 text-[15px] flex items-center">
              <span className="h-10 px-2 flex justify-center items-center rounded-[10px] hover:bg-gray-200 select-none">
                Hỏi về React hooks
              </span>
            </div>
            <div className="mr-4 text-[15px] flex justify-center items-center">
              <div className="w-10 h-10 rounded-[10px] flex justify-center items-center hover:bg-gray-200">
                <Sparkles strokeWidth="1.6" className="w-[18px] h-[18px]" />
              </div>
            </div>
          </div>
          <div className=""></div>
        </div>
      </div>
    </div>
  );
}
