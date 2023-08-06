"use client";

import { fetchAPI } from "@/apis";
import { END_POINT } from "@/constants/api";
import { QUERY_KEY } from "@/constants/queryKey";
import { SimplePost } from "@/types/post";
import { useQuery } from "@tanstack/react-query";

function useUserPosts(username: string, category: string) {
  return useQuery<SimplePost[]>({
    queryKey: [QUERY_KEY.POSTS, username, category],
    queryFn: () => fetchAPI.get(END_POINT.USER_POSTS(username, category)),
    suspense: true,
  });
}

export { useUserPosts };
