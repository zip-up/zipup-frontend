import { SimplePost } from "@/types/post";
import { Suspense } from "react";
import { Modal } from "../Common/Modal";
import { PostDetail } from "../PostDetail";
import Spinner from "../UI/Spinner";

type PostModalProps = {
  isOpen: boolean;
  onCloseModal: () => void;
  post: SimplePost;
};

export default function PostModal({ post, ...modalProps }: PostModalProps) {
  return (
    <Modal {...modalProps}>
      <Suspense fallback={<Spinner />}>
        <PostDetail post={post} />
      </Suspense>
    </Modal>
  );
}
