"use client";

import { usePosts } from "@/hooks/queries/posts";
import PostListCard from "../PostListCard";

export default function PostList() {
  const { data: posts, isError } = usePosts();

  if (isError) return <div>Error....</div>;

  return (
    <ul>
      {posts?.map((post) => (
        <li key={post.id} className="mb-4">
          <PostListCard post={post} />
        </li>
      ))}
    </ul>
  );
}
