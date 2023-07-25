import clsx from "clsx";

const BORDER_RADIUS = {
  md: "rounded-md",
  full: "rounded-full",
} as const;

const BORDER_WIDTH = {
  sm: "p-[0.1rem]",
  md: "p-[0.17rem]",
} as const;

const SIZE = {
  sm: "w-[34px] h-[34px]",
  md: "w-[60px] h-[60px]",
} as const;

type HighlightBorderProps = {
  radius?: "md" | "full";
  width?: "sm" | "md";
  children: React.ReactNode;
  size: "sm" | "md";
};

export default function HighlightBorder({
  children,
  radius = "full",
  width = "sm",
  size,
}: HighlightBorderProps) {
  return (
    <div
      className={clsx(
        "bg-gradient-to-bl from-fuchsia-600 via-rose-500 to-amber-300 flex justify-center items-center",
        BORDER_RADIUS[radius],
        BORDER_WIDTH[width],
        SIZE[size]
      )}
    >
      {children}
    </div>
  );
}
