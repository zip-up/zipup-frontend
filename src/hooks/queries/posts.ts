"use client";

import { fetchAPI } from "@/apis";
import { END_POINT } from "@/constants/api";
import { QUERY_KEY } from "@/constants/queryKey";
import { SimplePost } from "@/types/post";
import getNewLikes from "@/utils/mutateLikes";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/navigation";

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

    onError: (err, _, context) => {
      if (context?.prevPosts) {
        queryClient.setQueryData([QUERY_KEY.POSTS], context.prevPosts);
      }
    },
  });
}

function useAddComment() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (body: { postId: string; userId: string; comment: string }) => {
      return fetchAPI.post(END_POINT.COMMENT, body);
    },
    onSuccess: () =>
      queryClient.invalidateQueries({ queryKey: [QUERY_KEY.POSTS] }),
  });
}

function useCreatePost() {
  const router = useRouter();

  return useMutation({
    mutationFn: (formData: FormData) => {
      return fetchAPI.post(END_POINT.POSTS, formData, false);
    },
    onSuccess: () => router.push("/"),
  });
}

export { useGetPosts, useLikePost, useAddComment, useCreatePost };
