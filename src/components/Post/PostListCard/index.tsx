"use client";

import Avatar from "../../UI/Avatar/index";
import Image from "next/image";
import CommentForm from "../CommentForm";
import { SimplePost } from "@/types/post";
import { ActionBar } from "../ActionBar";
import { useModal } from "@/hooks/useModal";
import PostModal from "@/components/PostModal";

type PostListCardProps = {
  post: SimplePost;
};

export default function PostListCard({ post }: PostListCardProps) {
  const { userImage, username, image, createdAt, likes, text } = post;

  const { isModalOpen, openModal, closeModal } = useModal();

  return (
    <>
      <article className="rounded-lg shadow-md border border-gray">
        <div className="flex items-center p-2">
          <Avatar image={userImage} highlight />
          <span className="text-gray-900 font-bold ml-2">{username}</span>
        </div>
        <Image
          className="w-full object-cover aspect-square"
          src={image}
          alt={`photo by ${username}`}
          width={500}
          height={500}
          onClick={openModal}
        />
        <ActionBar
          username={username}
          createdAt={createdAt}
          likes={likes}
          text={text}
        />
        <CommentForm />
      </article>

      <PostModal isOpen={isModalOpen} onCloseModal={closeModal} post={post} />
    </>
  );
}
