import { FullPost, SimplePost } from "@/types/post";
import { client, urlFor } from "./sanity";

const simplePostProjection = `
    ...,
    "username": author->username,
    "userImage": author->image,
    "likes": likes[]->username,
    "image":photo,
    "text": comments[0].comment,
    "comments": count(comments),
    "id":_id,
    "createdAt":_createdAt
`;

export async function getFollowingPosts(username: string) {
  return client
    .fetch<SimplePost[]>(
      `*[_type =="post" && author->username == "${username}"
          || author._ref in *[_type == "user" && username == "${username}"].following[]._ref]
          | order(_createdAt desc){
          ${simplePostProjection}
        }`
    )
    .then((posts) =>
      posts.map((post) => ({ ...post, image: urlFor(post.image) }))
    );
}

export async function getPost(id: string) {
  return client
    .fetch<FullPost>(
      `*[_type == "post" && _id == "${id}"][0]{
        ...,
        "username": author->username,
        "userImage": author->image,
        "image": photo,
        "likes": likes[]->username,
        comments[]{comment, "username": author->username, "image": author->image},
        "id":_id,
        "createdAt":_createdAt
      }`
    )
    .then((post) => ({ ...post, image: urlFor(post.image) }));
}

export async function getUserPosts(username: string) {
  return client
    .fetch<SimplePost[]>(
      `*[_type == "post" && author->username == "${username}"]
      | order(_createdAt desc){
          ${simplePostProjection}
        }
      `
    )
    .then((posts) =>
      posts.map((post) => ({ ...post, image: urlFor(post.image) }))
    );
}

export async function getLikedPosts(username: string) {
  return client
    .fetch<SimplePost[]>(
      `*[_type == "post" && "${username}" in likes[]->username]
        | order(_createdAt desc){
          ${simplePostProjection}
        }
      `
    )
    .then((posts) =>
      posts.map((post) => ({ ...post, image: urlFor(post.image) }))
    );
}

export async function getSavedPosts(username: string) {
  return client
    .fetch<SimplePost[]>(
      `*[_type == "post" && _id in *[_type=="user" && username=="${username}"].bookmarks._ref]
        | order(_createdAt desc){
          ${simplePostProjection}
        }
      `
    )
    .then((posts) =>
      posts.map((post) => ({ ...post, image: urlFor(post.image) }))
    );
}


export async function likePost(userId: string, postId: string) {
  return client
    .patch(postId)
    .setIfMissing({ likes: [] })
    .append("likes", [
      {
        _ref: userId,
        _type: "reference",
      },
    ])
    .commit({ autoGenerateArrayKeys: true });
}

export async function disLikePost(userId: string, postId: string) {
  return client
    .patch(postId)
    .unset([`likes[_ref=="${userId}"]`])
    .commit();
}
