import { follow, unFollow } from "@/service/user";
import { getServerSession } from "next-auth/next";
import { NextRequest, NextResponse } from "next/server";
import { GET as authOptions } from "../auth/[...nextauth]/route";

export async function PUT(request: NextRequest) {
  const session = await getServerSession(authOptions);

  if (!session?.user) {
    return new Response("Authentication Error", { status: 401 });
  }

  const { userId, targetId, isFollowed } = await request.json();

  if (!targetId || isFollowed === undefined) {
    return new Response("Bad Request", { status: 400 });
  }

  const query = (userId: string, targetId: string) => {
    return !isFollowed ? follow(userId, targetId) : unFollow(userId, targetId);
  };

  return query(userId, targetId).then(() => NextResponse.json(true));
}
