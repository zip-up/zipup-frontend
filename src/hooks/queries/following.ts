"use client";

import { fetchAPI } from "@/apis";
import { END_POINT } from "@/components/constant/api";
import { QUERY_KEY } from "@/components/constant/queryKey";
import { UserInfo } from "@/types/user";
import { useQuery } from "@tanstack/react-query";

function useFollowings() {
  return useQuery<UserInfo>({
    queryKey: [QUERY_KEY.USER],
    queryFn: () => fetchAPI.get(END_POINT.USER),
    suspense: true,
  });
}

export { useFollowings };
