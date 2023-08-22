import { RiBookMarkFill } from "react-icons/ri";

export default function BookmarkFillIcon({
  size = "w-6 h-6",
}: {
  size?: string;
}) {
  return <RiBookMarkFill className={`${size} fill-slate-950`} />;
}
