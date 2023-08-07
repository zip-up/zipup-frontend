import { Inter } from "next/font/google";
import { notFound } from "next/navigation";
import { getUserForProfile } from "@/service/user";
import UserProfile from "@/components/UserProfile";
import UserPostTabContainer from "@/components/UserPostTabContainer";
import { cache } from "react";

const inter = Inter({ subsets: ["latin"] });

type UserPageProps = {
  params: {
    username: string;
  };
};

const getUser = cache(async (username: string) => getUserForProfile(username));

export default async function UserPage({
  params: { username },
}: UserPageProps) {
  const user = await getUser(username);

  if (!user.id) {
    notFound();
  }

  return (
    <section className="flex flex-col items-center max-w-[935px] m-auto">
      <UserProfile user={user} />
      <UserPostTabContainer username={username} />
    </section>
  );
}

export async function generateMetaData({
  params: { username },
}: UserPageProps) {
  const user = await getUser(username);

  return {
    title: `${user?.name} (@${user?.name}) ∙ Instagram Photos`,
    description: `${user?.name}'s all Instagram posts`,
  };
}