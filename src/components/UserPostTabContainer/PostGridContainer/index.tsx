import { useUserPosts } from "@/hooks/queries/userPosts";
import { postTabTitle } from "@/types/postTab";
import PostGridCard from "../PostGridCard";

type PostGridContainerProps = {
  username: string;
  selectedTab: postTabTitle;
};

export default function PostGridContainer({
  username,
  selectedTab,
}: PostGridContainerProps) {
  const { data: posts } = useUserPosts(username, selectedTab);

  return (
    <ul className="grid grid-cols-3 gap-x-[3px] gap-y-[3px] w-full p-4">
      {posts &&
        [...posts, ...posts, ...posts, ...posts, ...posts].map((post) => (
          <li key={post.id}>
            <PostGridCard post={post} />
          </li>
        ))}
    </ul>
  );
}
