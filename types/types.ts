export type User = {
  userId: string;
  userName: string;
  name: string;
  icon: string;
  email: string;
  password: string;
  Cpassword: string;
  follow: string[]; //userIdを格納
  follower: string[]; //userIdを格納
  favoritePosts: string[]; //postIdを格納
  posts: string[]; //postドキュメントidを格納
  profile: string;
  keepPosts: string[]; //postIdを格納
};

export type Post = {
  postId: string;
  userId: string; //ユーザーのuserId
  imageUrl: string;
  caption: string;
  postDate: Date;
  favorites: string[]; //userNameを格納
  keeps: string[]; //userIdを格納
  comments: string[];
  icon:string;
  userName:string;
};

export type Comment = {
  commentId: number;
  comment: string;
  commentTimestamp: Date;
  hashtag: string;
};

export type DirectMessage = {
  messageId: number;
  message: string;
  timestamp: Date;
  userId: string;
  withUserId: string;
};
