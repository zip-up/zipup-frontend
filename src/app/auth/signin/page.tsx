import { getProviders } from "next-auth/react";
import { getServerSession } from "next-auth/next";
import { GET as authOptions } from "../../api/auth/[...nextauth]/route";
import { redirect } from "next/navigation";
import Signin from "@/components/Signin";

type SignInPageProps = {
  searchParams: { callbackUrl: string };
};

export default async function SignInPage({
  searchParams: { callbackUrl },
}: SignInPageProps) {
  const session = await getServerSession(authOptions);

  if (session) redirect("/");

  const providers = (await getProviders()) ?? {};

  return (
    <section className="flex justify-center mt-[30%]">
      <Signin providers={providers} callbackUrl={callbackUrl ?? "/"} />
    </section>
  );
}
