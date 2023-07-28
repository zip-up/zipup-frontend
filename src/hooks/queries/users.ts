"use client";

import { fetchAPI } from "@/apis";
import { END_POINT } from "@/constants/api";
import { QUERY_KEY } from "@/constants/queryKey";
import { ProfileUser } from "@/types/user";
import { useQuery } from "@tanstack/react-query";

function useSearchUsers(keyword: string) {
  return useQuery<ProfileUser[]>({
    queryKey: [QUERY_KEY.SEARCH_USERS, keyword],
    queryFn: () => fetchAPI.get(END_POINT.SEARCH_USER(keyword)),
    suspense: true,
  });
}

export { useSearchUsers };
