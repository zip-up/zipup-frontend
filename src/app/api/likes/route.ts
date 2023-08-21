import { disLikePost, likePost } from "@/service/posts";
import { withSessionUser } from "@/utils/session";
import { NextRequest, NextResponse } from "next/server";

export async function PUT(request: NextRequest) {
  return withSessionUser(async () => {
    const { userId, postId, like } = await request.json();

    if (!postId || like === undefined) {
      return new Response("Bad Request", { status: 400 });
    }

    const query = (userId: string, postId: string) => {
      return !like ? likePost(userId, postId) : disLikePost(userId, postId);
    };

    return query(userId, postId).then(() => NextResponse.json(true));
  });
}
