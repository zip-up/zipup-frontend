"use client";

import Image from "next/image";
import CommentForm from "../CommentForm";
import { SimplePost } from "@/types/post";
import { ActionBar } from "../ActionBar";
import { useModal } from "@/hooks/useModal";
import PostModal from "@/components/PostModal";
import PostUserAvatar from "@/components/PostUserAvatar";
import Button from "@/components/Common/Button";

type PostListCardProps = {
  post: SimplePost;
};

export default function PostListCard({ post }: PostListCardProps) {
  const { userImage, username, image, comments } = post;

  const { isModalOpen, openModal, closeModal } = useModal();

  return (
    <>
      <article className="rounded-lg shadow-md border border-gray text-[14px]">
        <PostUserAvatar image={userImage} username={username} />
        <Image
          className="w-full object-cover aspect-square"
          src={image}
          alt={`photo by ${username}`}
          width={500}
          height={500}
          onClick={openModal}
        />
        <ActionBar post={post}>
          {comments > 1 && (
            <Button
              onClick={openModal}
              className="font-bold my-2 text-sky-500"
            >{`View all ${comments} comments.`}</Button>
          )}
        </ActionBar>
        <CommentForm postId={post.id} />
      </article>

      <PostModal isOpen={isModalOpen} onCloseModal={closeModal} post={post} />
    </>
  );
}
