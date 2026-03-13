export default function DeleteModal({ open, onClose, onConfirm }) {
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
        <p className="text-[18px] mb-1">Xóa đoạn chat</p>
        <p className="mb-5">Bạn có muốn xóa đoạn chat này không?</p>

        <div className="flex justify-end gap-2">
          <button
            className="w-16 h-8 bg-transparent border border-[#bbbbbb] rounded-[8px] hover:bg-[#dad2d2] flex justify-center items-center cursor-pointer"
            onClick={onClose}
          >
            Hủy
          </button>

          <button
            className="w-16 h-8 bg-black text-white border border-[#bbbbbb] rounded-[8px] flex justify-center items-center hover:bg-black/70 cursor-pointer"
            onClick={onConfirm}
          >
            Xóa
          </button>
        </div>
      </div>
    </div>
  );
}
