import { OAuthUser } from "@/types/user";
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

export async function getUserInfoByUsername(username: string) {
  const followers = await client.fetch(
    `*[_type == "user" && name == "${username}"][0]{ 
      ...,
      "id":_id,
      following[]->{username,image},
      followers[]->{username,image},
      "bookmarks":bookmarks[]->_id
    }`
  );
  return followers;
}
