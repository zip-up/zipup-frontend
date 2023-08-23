import { useAddComment } from "@/hooks/queries/posts";
import { useSession } from "next-auth/react";
import { useState } from "react";
import Button from "../../Common/Button";
import SmileIcon from "../../ui/icons/SmileIcon";

type CommentFormProps = {
  postId: string;
};

export default function CommentForm({ postId }: CommentFormProps) {
  const user = useSession().data?.user;
  const userId = user?.id || "";

  const [comment, setComment] = useState("");

  const { mutate } = useAddComment();

  const onHandleSubmitComment = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    mutate({
      userId,
      postId,
      comment,
    });
  };

  return (
    <form
      className="flex items-center border-t border-neutral-300 p-3"
      onSubmit={onHandleSubmitComment}
    >
      <SmileIcon />
      <input
        type="text"
        value={comment}
        placeholder="Add a comment..."
        className="w-full ml-2 border-none outline-none p-3"
        onChange={(e) => setComment(e.target.value)}
      />
      <Button
        className={`font-bold text-sky-500 ml-2 ${
          !comment ? "text-sky-300" : "text-sky-500"
        }`}
        disabled={!comment}
      >
        Post
      </Button>
    </form>
  );
}
