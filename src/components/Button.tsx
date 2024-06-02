export default function Button({
  children,
  onClick,
  className,
  ...props
}: {
  children: React.ReactNode;
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
  className?: string;
} & React.ButtonHTMLAttributes<HTMLButtonElement>) {
  return (
    <button
      className={`rounded-lg bg-blue-400 text-white py-2 px-4 mt-2 ${className}`}
      onClick={onClick}
      {...props}
    >
      {children}
    </button>
  );
}
