import { getFollowingPosts } from "@/service/posts";
import { getServerSession } from "next-auth/next";
import { NextResponse } from "next/server";
import { NextApiResponse } from "next";
import { handler as authOptions } from "@/app/api/auth/[...nextauth]/route";

export async function GET() {
  const session = await getServerSession(authOptions);

  if (!session?.user) {
    // console.log("session 없음!!!", session);
    return new Response("Authentication Error", { status: 401 });
  }
  return getFollowingPosts(session.user.name).then((data) =>
    NextResponse.json(data)
  );
}
