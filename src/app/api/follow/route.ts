import { withSessionUser } from "@/utils/session";
import { follow, unFollow } from "@/service/user";
import { NextRequest, NextResponse } from "next/server";

export async function PUT(request: NextRequest) {
  return withSessionUser(async () => {
    const { userId, targetId, isFollowed } = await request.json();

    if (!targetId || isFollowed === undefined) {
      return new Response("Bad Request", { status: 400 });
    }

    const query = (userId: string, targetId: string) => {
      return !isFollowed
        ? follow(userId, targetId)
        : unFollow(userId, targetId);
    };

    return query(userId, targetId).then(() => NextResponse.json(true));
  });
}
