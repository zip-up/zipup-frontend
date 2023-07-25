import { Inter } from "next/font/google";
import { getServerSession } from "next-auth/next";
import FollowingBar from "@/components/FollowingBar";
import PostList from "@/components/Post/PostList";
import SideBar from "@/components/SideBar";
import { redirect } from "next/navigation";
import { Suspense } from "react";
import Spinner from "../components/UI/Spinner";
import { handler as authOptions } from "@/app/api/auth/[...nextauth]/route";
import { ErrorBoundary } from "react-error-boundary";

const inter = Inter({ subsets: ["latin"] });

export default async function HomePage() {
  const session = await getServerSession(authOptions);

  if (!session) {
    redirect("/auth/signin");
  }

  return (
    <section className="max-w-6xl flex justify-evenly mx-auto p-4">
      <div className="w-full basis-3/4 max-w-[630px] self-baseline">
        <ErrorBoundary fallback={<div>error낫ㅇ므</div>}>
          <Suspense fallback={<Spinner />}>
            <FollowingBar />
          </Suspense>
          <Suspense fallback={<Spinner size="40" />}>
            <PostList />
          </Suspense>
        </ErrorBoundary>
      </div>
      <div className="hidden w-full basis-1/4 lg:block">
        <SideBar user={session.user} />
      </div>
    </section>
  );
}
