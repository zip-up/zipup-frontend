import { createPost } from "@/service/posts";
import { getServerSession } from "next-auth/next";
import { NextResponse } from "next/server";
import { handler as authOptions } from "@/app/api/auth/[...nextauth]/route";

export async function POST(request: Request) {
  const session = await getServerSession(authOptions);

  if (!session?.user) {
    return new Response("Authentication Error", { status: 401 });
  }

  const form = await request.formData();

  const file = form.get("file") as Blob;
  const content = form.get("content")!.toString();
  const userId = form.get("userId")!.toString();

  return createPost(userId, content, file).then(() => NextResponse.json(true));
}
