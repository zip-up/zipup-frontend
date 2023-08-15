"use client";

import { useGetPosts } from "@/hooks/queries/posts";
import PostListCard from "../PostListCard";

export default function PostList() {
  const { data: posts, isError } = useGetPosts();

  if (isError) return <div>Error....</div>;

  return (
    <ul className="pt-3">
      {posts?.map((post) => (
        <li key={post.id} className="mb-4 w-[480px]">
          <PostListCard post={post} />
        </li>
      ))}
    </ul>
  );
}