export interface User {
  id: string;
  name: string;
  email: string;
  profileImage: string;

};

export interface UserWithToken extends User {
  accesstoken: string;
}
