import { getProviders } from "next-auth/react";
import Signin from "@/components/Signin";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import { handler as authOptions } from "@/app/api/auth/[...nextauth]/route";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Signin",
  description: "Signup or Login to Instagram",
};

type SignInPageProps = {
  searchParams: { callbackUrl: string };
};

export default async function SignInPage({
  searchParams: { callbackUrl },
}: SignInPageProps) {
  const session = await getServerSession(authOptions);

  if (session) {
    redirect("/");
  }
  const providers = (await getProviders()) ?? {};
console.log("parent", providers);
  return (
    <section className="flex justify-center mt-[30%]">
      <Signin providers={providers} callbackUrl={callbackUrl ?? "/"} />
    </section>
  );
}
