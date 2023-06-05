import { Inter } from "next/font/google";
import { getServerSession } from "next-auth/next";
import { GET as authOptions } from "./api/auth/[...nextauth]/route";
import FollowingBar from "@/components/FollowingBar";
import PostList from "@/components/PostList";
import SideBar from "@/components/SideBar";
import { redirect } from "next/navigation";
import { Suspense } from "react";
import Spinner from "../components/UI/Spinner";

const inter = Inter({ subsets: ["latin"] });

export default async function HomePage() {
  const session = await getServerSession(authOptions);

  if (!session) redirect("/auth/signin");

  return (
    <section className="max-w-6xl flex justify-evenly mx-auto p-4">
      <div className="w-full basis-3/4 max-w-[630px] self-baseline">
        <Suspense fallback={<Spinner />}>
          <FollowingBar />
        </Suspense>
        <PostList />
      </div>
      <div className="hidden w-full basis-1/4 lg:block">
        <SideBar
          user={{ ...session.user, username: session.user.email.split("@")[0] }}
        />
      </div>
    </section>
  );
}
