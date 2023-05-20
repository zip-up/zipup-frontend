import React, { ButtonHTMLAttributes } from "react";
import clsx from "clsx";

const STYLES = {
  "hover-gradient": "bg-white hover:opacity-90 transition-opacity",
} as const;

type ButtonProps = {
  children: React.ReactNode;
  colorStyle: keyof typeof STYLES;
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
      className={clsx(STYLES[colorStyle], className)}
      onClick={onClick}
      {...props}
    >
      {children}
    </button>
  );
}
