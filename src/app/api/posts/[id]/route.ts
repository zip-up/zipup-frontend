import { getPost } from "@/service/posts";
import { getServerSession } from "next-auth/next";
import { NextRequest, NextResponse } from "next/server";
import { handler as authOptions } from "@/app/api/auth/[...nextauth]/route";

type Context = {
  params: { id: string };
};

export async function GET(request: NextRequest, { params: { id } }: Context) {
  const session = await getServerSession(authOptions);

  if (!session?.user) {
    return new Response("Authentication Error", { status: 401 });
  }

  return getPost(id).then((data) => NextResponse.json(data));
}
