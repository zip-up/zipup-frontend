"use client";

import { fetchAPI } from "@/apis";
import { END_POINT } from "@/constants/api";
import { QUERY_KEY } from "@/constants/queryKey";
import { SimplePost } from "@/types/post";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

function useGetPosts() {
  return useQuery<SimplePost[]>({
    queryKey: [QUERY_KEY.POSTS],
    queryFn: () => fetchAPI.get(END_POINT.POSTS),
    suspense: true,
  });
}

function useLikePost(body: any, successCallback: () => void) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: () => fetchAPI.put(END_POINT.LIKE, body),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [QUERY_KEY.POSTS] });
      successCallback();
    },
  });
}

export { useGetPosts, useLikePost };
