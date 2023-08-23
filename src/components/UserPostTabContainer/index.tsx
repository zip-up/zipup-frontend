"use client";

import React, { Suspense, useState } from "react";
import { postTab, postTabTitle } from "@/types/postTab";
import BookmarkIcon from "../ui/icons/BookmarkIcon";
import HeartIcon from "../ui/icons/HeartIcon";
import PostIcon from "../ui/icons/PostIcon";
import ProfilePostTab from "./ProfilePostTab";
import PostGridContainer from "./PostGridContainer";
import Spinner from "../ui/Spinner";

type PostTabContainerProps = {
  username: string;
};

const tabs: postTab = [
  { type: "posts", icon: <PostIcon size="w-3 h-3" /> },
  { type: "saved", icon: <BookmarkIcon size="w-3 h-3" /> },
  { type: "liked", icon: <HeartIcon size="w-3 h-3" /> },
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
      <Suspense fallback={<Spinner />}>
        <PostGridContainer username={username} selectedTab={selectedTab} />
      </Suspense>
    </section>
  );
}
