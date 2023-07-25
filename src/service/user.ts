import { OAuthUser } from "@/types/user";
import { client } from "./sanity";

export async function addUser({ id, image, name, email, username }: OAuthUser) {
  return client.createIfNotExists({
    _id: id,
    _type: "user",
    followers: [],
    following: [],
    bookmarks: [],
    image,
    name,
    email,
    username,
  });
}

export async function getUserInfoByUsername(username: string) {
  return client.fetch(
    `*[_type == "user" && name == "${username}"][0]{ 
      ...,
      "id":_id,
      following[]->{username,image},
      followers[]->{username,image},
      "bookmarks":bookmarks[]->_id
    }`
  );
}
