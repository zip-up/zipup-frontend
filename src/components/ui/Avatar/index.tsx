import clsx from "clsx";
import React from "react";
import HighlightBorder from "../HighlightBorder/index";

const AVATAR_SIZE = {
  sm: "w-[30px] h-[30px] p-[0.1rem]",
  md: "w-10 h-10 p-[0.2rem]",
} as const;

type AvatarProps = {
  size?: "sm" | "md";
  image?: string | null;
  highlight?: boolean;
};

export default function Avatar({
  image = "",
  size = "sm",
  highlight = false,
}: AvatarProps) {
  function Img() {
    return (
      /* eslint-disable-next-line @next/next/no-img-element */
      <img
        src={image ?? undefined}
        alt="user profile"
        className={clsx("rounded-full bg-white", AVATAR_SIZE[size])}
        referrerPolicy="no-referrer"
      />
    );
  }

  return (
    <>
      {highlight ? (
        <HighlightBorder radius="full" width={size}>
          <Img />
        </HighlightBorder>
      ) : (
        <Img />
      )}
    </>
  );
}
