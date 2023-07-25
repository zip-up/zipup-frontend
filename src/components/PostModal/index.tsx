import { SimplePost } from "@/types/post";
import { Modal } from "../Common/Modal";
import { PostDetail } from "../PostDetail";

type PostModalProps = {
  isOpen: boolean;
  onCloseModal: () => void;
  post: SimplePost;
};

export default function PostModal({ post, ...modalProps }: PostModalProps) {
  return (
    <Modal {...modalProps}>
      {/* <Modal.Header></Modal.Header> */}
      <PostDetail post={post} />
    </Modal>
  );
}
