export type User = {
  name: string;
  username: string;
  email: string;
  image?: string;
};

export type OAuthUser = {
  id: string;
  image?: string | null;
} & User;

type SimpleUserInfo = Pick<User, "image" | "username">;

export type UserInfo = {
  bookmarks: string[];
  following: SimpleUserInfo[];
  followers: SimpleUserInfo[];
} & User;

export type ProfileUser = User & {
  id: string;
  following: number;
  followers: number;
  bookmarks: [];
};
