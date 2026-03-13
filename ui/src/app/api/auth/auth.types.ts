export interface User {
  id?: string;
  username: string;
  password: string;
  code: string;
  fullname?: string;
  avatar_url?: string;
}

export interface Info {
  userId?: string;
  username?: string;
  code?: string;
  fullname?: string;
  avatar_url?: string;
}
