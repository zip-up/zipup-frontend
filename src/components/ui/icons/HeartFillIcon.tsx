import { AiFillHeart } from "react-icons/ai";

export default function HeartFillIcon({ size = "w-6 h-6" }: { size?: string }) {
  return <AiFillHeart className={`${size} fill-red-500`} />;
}
