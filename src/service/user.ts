import { OAuthUser, ProfileUser, SearchUser } from "@/types/user";
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

export async function searchUsers(keyword?: string) {
  const query = keyword
    ? `&& (name match "${keyword}") || (username match "${keyword}")`
    : "";

  return client
    .fetch<SearchUser[]>(
      `*[_type == "user" ${query}]{ 
      ...,
      "id":_id,
      "following": count(following),
      "followers": count(followers),
    }`
    )
    .then((users) =>
      users.map((user) => ({
        ...user,
        following: user.following ?? 0,
        followers: user.followers ?? 0,
      }))
    );
}

export async function getUserForProfile(username: string) {
  return client
    .fetch<ProfileUser>(
      `*[_type == "user" && username == "${username}"][0]{ 
      ...,
      "id":_id,
      "following": count(following),
      "followers": count(followers),
      "posts": count(*[type == "post" && author->username == "${username}"])
    }`
    )
    .then((user) => ({
      ...user,
      following: user.following ?? 0,
      followers: user.followers ?? 0,
      posts: user.posts ?? 0,
    }));
}
