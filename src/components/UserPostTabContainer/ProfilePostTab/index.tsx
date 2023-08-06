"use client";

import { postTab, postTabTitle } from "@/types/postTab";

type ProfilePostTabProps = {
  tabs: postTab;
  selectedTab: postTabTitle;
  onSelectTab: (selectedTab: postTabTitle) => void;
};

export default function ProfilePostTab({
  tabs,
  selectedTab,
  onSelectTab,
}: ProfilePostTabProps) {
  return (
    <section>
      <ul className="flex justify-center uppercase">
        {tabs.map(({ type, icon }) => (
          <li
            className={`cursor-pointer text-xs mx-12 p-4 border-black ${
              type === selectedTab && "font-bold border-t"
            }`}
            key={type}
            onClick={() => onSelectTab(type)}
          >
            <button className="w-[14px]">{icon}</button>
            <span className="hidden md:inline">{type}</span>
          </li>
        ))}
      </ul>
    </section>
  );
}
