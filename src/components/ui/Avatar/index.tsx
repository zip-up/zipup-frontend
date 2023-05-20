import React from "react";
import GradientBorder from "../GradientBorder/index";

type AvatarProps = {
  image?: string | null;
};

export default function Avatar({ image = "" }: AvatarProps) {
  return (
    <GradientBorder radius="rounded-full" size="w-9 h-9">
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={image ?? undefined}
        alt="user profile"
        className="rounded-full"
        referrerPolicy="no-referrer"
      />
    </GradientBorder>
  );
}
