export type AuthUser = {
  name: string;
  username: string;
  email: string;
  image?: string;
  id: string;
};

export type OAuthUser = {
  id: string;
  image?: string | null;
} & AuthUser;

type SimpleUserInfo = Pick<AuthUser, "image" | "username">;

export type HomeUser = {
  bookmarks: string[];
  following: SimpleUserInfo[];
  followers: SimpleUserInfo[];
} & AuthUser;

export type SearchUser = AuthUser & {
  id: string;
  following: number;
  followers: number;
  bookmarks: [];
  posts: number;
};

export type ProfileUser = SearchUser & {
  posts: number;
};
