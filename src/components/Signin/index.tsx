"use client";

import { ClientSafeProvider, signIn } from "next-auth/react";
import Button from "../Common/Button";
import HighlightBorder from "../UI/HighlightBorder";

type SigninProps = {
  providers: Record<string, ClientSafeProvider>;
  callbackUrl: string;
};

export default function Signin({ providers, callbackUrl }: SigninProps) {
  return (
    <>
      {Object.values(providers).map(({ name, id }) => (
        <HighlightBorder key={name} radius="md" width="md" size="md">
          <Button
            colorStyle="hover-gradient"
            className="rounded-md text-base p-[0.3rem]"
            onClick={() => signIn(id, { callbackUrl })}
          >
            Sign in with {name}
          </Button>
        </HighlightBorder>
      ))}
    </>
  );
}
