"use client";

import { ClientSafeProvider, signIn } from "next-auth/react";
import Button from "../Common/Button";
import GradientBorder from "../ui/GradientBorder";

type SigninProps = {
  providers: Record<string, ClientSafeProvider>;
  callbackUrl: string;
};

export default function Signin({ providers, callbackUrl }: SigninProps) {
  return (
    <>
      {Object.values(providers).map(({ name, id }) => (
        <GradientBorder key={name} radius="rounded-md">
          <Button
            colorStyle="hover-gradient"
            className="rounded-md text-base p-[0.3rem]"
            onClick={() => signIn(id, { callbackUrl })}
          >
            Sign in with {name}
          </Button>
        </GradientBorder>
      ))}
    </>
  );
}
