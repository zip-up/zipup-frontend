import { AiOutlineHeart } from "react-icons/ai";

export default function HeartIcon({ size = "w-6 h-6" }: { size: string }) {
  return <AiOutlineHeart className={`${size}`} />;
}
