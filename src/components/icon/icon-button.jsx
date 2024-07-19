export default function IconButton({ children, className, style, onClick }) {
  return (
    <button
      style={style}
      className={`flex cursor-pointer items-center justify-center rounded-full p-2 hover:bg-hover ${className}`}
      onClick={onClick}
    >
      {children}
    </button>
  );
}
