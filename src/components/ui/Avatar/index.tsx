import clsx from "clsx";
import React from "react";
import HighlightBorder from "../HighlightBorder";

const AVATAR_SIZE = {
  sm: "w-[30px] h-[30px] p-[0.1rem]",
  md: "w-[56px] h-[56px] p-[0.15rem]",
} as const;

type AvatarProps = {
  size?: "sm" | "md";
  image?: string | null;
  highlight?: boolean;
  borderSize?: "sm" | "md";
};

export default function Avatar({
  image = "",
  size = "sm",
  highlight = false,
  borderSize = "sm",
}: AvatarProps) {
  const Img = () => {
    return (
      /* eslint-disable-next-line @next/next/no-img-element */
      <img
        src={image ?? undefined}
        alt="user profile"
        className={clsx(
          "rounded-full bg-white object-cover",
          AVATAR_SIZE[size]
        )}
        referrerPolicy="no-referrer"
      />
    );
  };

  return (
    <>
      {highlight ? (
        <HighlightBorder radius="full" width={borderSize}>
          <Img />
        </HighlightBorder>
      ) : (
        <Img />
      )}
    </>
  );
}
