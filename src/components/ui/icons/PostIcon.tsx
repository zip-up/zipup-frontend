import React from "react";
import { MdGridOn } from "react-icons/md";

export default function PostIcon({ size = "w-6 h-6" }: { size: string }) {
  return <MdGridOn className={`${size}`} />;
}
