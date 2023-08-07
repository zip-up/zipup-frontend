import Spinner from "@/components/UI/Spinner";
import UserSearch from "@/components/UserSearch";
import { Suspense } from "react";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "User Search",
  description: "Search users to follow",
};

export default async function SearchPage() {
  return (
    <Suspense fallback={<Spinner />}>
      <UserSearch />
    </Suspense>
  );
}
