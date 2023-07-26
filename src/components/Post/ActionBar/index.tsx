import BookmarkIcon from "@/components/UI/icons/BookmarkIcon";
import HeartIcon from "@/components/UI/icons/HeartIcon";
import { parseDate } from "@/utils/date";

type ActionBarProps = {
  likes: string[];
  username: string;
  createdAt: string;
  text?: string;
};

export function ActionBar({
  likes,
  username,
  createdAt,
  text,
}: ActionBarProps) {
  return (
    <>
      <div className="flex justify-between my-2 px-4">
        <HeartIcon />
        <BookmarkIcon />
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
