import { RiBookmarkLine } from "react-icons/ri";

export default function BookmarkIcon({ size = "w-6 h-6" }: { size: string }) {
  return <RiBookmarkLine className={`${size}`} />;
}
