import { withSessionUser } from "@/utils/session";
import { getPost } from "@/service/posts";
import { NextRequest, NextResponse } from "next/server";

type Context = {
  params: { id: string };
};

export async function GET(request: NextRequest, { params: { id } }: Context) {
  return withSessionUser(async () => {
    return getPost(id).then((data) => NextResponse.json(data));
  });
}
