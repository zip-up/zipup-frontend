"use client";

import Button from "@/components/Common/Button";
import { useLoggedInUser } from "@/hooks/queries/following";
import { useToggleFollow } from "@/hooks/queries/users";

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

  const { mutate } = useToggleFollow();

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
            mutate({
              userId: loggedInUser.id,
              targetId: profileUserId,
              isFollowed: !!isFollowing,
            })
          }
          className={`border-none rounded-md py-2 px-8 text-white font-bold leading-4 ${FollowButtonColor}`}
        >
          {text}
        </Button>
      )}
    </>
  );
}
