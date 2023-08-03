import { ProfileUser } from "@/types/user";
import React from "react";
import Avatar from "../UI/Avatar";
import FollowButton from "../UI/FollowButton";

type UserProfileProps = {
  user: ProfileUser;
};

export default async function UserProfile({
  user: { image, name, posts, followers, following },
}: UserProfileProps) {
  const info = [
    { title: "posts", data: posts },
    { title: "following", data: following },
    { title: "followers", data: followers },
  ];

  return (
    <section>
      <Avatar image={image} highlight />
      <div>
        <h1>{name}</h1>
        <FollowButton username={name} />
        <ul>
          {info.map(({ title, data }, idx) => (
            <li key={idx}>
              <span>{data}</span>
              {title}
            </li>
          ))}
        </ul>
        <p>{name}</p>
      </div>
    </section>
  );
}
