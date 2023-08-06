import { SimplePost } from "@/types/post";
import Image from "next/image";

type PostGridCardProps = {
  post: SimplePost;
};

export default function PostGridCard({ post: { image } }: PostGridCardProps) {
  return (
    <div className="relative w-full aspect-square">
      <Image
        src={image}
        alt="post image"
        fill
        sizes="650px"
        className="object-cover"
      />
    </div>
  );
}
