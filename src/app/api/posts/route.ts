import { withSessionUser } from "@/utils/session";
import { createPost, getFollowingPosts } from "@/service/posts";
import { NextResponse } from "next/server";

export async function GET() {
  return withSessionUser(async (user) =>
    getFollowingPosts(user.name).then((data) => NextResponse.json(data))
  );
}

export async function POST(request: Request) {
  return withSessionUser(async () => {
    const form = await request.formData();

    const file = form.get("file") as Blob;
    const content = form.get("content")!.toString();
    const userId = form.get("userId")!.toString();

    return createPost(userId, content, file).then(() =>
      NextResponse.json(true)
    );
  });
}