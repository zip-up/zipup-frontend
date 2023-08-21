import { withSessionUser } from "@/utils/session";
import { getUserInfoByUsername } from "@/service/user";
import { NextResponse } from "next/server";

export async function GET() {
  return withSessionUser(async (user) =>
    getUserInfoByUsername(user.name).then((userInfo) =>
      NextResponse.json(userInfo)
    )
  );
}
