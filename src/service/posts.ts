import { FullPost, SimplePost } from "@/types/post";
import { createReadStream } from "fs";
import { basename } from "path";
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

export async function addComment(
  userId: string,
  postId: string,
  comment: string
) {
  return client
    .patch(postId)
    .setIfMissing({ comments: [] })
    .append("comments", [
      {
        comment,
        author: {
          _ref: userId,
          _type: "reference",
        },
      },
    ])
    .commit({ autoGenerateArrayKeys: true });
}

export async function createPost(userId: string, content: string, file: Blob) {
  fetch(
    `https://${process.env.SANITY_PROJECT_ID}.api.sanity.io/v2021-06-07/assets/images/${process.env.SANITY_DATASET}`,
    {
      method: "POST",
      headers: {
        "content-type": file.type,
        Authorization: `Bearer ${process.env.SANITY_SECRET_TOKEN}`,
      },
      body: file,
    }
  )
    .then((res) => res.json())
    .then((result) =>
      client.create(
        {
          _type: "post",
          author: { _ref: userId },
          photo: {
            asset: {
              _ref: result.document._id,
            },
          },
          comments: [
            {
              comment: content,
              author: {
                _ref: userId,
                _type: "reference",
              },
            },
          ],
          likes: [],
        },
        { autoGenerateArrayKeys: true }
      )
    );
}

