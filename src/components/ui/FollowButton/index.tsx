"use client";

import Button from "@/components/Common/Button";
import { useLoggedInUser } from "@/hooks/queries/following";

type FollowingButtonProps = {
  username: string;
};

export default function FollowButton({ username }: FollowingButtonProps) {
  const {
    data: loggedInUser,
    isError,
    error,
  } = useLoggedInUser({ isUsedErrorBoundary: false });
  console.log(isError, error);
  const canShowFollowingButton = loggedInUser && loggedInUser.name !== username;
  console.log(loggedInUser, username, canShowFollowingButton);
  const isFollowing = loggedInUser?.following.find(
    (following) => following.username === username
  );

  const text = isFollowing ? "Unfollow" : "Follow";

  const FollowButtonColor = isFollowing ? "bg-red-500" : "bg-sky-500";
  if (isError) console.error(error);
  return (
    <>
      {canShowFollowingButton && (
        <Button
          className={`border-none rounded-md py-2 px-8 text-white font-bold leading-4 ${FollowButtonColor}`}
        >
          {text}
        </Button>
      )}
    </>
  );
}
