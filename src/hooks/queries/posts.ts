"use client";

import { fetchAPI } from "@/apis";
import { END_POINT } from "@/constants/api";
import { QUERY_KEY } from "@/constants/queryKey";
import { SimplePost } from "@/types/post";
import { useQuery } from "@tanstack/react-query";

function usePosts() {
  return useQuery<SimplePost[]>({
    queryKey: [QUERY_KEY.POSTS],
    queryFn: () => fetchAPI.get(END_POINT.POSTS),
    suspense: true,
  });
}

export { usePosts };
