import { useFullPost } from "@/hooks/queries/fullPost";
import { SimplePost } from "@/types/post";

type PostDetailProps = {
  post: SimplePost;
}

export function PostDetail({ post: { id } }: PostDetailProps) {
  const { data: detail } = useFullPost(id);
  console.log(detail);
  return <></>;
}
