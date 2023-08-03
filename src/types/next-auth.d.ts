import NextAuth from "next-auth";
import { AuthUser } from "./user";

declare module "next-auth" {
  interface Session {
    user: AuthUser;
  }
}
