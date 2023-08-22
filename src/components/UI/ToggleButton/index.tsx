"use client";

import React from "react";

type ToggleButtonProps = {
  isToggleOn: boolean;
  onToggle: () => void;
  onIcon: React.ReactNode;
  offIcon: React.ReactNode;
};

export default function ToggleButton({
  isToggleOn,
  onToggle,
  onIcon: icon,
  offIcon: fillIcon,
}: ToggleButtonProps) {
  return <button onClick={onToggle}>{isToggleOn ? fillIcon : icon}</button>;
}
