import clsx from "clsx";

type GradintBorderProps = {
  radius?: string;
  size?: string;
  children: React.ReactNode;
};

export default function GradientBorder({
  radius = "",
  size = "",
  children,
}: GradintBorderProps) {
  return (
    <div
      className={clsx(
        "bg-gradient-to-bl from-fuchsia-600 via-rose-500 to-amber-300 p-[0.15rem]",
        radius,
        size
      )}
    >
      {children}
    </div>
  );
}
