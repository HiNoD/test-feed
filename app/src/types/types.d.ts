export interface Author {
  id: string;
  username: string;
  displayName: string;
  avatarUrl?: string;
  bio?: string;
  subscribersCount: number;
  isVerified: boolean;
}

export interface Post {
  id: string;
  author: Author;
  title: string;
  body: string;
  preview: string;
  coverUrl: string;
  likesCount: number;
  commentsCount: number;
  isLiked: boolean;
  tier: string;
  createdAt: Date;
}

export interface Comment {
  id: string;
  postId: string;
  author: Author;
  text: string;
  createdAt: Date;
}

export interface PostsResponse {
  hasMore: boolean;
  nextCursor: string | null;
  posts: Post[];
}

export interface LikeResponse {
  isLiked: boolean;
  likesCount: number;
}

export interface CommentsResponse {
  hasMore: boolean;
  nextCursor: string | null;
  comments: Comment[];
}

export interface ErrorResponse {
  code: string;
  message: string;
}

export enum STATUS {
  DEFAULT = 'default',
  PRESSED = 'pressed',
  HOVER = 'hover',
  DISABLE = 'disable',
}