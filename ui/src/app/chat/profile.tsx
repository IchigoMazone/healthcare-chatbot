import { Camera } from "lucide-react";

export default function ProfileModal({
  open,
  profile,
  onChange,
  onClose,
  onSave,
}) {
  if (!open) return null;

  return (
    <div
      className="fixed inset-0 bg-black/50 flex justify-center items-center z-[100]"
      onClick={onClose}
    >
      <div
        className="bg-[#faf9f5] rounded-[15px] p-5 w-90 shadow-lg lg:w-115"
        onClick={(e) => e.stopPropagation()}
      >
        <p className="text-[18px] mb-2">Chỉnh sửa hồ sơ</p>

        <div className="h-47 flex justify-center items-center">
          <div className="w-32 h-32 rounded-full outline-2 outline-offset-3 outline-blue-500 relative">
            <img src={profile.avatar} alt="avatar" className="rounded-full" />

            <span className="w-8 h-8 bg-white border border-[#d7d7d2] flex justify-center items-center rounded-full absolute bottom-0 right-0 cursor-pointer">
              <Camera strokeWidth="1.6" className="w-[18px] h-[18px]" />
            </span>
          </div>
        </div>

        <div className="p-2 rounded-[10px] border border-[#d7d7d2] focus-within:outline-2 focus-within:outline-offset-2 focus-within:outline-blue-500 mb-4">
          <p className="text-[14px]">Tên hiển thị</p>
          <input
            type="text"
            value={profile.displayName}
            onChange={(e) =>
              onChange({ ...profile, displayName: e.target.value })
            }
            className="w-full text-[16px]"
          />
        </div>

        <div className="p-2 rounded-[10px] border border-[#d7d7d2] focus-within:outline-2 focus-within:outline-offset-2 focus-within:outline-blue-500">
          <p className="text-[14px]">Tên người dùng</p>
          <input
            type="text"
            value={profile.username}
            onChange={(e) => onChange({ ...profile, username: e.target.value })}
            className="w-full text-[16px]"
          />
        </div>

        <div className="flex justify-end gap-2 mt-4">
          <button
            className="w-16 h-8 bg-transparent border border-[#bbbbbb] rounded-[8px] hover:bg-[#dad2d2] flex justify-center items-center cursor-pointer"
            onClick={onClose}
          >
            Hủy
          </button>

          <button
            className="w-16 h-8 bg-black text-white border border-[#bbbbbb] rounded-[8px] flex justify-center items-center hover:bg-black/70 cursor-pointer"
            onClick={onSave}
          >
            Lưu
          </button>
        </div>
      </div>
    </div>
  );
}
