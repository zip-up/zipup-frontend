import { OAuthUser } from "@/types";
import { client } from "./sanity";

export async function addUser({ id, ...rest }: OAuthUser) {
  return client.createIfNotExists({
    _id: id,
    _type: "user",
    followers: [],
    following: [],
    bookmarks: [],
    ...rest,
  });
}
