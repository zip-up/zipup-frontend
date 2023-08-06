import { getLikedPosts, getSavedPosts, getUserPosts } from "@/service/posts";
import { postTabTitle } from "@/types/postTab";
import { NextRequest, NextResponse } from "next/server";

type Context = {
  params: {
    slug: [string, postTabTitle];
  };
};

export async function GET(_: NextRequest, { params: { slug } }: Context) {
  if (!Array.isArray(slug) || slug.length < 2) {
    return new Response("Bad Request", { status: 400 });
  }

  const [username, category] = slug;

  return queryByCategoryMap[category](username).then((posts) =>
    NextResponse.json(posts)
  );
}

const queryByCategoryMap = {
  posts: getUserPosts,
  liked: getLikedPosts,
  saved: getSavedPosts,
} as const;
