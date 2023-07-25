import { getUserInfoByUsername } from "@/service/user";
import { getServerSession } from "next-auth/next";
import { NextResponse } from "next/server";
import { GET as authOptions } from "../auth/[...nextauth]/route";

export async function GET() {
  const session = await getServerSession(authOptions);

  if (!session?.user) {
    //return new Response("Authentication Error", { status: 401 });
    //throw new Error("세션 없음 에러임!!!!!1");

    return Promise.resolve("test");
  }
  return getUserInfoByUsername(session.user.name).then((userInfo) =>
    NextResponse.json(userInfo)
  );
}
