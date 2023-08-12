import {
  HeartIcon,
  HeartFillIcon,
  BookmarkIcon,
  BookmarkFIllIcon,
} from "@/components/UI/icons";
import ToggleButton from "@/components/UI/ToggleButton";
import { useToggle } from "@/hooks/useToggle";
import { parseDate } from "@/utils/date";

type ActionBarProps = {
  likes: string[];
  username: string;
  createdAt: string;
  text?: string;
  postId: string;
};

export function ActionBar({
  likes,
  username,
  createdAt,
  text,
  postId,
}: ActionBarProps) {
  const [liked, setLiked] = useToggle();
  const [bookmarked, setBookmarked] = useToggle();

  return (
    <>
      <div className="flex justify-between my-2 px-4">
        <ToggleButton
          isToggleOn={liked}
          onIcon={<HeartIcon />}
          offIcon={<HeartFillIcon />}
          onToggle={setLiked}
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
