import { Inter } from "next/font/google";
import { getServerSession } from "next-auth/next";
import FollowingBar from "@/components/FollowingBar";
import PostList from "@/components/Post/PostList";
import SideBar from "@/components/SideBar";
import { redirect } from "next/navigation";
import { Suspense } from "react";
import Spinner from "../components/ui/Spinner";
import { handler as authOptions } from "@/app/api/auth/[...nextauth]/route";
import { ErrorBoundary } from "react-error-boundary";

const inter = Inter({ subsets: ["latin"] });

export default async function HomePage() {
  const session = await getServerSession(authOptions);

  if (!session) {
    redirect("/auth/signin");
  }

  return (
    <section className="flex justify-center mx-auto pt-10">
      <div className="flex flex-col items-center w-[630px] self-baseline">
        <ErrorBoundary fallback={<div>error</div>}>
          <Suspense fallback={<Spinner />}>
            <FollowingBar />
          </Suspense>
          <Suspense fallback={<Spinner size="40" />}>
            <PostList />
          </Suspense>
        </ErrorBoundary>
      </div>
      <div className="w-[329px] max-lg:hidden ml-2">
        <SideBar user={session.user} />
      </div>
    </section>
  );
}
