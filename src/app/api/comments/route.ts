import { addComment } from "@/service/posts";
import { getServerSession } from "next-auth/next";
import { NextRequest, NextResponse } from "next/server";
import { GET as authOptions } from "../auth/[...nextauth]/route";

export async function POST(request: NextRequest) {
  const session = await getServerSession(authOptions);

  if (!session?.user) {
    return new Response("Authentication Error", { status: 401 });
  }

  const { userId, postId, comment } = await request.json();

  if (!postId || !comment) {
    return new Response("Bad Request", { status: 400 });
  }

  return addComment(userId, postId, comment).then(() =>
    NextResponse.json(true)
  );
}
