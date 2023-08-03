import { Inter } from "next/font/google";
import { notFound } from "next/navigation";
import { getUserForProfile } from "@/service/user";
import UserProfile from "@/components/UserProfile";

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

  return <UserProfile user={user} />;
}
