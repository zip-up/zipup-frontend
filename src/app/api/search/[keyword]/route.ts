import { searchUsers } from "@/service/user";
import { NextRequest, NextResponse } from "next/server";

export const dynamic = "force-dynamic";

type Context = {
  params: { keyword: string };
};

export async function GET(request: NextRequest, context: Context) {
  return searchUsers(context.params.keyword).then((data) =>
    NextResponse.json(data)
  );
}
