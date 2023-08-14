import { disLikePost, likePost } from "@/service/posts";
import { getServerSession } from "next-auth/next";
import { NextRequest, NextResponse } from "next/server";
import { GET as authOptions } from "../auth/[...nextauth]/route";

export async function PUT(request: NextRequest) {
  const session = await getServerSession(authOptions);

  if (!session?.user) {
    return new Response("Authentication Error", { status: 401 });
  }

  const { userId, postId, like } = await request.json();

  if (!postId || like === undefined) {
    return new Response("Bad Request", { status: 400 });
  }

  const query = (userId: string, postId: string) => {
    return !like ? likePost(userId, postId) : disLikePost(userId, postId);
  };

  return query(userId, postId).then(() => NextResponse.json(true));
}
