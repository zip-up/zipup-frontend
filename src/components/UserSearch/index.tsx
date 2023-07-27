"use client";

import React, { useState } from "react";
import { useSearchUsers } from "@/hooks/queries/users";
import UserCard from "@/components/UserCard";

export default function UserSearch() {
  const [keyword, setKeyword] = useState("");

  const { data: userList } = useSearchUsers(keyword);

  const onSubmitForm = (e: React.FormEvent) => {
    e.preventDefault();
  };

  return (
    <section className="w-full max-w-2xl my-4 flex flex-col items-center mx-auto">
      <form className="w-full mb-4" onSubmit={onSubmitForm}>
        <input
          type="text"
          className="w-full text-md p-3 outline-none border border-gray-400"
          value={keyword}
          autoFocus
          placeholder="Search for a username or name"
          onChange={(e) => setKeyword(e.target.value)}
        />
      </form>
      {userList?.length === 0 && <p>찾는 사용자가 없음 😭</p>}
      <ul className="w-full p-4">
        {userList?.map((user) => (
          <li key={user.username}>
            <UserCard user={user} />
          </li>
        ))}
      </ul>
    </section>
  );
}
