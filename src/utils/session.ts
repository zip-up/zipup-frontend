import { AuthUser } from "../types/user";
import { getServerSession } from "next-auth";
import { GET as authOptions } from "../app/api/auth/[...nextauth]/route";

export async function withSessionUser(handler: (user: AuthUser) => void) {
  const session = await getServerSession(authOptions);

  if (!session?.user) {
    return new Response("Authentication Error", { status: 401 });
  }

  return handler(session.user);
}
