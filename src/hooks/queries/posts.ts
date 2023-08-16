"use client";

import { fetchAPI } from "@/apis";
import { END_POINT } from "@/constants/api";
import { QUERY_KEY } from "@/constants/queryKey";
import { SimplePost } from "@/types/post";
import getNewLikes from "@/utils/mutateLikes";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

function useGetPosts() {
  return useQuery<SimplePost[]>({
    queryKey: [QUERY_KEY.POSTS],
    queryFn: () => fetchAPI.get(END_POINT.POSTS),
    suspense: true,
  });
}

function useLikePost(body: any) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: () => fetchAPI.put(END_POINT.LIKE, body),
    onMutate: () => {
      const prevPosts = queryClient.getQueryData<SimplePost[]>([
        QUERY_KEY.POSTS,
      ]);

      if (!prevPosts) return null;

      queryClient.setQueryData(
        [QUERY_KEY.POSTS],
        prevPosts.map((post) => {
          return post.id === body.postId
            ? {
                ...post,
                likes: getNewLikes(body.like, post.likes, body.username),
              }
            : post;
        })
      );

      return { prevPosts };
    },
    // onSettled(data, error, variables, context) {
    //   queryClient.invalidateQueries({ queryKey: [QUERY_KEY.POSTS] });
    // },
    onError: (err, _, context) => {
      if (context?.prevPosts) {
        queryClient.setQueryData([QUERY_KEY.POSTS], context.prevPosts);
      }
    },
  });
}

export { useGetPosts, useLikePost };
