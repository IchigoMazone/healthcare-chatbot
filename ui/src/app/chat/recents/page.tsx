"use client";

import { Plus, Search, Trash2, X } from "lucide-react";
import React, { useState } from "react";
import { useRouter } from "next/navigation";

interface ChatItem {
  id: string;
  title: string;
  date: string;
}

const generateItems = (): ChatItem[] =>
  Array.from({ length: 50 }, (_, i) => ({
    id: `${i + 1}`,
    title: `Thẻ ${i + 1}`,
    date: new Date(Date.now() - i * 86400000).toISOString().split("T")[0],
  }));

export default function page() {
  const router = useRouter();
  const [selectAll, setSelectAll] = useState<boolean>(false);
  const [selectZero, setSelectZero] = useState<boolean>(false);
  const [selectItem, setSelectItem] = useState<Object>({});
  const [items, setItems] = useState<ChatItem[]>(generateItems);
  const [visibleCount, setVisibleCount] = useState(30);
  const visibleItems = items.slice(0, visibleCount);
  const hasMore = visibleCount < items.length;

  return (
    <div className="w-full h-full flex justify-center">
      <div className="w-full h-full p-5 sm:w-[80%] sm:p-0 xl:w-[55%] flex flex-col">
        <div className="h-10 flex justify-between">
          <div className="text-[20px] font-semibold flex justify-center items-center">
            Đoạn chat
          </div>
          <button className="flex items-center gap-2 px-2 rounded-[8px] bg-black text-white">
            <span></span>
            <Plus strokeWidth="1.6" className="w-6 h-6" />
            <span
              className="cursor-pointer select-none"
              onClick={() => {
                router.push("/chat/new");
              }}
            >
              Tạo chat
            </span>
            <span></span>
          </button>
        </div>
        <div className="h-10 mt-5 relative rounded-[8px] focus-within:outline-2 focus-within:outline-offset-1 focus-within:outline-blue-500">
          <input
            type="text"
            placeholder="Tìm kiếm đoạn chat..."
            className="w-full h-full rounded-[8px] border border-gray-300 px-10"
          />
          <Search strokeWidth="1.6" className="absolute top-2 left-2" />
        </div>
        <div className="h-13 mx-2 flex justify-between items-center">
          <div className="h-full flex items-center gap-4">
            <input
              type="checkbox"
              className={`w-4 h-4 cursor-pointer selection-none ${selectZero ? "invisible" : ""}`}
              checked={selectAll}
              onChange={(e) => setSelectAll(e.target.checked)}
            />
            {!selectAll ? (
              <div className="flex items-center gap-2">
                <span>Danh sách trò chuyện</span>
                <span
                  className="underline cursor-pointer selection-none"
                  onClick={() => {
                    setSelectZero(true);
                    setSelectAll(true);
                  }}
                >
                  Chọn
                </span>
              </div>
            ) : (
              <div className="flex items-center gap-2">
                <span>{`${selectZero ? "0 Đã chọn" : `1 Đã chọn`}`}</span>
                <span>
                  <Trash2 strokeWidth="1.6" className="w-4 h-4" />
                </span>
              </div>
            )}
          </div>
          {selectAll && (
            <div
              className="flex justify-center items-center"
              onClick={() => {
                setSelectAll(false);
                setSelectZero(false);
              }}
            >
              <X strokeWidth="1.6" className="w-5 h-5" />
            </div>
          )}
        </div>
        <ul className="overflow-y-auto flex-1 min-h-0">
          {visibleItems.map((item, index) => (
            <div key={item.id}>
              <hr className="border-gray-300" />
              <button
                className="w-full h-18 cursor-pointer selection-none"
                onClick={() => {
                  router.push(`/chat/${item.id}`);
                }}
              >
                <li className="h-full mx-2 flex items-center gap-4">
                  <input type="checkbox" className="w-4 h-4 cursor-pointer" />
                  <div className="">
                    <p className="text-left">Thẻ checkbox trong HTML</p>
                    <p className="text-left text-[13px]">{item.date}</p>
                  </div>
                </li>
              </button>
            </div>
          ))}
          <hr className="border-gray-300" />
          <div className="h-5"></div>
          {hasMore && (
            <div
              className="h-8 flex justify-center items-center rounded-[8px] border border-gray-400 cursor-pointer"
              onClick={() => setVisibleCount((prev) => prev + 10)}
            >
              Hiển thị thêm
            </div>
          )}
          <div className="h-15"></div>
        </ul>
      </div>
    </div>
  );
}
