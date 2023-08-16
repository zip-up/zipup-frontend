import { ProfileUser } from "@/types/user";
import React, { Suspense } from "react";
import Avatar from "../UI/Avatar";
import FollowButton from "../UI/FollowButton";
import Spinner from "../UI/Spinner";
debugger;
type UserProfileProps = {
  user: ProfileUser;
};

export default function UserProfile({
  user: { id, image, name, posts, followers, following, username },
}: UserProfileProps) {
  const info = [
    { title: "posts", data: posts },
    { title: "following", data: following },
    { title: "followers", data: followers },
  ];

  return (
    <section className="w-full flex flex-col md:flex-row items-center justify-center py-12 border-b border-neutral-300">
      <Avatar image={image} highlight size="xl" />
      <div className="md:ml-20 basis-1/3">
        <div className="flex flex-col md:flex-row items-center">
          <h1 className="text-lg md:mr-8 my-2 md:mb-0">{name}</h1>

          <Suspense fallback={<Spinner />}>
            <FollowButton profileUserId={id} profileUserName={username} />
          </Suspense>
        </div>

        <ul className="my-4 flex gap-4">
          {info.map(({ title, data }, idx) => (
            <li key={idx}>
              <span className="font-semibold mr-1">{data}</span>
              {title}
            </li>
          ))}
        </ul>
        <p className="text-sm font-bold text-center md:text-start">{name}</p>
      </div>
    </section>
  );
}
