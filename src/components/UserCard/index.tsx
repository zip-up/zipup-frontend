import { SearchUser } from "@/types/user";
import Link from "next/link";
import React from "react";
import Avatar from "../UI/Avatar";

type UserCardProps = {
  user: SearchUser;
};

export default function UserCard({
  user: { name, username, image, following, followers },
}: UserCardProps) {
  return (
    <Link
      href={`/user/${username}`}
      className="flex items-center w-full rounded-sm border border-neutral-30 mb-2 p-4 bg-white hover:bg-neutral-50"
    >
      <Avatar image={image} size="md" />
      <div className="text-neutral-500 ml-3">
        <p className="text-black font-bold leading-4">{username}</p>
        <p className="text-sm">{name}</p>
        <p className="text-xs leading-4">{`${followers} followers ${following} followings`}</p>
      </div>
    </Link>
  );
}
