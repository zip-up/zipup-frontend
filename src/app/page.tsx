import { Inter } from "next/font/google";
import { getServerSession } from "next-auth/next";
import { GET as authOptions } from "./api/auth/[...nextauth]/route";
import FollowingBar from "@/components/FollowingBar";
import PostList from "@/components/PostList";
import SideBar from "@/components/SideBar";
import { redirect } from "next/navigation";

const inter = Inter({ subsets: ["latin"] });

export default async function HomePage() {
  const session = await getServerSession(authOptions);

  if (!session) redirect("/auth/signin");

  return (
    <section className="w-full flex flex-col md:flex-row p-4">
      <div className="w-full basis-3/4">
        <FollowingBar />
        <PostList />
      </div>
      <div className="basis-1/4">
        <SideBar
          user={{ ...session.user, username: session.user.email.split("@")[0] }}
        />
      </div>
    </section>
  );
}
