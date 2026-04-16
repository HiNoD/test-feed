import { makeAutoObservable } from 'mobx';
import { Post } from '../types/types';

class PostsStore {
  posts: Post[] | null = null;
  currentPost: Post | null = null;
  hasMore: boolean = false;
  nextCursor: string | null = null;

  constructor() {
    makeAutoObservable(this);
  }

  setPosts(posts: Post[]) {
    this.posts = posts;
  }

  setHasMore(hasMore: boolean) {
    this.hasMore = hasMore;
  }

  setNextCursor(nextCursor: string | null) {
    this.nextCursor = nextCursor;
  }

  setCurrentPost(post: Post) {
    this.currentPost = post;
  }

  getCurrentPost() {
    return this.currentPost;
  }
  
  async refreshPosts() {
    this.nextCursor = "";
    this.hasMore = true;
    this.posts = [];
  }
  
}

export const postsStore = new PostsStore();