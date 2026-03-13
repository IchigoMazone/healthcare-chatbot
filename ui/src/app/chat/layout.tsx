"use client";

import React, { useEffect } from "react";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { useAuthStore } from "@/src/store/auth.store";
import { useUserStore } from "@/src/store/user.store";
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
  Camera,
  Settings,
  LogOut,
  Info,
} from "lucide-react";
import MobileOverlay from "./mobileoverlay";
import RenameModal from "./rename";
import DeleteModal from "./delete";
import ProfileModal from "./profile";
import LogoutModal from "./logout";

export default function HomeLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();
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
    { id: 11, title: "Làm dark mode" },
    { id: 12, title: "Làm dark mode" },
    { id: 13, title: "Làm dark mode" },
  ]);

  const [profileX, setProfileX] = useState({
    avatar: "/assets/avatar.webp",
    displayName: "Trịnh Như Nhất",
    username: "nhattrinh@2702",
  });

  const userId = useAuthStore((state) => state.userId);
  const setUser = useUserStore((state) => state.setUser);
  const setAuth = useAuthStore((state) => state.setAuth);
  const user = useUserStore((state) => state.user);

  useEffect(() => {
    if (!userId || user) return;

    const fetchData = async () => {
      try {
        const [userRes, refreshRes] = await Promise.all([
          fetch(`/api/auth/user/${userId}`, {
            credentials: "include",
          }),
          fetch(`/api/auth/refresh`, {
            method: "POST",
            credentials: "include",
          }),
        ]);

        const userData = await userRes.json();
        const refreshData = await refreshRes.json();

        if (userData.success) {
          setUser(userData.data);
        }

        if (refreshData.success) {
          setAuth(refreshData.data.userId, refreshData.data.accessToken);
        }
      } catch (err) {
        console.log(err);
      }
    };

    fetchData();
  }, [userId]);

  const [chatPin, setChatPin] = useState<{ id: number; title: string }[]>([]);
  const [rename, setRename] = useState<boolean>(false);
  const [splice, setSplice] = useState<boolean>(false);
  const [openMobile, setOpenMobile] = useState<boolean>(false);
  const [profile, setProfile] = useState<boolean>(false);
  const [logout, setLogout] = useState<boolean>(false);
  const [setting, setSetting] = useState<boolean>(false);

  return (
    <div className="w-screen h-screen bg-[#faf9f5] overflow-hidden">
      {openMobile && <MobileOverlay onClick={() => setOpenMobile(false)} />}

      {rename && (
        <RenameModal
          open={rename}
          value={"Trinh Nhu Nhat"}
          onChange={setRename}
          onClose={() => setRename(false)}
          onSave={() => setRename(false)}
        />
      )}

      {splice && (
        <DeleteModal
          open={splice}
          onClose={() => setSplice(false)}
          onConfirm={() => setSplice(false)}
        />
      )}

      {profile && (
        <ProfileModal
          open={profile}
          profile={profileX}
          onChange={setProfileX}
          onClose={() => setProfile(false)}
          onSave={() => setProfile(false)}
        />
      )}

      {logout && (
        <LogoutModal
          open={logout}
          email="ichigomazone@gmail.com"
          onClose={() => setLogout(false)}
        />
      )}

      <div
        className={`h-screen grid grid-cols-1 ${small ? "lg:grid-cols-[59px_1fr]" : "lg:grid-cols-[260px_1fr]"}`}
      >
        <div
          className={`
            fixed lg:static top-0 left-0 z-50 h-screen
            ${openMobile ? "translate-x-0" : "-translate-x-full"}
            lg:translate-x-0
            transition-transform duration-300
            w-[260px] lg:w-auto
            flex flex-col lg:grid lg:grid-rows-[52px_46px_46px_46px_1fr_52px]
            border-r border-[#d7d7d2] bg-[#faf9f5]
          `}
        >
          {small ? (
            <div className="flex justify-center items-center py-[6px]">
              <div
                className="w-10 h-10 rounded-[10px] hover:bg-gray-200 flex justify-center items-center cursor-pointer"
                onMouseEnter={() => setHoverLogo(true)}
                onMouseLeave={() => setHoverLogo(false)}
                onClick={() => {
                  setSmall(false);
                  setSetting(false);
                }}
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
                      setSetting(false);
                    } else {
                      setOpenMobile(false);
                      setSetting(false);
                    }
                  }}
                >
                  <PanelLeft className="w-[18px] h-[18px]" strokeWidth="1.6" />
                </div>
              </div>
            </div>
          )}

          {small ? (
            <div className="flex justify-center items-center pt-[6px]">
              <div
                className="w-10 h-10 rounded-[10px] hover:bg-gray-200 flex justify-center items-center cursor-pointer"
                onClick={() => {
                  router.push("/chat/new");
                }}
              >
                <SquarePen className="w-[18px] h-[18px]" strokeWidth="1.6" />
              </div>
            </div>
          ) : (
            <div
              className="h-10 mt-[6px] mx-2 hover:bg-gray-200 rounded-[10px] flex cursor-pointer"
              onClick={() => {
                setOpenMobile(false);
                router.push("/chat/new");
              }}
            >
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
              <div
                className="w-10 h-10 rounded-[10px] hover:bg-gray-200 flex justify-center items-center cursor-pointer"
                onClick={() => {
                  router.push("/chat/recents");
                }}
              >
                <Search className="w-[18px] h-[18px]" strokeWidth="1.6" />
              </div>
            </div>
          ) : (
            <div
              className="h-10 mt-[6px] mx-2 hover:bg-gray-200 rounded-[10px] flex cursor-pointer"
              onClick={() => {
                setOpenMobile(false);
                router.push("/chat/recents");
              }}
            >
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
              <div
                className="w-10 h-10 rounded-[10px] hover:bg-gray-200 flex justify-center items-center cursor-pointer"
                onClick={() => {
                  router.push("/chat/images");
                }}
              >
                <ImagePlus className="w-[18px] h-[18px]" strokeWidth="1.6" />
              </div>
            </div>
          ) : (
            <div
              className="h-10 mt-[6px] mx-2 hover:bg-gray-200 rounded-[10px] flex cursor-pointer"
              onClick={() => {
                router.push("/chat/images");
              }}
            >
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
                {chatPin.length > 0 && (
                  <div
                    className="mt-[8px] mx-2 hover:bg-gray-200 rounded-[10px] flex items-center gap-2 cursor-pointer"
                    onClick={() => setShowPin(!showPin)}
                  >
                    <div className="h-[42px] flex items-center pl-[12px] select-none">
                      Được gắn sao
                    </div>
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
                        onClick={() => {
                          setOpenMobile(false);
                          router.push(`/chat/${chat.id}`);
                        }}
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
                        onClick={() => {
                          setOpenMobile(false);
                          router.push(`/chat/${chat.id}`);
                        }}
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
            <div className="flex justify-center items-center py-[6px] relative">
              {setting && (
                <div className="p-1 border border-[#d7d7d2] rounded-[15px] absolute bottom-14 left-1 z-[100] bg-white">
                  <div
                    className="grid grid-cols-[30px_1fr] gap-2 hover:bg-gray-200 pl-3 w-[200px] py-1 rounded-[10px] cursor-pointer"
                    onClick={() => {
                      // Profile Modal Small = True
                      setSetting(false);
                      setProfile(true);
                    }}
                  >
                    <div className="flex justify-center items-center">
                      <img
                        src={`/assets/avatars/${user?.avatar_url}`}
                        alt="avatar"
                        className="w-6 h-6 rounded-[50%]"
                      />
                    </div>
                    <div className="grid grid-rows-2 h-full ">
                      <div className="text-[16px] flex items-center">
                        {user?.fullname}
                      </div>
                      <div className="text-[14px] text-gray-400 flex items-center">
                        {`@${user?.username}`}
                      </div>
                    </div>
                  </div>
                  <hr className="mx-2 text-[#d7d7d2] my-1" />
                  <div className="text-[16px] pl-3 py-1 hover:bg-gray-200 h-11 rounded-[10px] flex items-center gap-2 cursor-pointer">
                    <span>
                      <Settings
                        strokeWidth="1.6"
                        className="w-[20px] h-[20px]"
                      />
                    </span>
                    <span>Cài đặt</span>
                  </div>
                  <div className="text-[16px] pl-3 py-1 hover:bg-gray-200 h-11 rounded-[10px] flex items-center gap-2 cursor-pointer">
                    <span>
                      <Info strokeWidth="1.6" className="w-[20px] h-[20px]" />
                    </span>
                    <span>Trợ giúp</span>
                  </div>
                  <hr className="mx-2 text-[#d7d7d2] my-1" />
                  <div
                    className="text-[16px] pl-3 py-1 hover:bg-gray-200 h-11 rounded-[10px] flex items-center gap-2 cursor-pointer"
                    onClick={() => {
                      setSetting(false);
                      setLogout(true);
                    }}
                  >
                    <span>
                      <LogOut strokeWidth="1.6" className="w-[20px] h-[20px]" />
                    </span>
                    <span>Đăng xuất</span>
                  </div>
                </div>
              )}

              {/* Avatar navbar */}

              <div
                className="w-10 h-10 rounded-[10px] hover:bg-gray-200 flex justify-center items-center cursor-pointer"
                onClick={() => {
                  setSetting(!setting);
                }}
              >
                <img
                  src={`/assets/${user?.avatar_url}`}
                  alt="avatar"
                  className="w-6 h-6 rounded-[50%]"
                />
              </div>
            </div>
          ) : (
            <div
              className="h-10 my-[6px] mx-2 hover:bg-gray-200 rounded-[10px] flex cursor-pointer relative"
              // Toggle small False
              onClick={() => {
                setSetting(!setting);
              }}
            >
              {/* Modal cua Small False */}
              {setting && (
                <div className="p-1 border border-[#d7d7d2] rounded-[15px] absolute bottom-14 left-1 z-[100] bg-white">
                  <div
                    className="grid grid-cols-[30px_1fr] gap-2 hover:bg-gray-200 pl-3 w-[200px] py-1 rounded-[10px]"
                    onClick={() => {
                      setProfile(true);
                    }}
                  >
                    <div className="flex justify-center items-center">
                      <img
                        src={`/assets/${user?.avatar_url}`}
                        alt="avatar"
                        className="w-6 h-6 rounded-[50%]"
                      />
                    </div>
                    <div className="grid grid-rows-2 h-full ">
                      <div className="text-[16px] flex items-center">
                        {user?.fullname}
                      </div>
                      <div className="text-[14px] text-gray-400 flex items-center">
                        {`@${user?.username}`}
                      </div>
                    </div>
                  </div>
                  <hr className="mx-2 text-[#d7d7d2] my-1" />
                  <div className="text-[16px] pl-3 py-1 hover:bg-gray-200 h-11 rounded-[10px] flex items-center gap-2">
                    <span>
                      <Settings
                        strokeWidth="1.6"
                        className="w-[20px] h-[20px]"
                      />
                    </span>
                    <span>Cài đặt</span>
                  </div>
                  <div className="text-[16px] pl-3 py-1 hover:bg-gray-200 h-11 rounded-[10px] flex items-center gap-2">
                    <span>
                      <Info strokeWidth="1.6" className="w-[20px] h-[20px]" />
                    </span>
                    <span>Trợ giúp</span>
                  </div>
                  <hr className="mx-2 text-[#d7d7d2] my-1" />
                  <div
                    className="text-[16px] pl-3 py-1 hover:bg-gray-200 h-11 rounded-[10px] flex items-center gap-2"
                    onClick={() => {
                      setSetting(false);
                      setLogout(true);
                    }}
                  >
                    <span>
                      <LogOut strokeWidth="1.6" className="w-[20px] h-[20px]" />
                    </span>
                    <span>Đăng xuất</span>
                  </div>
                </div>
              )}
              <div className="w-[42px] flex justify-center items-center">
                <img
                  src={`/assets/${user?.avatar_url}`}
                  alt="avatar"
                  className="w-6 h-6 rounded-[50%]"
                />
              </div>
              <div className="flex items-center text-[14px] select-none">
                {user?.fullname}
              </div>
            </div>
          )}

          {/* Header Content */}
        </div>
        <div className="bg-transparent grid grid-rows-[54px_1fr] min-w-0 overflow-hidden h-screen">
          <div className="grid grid-cols-[58px_1fr_58px] lg:grid-cols-[1fr_58px] py-[6px] min-w-0">
            <div className="ml-4 lg:hidden flex justify-center items-center">
              <div
                className="w-10 h-10 rounded-[10px] hover:bg-gray-200 flex justify-center items-center"
                onClick={() => {
                  setOpenMobile(true);
                  setSmall(false);
                }}
              >
                <PanelRight strokeWidth="1.6" className="w-[18px] h-[18px]" />
              </div>
            </div>
            <div className="pl-1 lg:pl-4 text-[15px] flex items-center">
              <span className="h-10 px-2 flex justify-center items-center rounded-[10px] hover:bg-gray-200 select-none">
                {/* Hỏi về React hooks */}
              </span>
            </div>
            <div className="mr-4 text-[15px] flex justify-center items-center">
              <div className="w-10 h-10 rounded-[10px] flex justify-center items-center hover:bg-gray-200">
                <Sparkles strokeWidth="1.6" className="w-[18px] h-[18px]" />
              </div>
            </div>
          </div>
          <div className="overflow-hidden min-h-0 h-full">{children}</div>
        </div>
      </div>
    </div>
  );
}
