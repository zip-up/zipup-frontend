import Avatar from "../ui/Avatar";

type PostUserAvatarProps = {
  image: string;
  username: string;
};

export default function PostUserAvatar({
  image,
  username,
}: PostUserAvatarProps) {
  return (
    <div className="flex items-center p-2">
      <Avatar image={image} highlight />
      <span className="text-gray-900 font-bold ml-2">{username}</span>
    </div>
  );
}
