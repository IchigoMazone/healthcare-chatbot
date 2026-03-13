export default function RenameModal({
  open,
  value,
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
        className="bg-[#faf9f5] rounded-[15px] p-5 w-90 shadow-lg"
        onClick={(e) => e.stopPropagation()}
      >
        <p className="text-[18px] mb-5">Đổi tên đoạn chat</p>

        <input
          type="text"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className="border border-[#bbbbbb] w-full px-[12px] py-[6px] rounded-[5px] outline-2 outline-offset-2 outline-blue-500 mb-6"
        />

        <div className="flex justify-end gap-2">
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
