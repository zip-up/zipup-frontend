import { Inter } from "next/font/google";
import { notFound } from "next/navigation";
import { getUserForProfile } from "@/service/user";
import UserProfile from "@/components/UserProfile";
import UserPostTabContainer from "@/components/UserPostTabContainer";

const inter = Inter({ subsets: ["latin"] });

type UserPageProps = {
  params: {
    username: string;
  };
};

export default async function UserPage({
  params: { username },
}: UserPageProps) {
  const user = await getUserForProfile(username);

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
