import Spinner from "@/components/ui/Spinner";
import UserSearch from "@/components/UserSearch";
import { Suspense } from "react";
import { Metadata } from "next";
import { ErrorBoundary } from "react-error-boundary";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "User Search",
  description: "Search users to follow",
};

export default async function SearchPage() {
  return (
    <ErrorBoundary fallback={<>err</>}>
      <Suspense fallback={<Spinner />}>
        <UserSearch />
      </Suspense>
    </ErrorBoundary>
  );
}
