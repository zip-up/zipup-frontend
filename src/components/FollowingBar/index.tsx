"use client";

import Link from "next/link";
import { useLoggedInUser } from "../../hooks/queries/following";
import Avatar from "../UI/Avatar";


export default function FollowingBar() {
  const { data: user } = useLoggedInUser({ isUsedErrorBoundary: true });

  if (!user || user?.following.length === 0)
    return (
      <section className="w-full flex items-center justify-center pb-4">
        <span className="font-semibold">{"you don't have following."}</span>
      </section>
    );

  return (
    <div className="overflow-x-auto self-start">
      <div>
        <section className="w-full flex items-center pb-4">
          <ul className="flex gap-2">
            {user.following.map(({ image, username }) => (
              <li key={username + Math.random()} className="w-[66px]">
                <Link
                  href={`user/${username}`}
                  className="flex flex-col items-center"
                >
                  <Avatar
                    image={image}
                    highlight={true}
                    size="md"
                    borderWidth="sm"
                  />
                  <span className="block truncate w-full text-center text-2xs">
                    {username}
                  </span>
                </Link>
              </li>
            ))}
          </ul>
        </section>
      </div>
    </div>
  );
}
