"use client";

import React, { useState } from "react";
import { postTab, postTabTitle } from "@/types/postTab";
import BookmarkIcon from "../UI/icons/BookmarkIcon";
import HeartIcon from "../UI/icons/HeartIcon";
import PostIcon from "../UI/icons/PostIcon";
import ProfilePostTab from "./ProfilePostTab";
import PostGridContainer from "./PostGridContainer";

type PostTabContainerProps = {
  username: string;
};

const tabs: postTab = [
  { type: "posts", icon: <PostIcon /> },
  { type: "saved", icon: <BookmarkIcon /> },
  { type: "liked", icon: <HeartIcon /> },
];

export default function PostTabContainer({ username }: PostTabContainerProps) {
  const [selectedTab, setSelectedTab] = useState<postTabTitle>(tabs[0].type);

  return (
    <section className="flex flex-col items-center">
      <ProfilePostTab
        tabs={tabs}
        selectedTab={selectedTab}
        onSelectTab={(selectedTab: postTabTitle) => setSelectedTab(selectedTab)}
      />
      <PostGridContainer username={username} selectedTab={selectedTab} />
    </section>
  );
}
