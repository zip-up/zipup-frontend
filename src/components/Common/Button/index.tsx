import React, { ButtonHTMLAttributes } from "react";
import clsx from "clsx";

const COLOR_STYLE = {
  "hover-gradient": "bg-white hover:opacity-90 transition-opacity",
} as const;

type ButtonProps = {
  children: React.ReactNode;
  colorStyle: keyof typeof COLOR_STYLE;
  className?: string;
  onClick?: () => void;
} & ButtonHTMLAttributes<HTMLButtonElement>;

export default function Button({
  children,
  colorStyle,
  className,
  onClick,
  ...props
}: ButtonProps) {
  return (
    <button
      className={clsx(COLOR_STYLE[colorStyle], className)}
      onClick={onClick}
      {...props}
    >
      {children}
    </button>
  );
}
