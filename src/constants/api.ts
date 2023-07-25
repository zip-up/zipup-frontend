export const END_POINT = {
  USER: "/api/user",
  POSTS: "/api/posts",
  FULL_POST: (id: string) => `/api/posts/${id}`,
} as const;
