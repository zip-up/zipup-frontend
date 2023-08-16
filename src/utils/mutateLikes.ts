export default function getNewLikes(
  like: boolean,
  likes: string[],
  username: string
) {
  if (!like) {
    return [...likes, username];
  }
  return likes.filter((likers) => likers !== username);
}
