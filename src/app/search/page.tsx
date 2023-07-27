import Spinner from "@/components/UI/Spinner";
import UserSearch from "@/components/UserSearch";
import { Suspense } from "react";

export default async function SearchPage() {
  return (
    <Suspense fallback={<Spinner />}>
      <UserSearch />
    </Suspense>
  );
}
