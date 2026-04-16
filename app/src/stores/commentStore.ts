import { makeAutoObservable } from 'mobx';
import { Comment } from '../types/types';

class CommentStore {
  currentComment: Comment | null = null;

  constructor() {
    makeAutoObservable(this);
  }

  setCurrentComment(comment: Comment) {
    this.currentComment = comment;
  }
}

export const commentStore = new CommentStore();