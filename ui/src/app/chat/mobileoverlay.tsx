export default function MobileOverlay({ onClick }) {
  return (
    <div
      className="fixed inset-0 bg-black/40 z-40 lg:hidden"
      onClick={onClick}
    />
  );
}
