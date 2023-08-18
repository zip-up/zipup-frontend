"use client";

import Button from "@/components/Common/Button";
import { useLoggedInUser } from "@/hooks/queries/following";
import { useToggleFollow } from "@/hooks/queries/users";
import { useRouter } from "next/navigation";
import Spinner from "../Spinner";

type FollowingButtonProps = {
  profileUserId: string;
  profileUserName: string;
};

export default function FollowButton({
  profileUserId,
  profileUserName,
}: FollowingButtonProps) {
  const { data: loggedInUser, isError } = useLoggedInUser({
    isUsedErrorBoundary: false,
  });

  const { refresh } = useRouter();

  const { mutate: toggleFollow, isLoading: isToggleLoading } =
    useToggleFollow(refresh);

  const canShowFollowingButton =
    loggedInUser && loggedInUser.name !== profileUserName;

  const isFollowing = loggedInUser?.following.find(
    (following) => following.username == profileUserName
  );

  const text = isFollowing ? "Unfollow" : "Follow";

  const FollowButtonColor = isFollowing ? "bg-red-500" : "bg-sky-500";

  if (isError) {
    return null;
  }

  return (
    <>
      {canShowFollowingButton && (
        <Button
          onClick={() =>
            toggleFollow({
              userId: loggedInUser.id,
              targetId: profileUserId,
              isFollowed: !!isFollowing,
            })
          }
          className={`w-[127px] h-[40px] border-none rounded-md text-white text-xs font-bold leading-4 ${FollowButtonColor}`}
        >
          {isToggleLoading ? <Spinner size="15" /> : text}
        </Button>
      )}
    </>
  );
}
