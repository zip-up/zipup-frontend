import {
  HeartIcon,
  HeartFillIcon,
  BookmarkIcon,
  BookmarkFIllIcon,
} from "@/components/UI/icons";
import ToggleButton from "@/components/UI/ToggleButton";
import { useLikePost } from "@/hooks/queries/posts";
import { useToggle } from "@/hooks/useToggle";
import { SimplePost } from "@/types/post";
import { parseDate } from "@/utils/date";
import { useSession } from "next-auth/react";

type ActionBarProps = {
  post: SimplePost;
};

export function ActionBar({
  post: { id, likes, text, username, createdAt },
}: ActionBarProps) {
  const user = useSession().data?.user;
  const userId = user?.id;

  const [liked, setLiked] = useToggle(likes.includes(user?.name || ""));
  const [bookmarked, setBookmarked] = useToggle();

  const { mutate } = useLikePost(
    {
      userId,
      postId: id,
      like: liked,
    },
    setLiked
  );

  const onHandleLike = () => {
    mutate();
  };

  return (
    <>
      <div className="flex justify-between my-2 px-4">
        <ToggleButton
          isToggleOn={liked}
          onIcon={<HeartIcon />}
          offIcon={<HeartFillIcon />}
          onToggle={onHandleLike}
        />
        <ToggleButton
          isToggleOn={bookmarked}
          onIcon={<BookmarkIcon />}
          offIcon={<BookmarkFIllIcon />}
          onToggle={setBookmarked}
        />
      </div>
      <div className="px-4 py-1">
        <p className="font-bold mb-2">
          {likes?.length ?? 0} {likes?.length > 1 ? `likes` : `like`}
        </p>
        {text && (
          <p>
            <span className="font-bold mr-1">{username}</span>
            {text}
          </p>
        )}
        <p className="text-neutral-500 uppercase my-2">
          {parseDate(createdAt)}
        </p>
      </div>
    </>
  );
}
