export type User = {
  user_id: string;
  user_name: string;
  name: string;
  // icon: string;
  email: string;
  password: string;
  cpassword: string;
  follow: string[]; //userIdを格納
  follower: string[]; //userIdを格納
  favorite_posts: string[]; //postIdを格納
  posts: string[]; //postドキュメントidを格納
  profile: string;
  keep_posts: string[]; //postIdを格納
};

export type Post = {
  post_id: string;
  user_id: string; //ユーザーのuserId
  // imageUrl: string;
  caption: string;
  // postDate: Date;
  timestamp: Date;
  favorites: string[]; //userNameを格納
  keeps: string[]; //userIdを格納
  // comments: string[];
  // icon:string;
  // userName:string;
};

export type Comment = {
  comment_id: number;
  comment: string;
  timestamp: Date;
  post_id: number;
  user_name:string;
  // hashtag: string;
};

export type DirectMessage = {
  message_id: number;
  message: string;
  timestamp: Date;
  user_id: string;
  with_user_id: string;
};
