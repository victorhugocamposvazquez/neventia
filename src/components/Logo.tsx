type LogoProps = {
  variant?: "dark" | "light";
  showWordmark?: boolean;
  className?: string;
};

export function Logo({
  variant = "dark",
  showWordmark = true,
  className,
}: LogoProps) {
  const ink = variant === "light" ? "#ffffff" : "#0a241b";

  return (
    <span className={`inline-flex items-center gap-2.5 ${className ?? ""}`}>
      <svg
        width="32"
        height="32"
        viewBox="0 0 32 32"
        fill="none"
        aria-hidden="true"
        className="shrink-0"
      >
        <path
          d="M27.28 11.90 A12 12 0 1 1 20.10 4.72"
          stroke={ink}
          strokeWidth="3.4"
          strokeLinecap="round"
        />
        <circle cx="24.49" cy="7.51" r="3.1" fill="#6fbf95" />
      </svg>
      {showWordmark && (
        <span
          className="text-[1.35rem] font-extrabold tracking-tight lowercase"
          style={{ color: ink }}
        >
          neventia
        </span>
      )}
    </span>
  );
}
