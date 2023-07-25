"use client";

import { fetchAPI } from "@/apis";
import { END_POINT } from "@/constants/api";
import { QUERY_KEY } from "@/constants/queryKey";
import { FullPost } from "@/types/post";
import { useQuery } from "@tanstack/react-query";

function useFullPost(id: string) {
  return useQuery<FullPost>({
    queryKey: [QUERY_KEY.POST],
    queryFn: () => fetchAPI.get(END_POINT.FULL_POST(id)),
    suspense: true,
  });
}

export { useFullPost };
