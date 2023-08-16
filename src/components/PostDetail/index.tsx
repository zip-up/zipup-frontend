import { useFullPost } from "@/hooks/queries/fullPost";
import { SimplePost } from "@/types/post";
import Image from "next/image";
import { ActionBar } from "../Post/ActionBar";
import CommentForm from "../Post/CommentForm";
import PostUserAvatar from "../PostUserAvatar";
import Avatar from "../UI/Avatar";

type PostDetailProps = {
  post: SimplePost;
};

export function PostDetail({ post }: PostDetailProps) {
  const { id, username, image } = post;
  const { data: detail } = useFullPost(id);

  return (
    <section className="flex w-full h-full">
      <div className="relative w-full">
        <Image
          className="object-cover"
          src={image}
          alt={`photo by ${username}`}
          fill
        />
      </div>
      <div className="flex flex-col">
        <PostUserAvatar image={image} username={username} />
        <ul className="border-t border-gray-200 h-full overflow-y-auto p-4 mb-1">
          {detail?.comments?.map(
            ({ image, username: commentUsername, comment }, idx) => (
              <li key={idx} className="flex items-center mb-1">
                <Avatar image={image} />
                <div className="ml-2">
                  <span className="font-bold mr-1">{commentUsername}</span>
                  <span>{comment}</span>
                </div>
              </li>
            )
          )}
        </ul>
        <ActionBar post={post} />
        <CommentForm postId={post.id} />
      </div>
    </section>
  );
}
