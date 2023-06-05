"use client";

import Link from "next/link";
import {
  HomeIcon,
  HomeFillIcon,
  SearchIcon,
  SearchFillIcon,
  NewIcon,
  NewFillIcon,
} from "../UI/icons";
import { usePathname } from "next/navigation";
import Button from "../Common/Button";
import { signIn, signOut, useSession } from "next-auth/react";
import HighlightBorder from "../UI/HighlightBorder";
import Avatar from "../UI/Avatar";

const navigationMenu = [
  { href: "/", icon: <HomeIcon />, clickedIcon: <HomeFillIcon /> },
  { href: "/search", icon: <SearchIcon />, clickedIcon: <SearchFillIcon /> },
  { href: "/new", icon: <NewIcon />, clickedIcon: <NewFillIcon /> },
];

export default function Header() {
  const pathname = usePathname();
  const { data: session } = useSession();

  const user = session?.user;

  return (
    <div className="flex justify-between items-center px-6">
      <Link href="/">
        <h1 className="text-2xl font-bold">Instagram</h1>
      </Link>
      <nav>
        <ul className="flex gap-4 items-center p-4">
          {navigationMenu.map(({ href, icon, clickedIcon }) => (
            <li key={href}>
              <Link href={href}>{pathname === href ? clickedIcon : icon}</Link>
            </li>
          ))}
          {user && (
            <li>
              <Link href={`/user/${user.username}`}>
                <Avatar image={user.image} highlight={true} />
              </Link>
            </li>
          )}
          <li>
            <HighlightBorder radius="md" width="md">
              {session ? (
                <Button
                  colorStyle="hover-gradient"
                  className="rounded-sm text-2xs p-[0.3rem]"
                  onClick={() => signOut()}
                >
                  Sign out
                </Button>
              ) : (
                <Button
                  colorStyle="hover-gradient"
                  className="rounded-sm text-2xs p-[0.3rem]"
                  onClick={() => signIn()}
                >
                  Sign in
                </Button>
              )}
            </HighlightBorder>
          </li>
        </ul>
      </nav>
    </div>
  );
}
