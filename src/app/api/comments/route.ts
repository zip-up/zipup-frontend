import { withSessionUser } from "@/utils/session";
import { addComment } from "@/service/posts";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  return withSessionUser(async () => {
    const { userId, postId, comment } = await request.json();

    if (!postId || !comment) {
      return new Response("Bad Request", { status: 400 });
    }

    return addComment(userId, postId, comment).then(() =>
      NextResponse.json(true)
    );
  });
}
