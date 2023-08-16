"use client";

import { fetchAPI } from "@/apis";
import { END_POINT } from "@/constants/api";
import { QUERY_KEY } from "@/constants/queryKey";
import { SearchUser } from "@/types/user";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

function useSearchUsers(keyword: string = "all") {
  return useQuery<SearchUser[]>({
    queryKey: [QUERY_KEY.SEARCH_USERS, keyword],
    queryFn: () => fetchAPI.get(END_POINT.SEARCH_USER(keyword)),
    suspense: true,
    useErrorBoundary: true,
  });
}

function useToggleFollow() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (body: {
      userId: string;
      targetId: string;
      isFollowed: boolean;
    }) => {
      return fetchAPI.put(END_POINT.FOLLOW, body);
    },
    onSuccess: () =>
      queryClient.invalidateQueries({ queryKey: [QUERY_KEY.ME] }),
  });
}

export { useSearchUsers, useToggleFollow };
