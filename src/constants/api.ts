export const END_POINT = {
  ME: "/api/me",
  POSTS: "/api/posts",
  FULL_POST: (id: string) => `/api/posts/${id}`,
  SEARCH_USER: (keyword: string) => `/api/search/${keyword}`,
  USER_POSTS: (username: string, category: string) =>
    `/api/user/${username}/${category}`,
  LIKE: "/api/likes",
  COMMENT: "/api/comments",
  FOLLOW: "/api/follow",
} as const;
