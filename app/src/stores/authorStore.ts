import { makeAutoObservable } from 'mobx';
import { Author } from '../types/types';

class AuthorStore {
  currentAuthor: Author | null = null;

  constructor() {
    makeAutoObservable(this);
  }

  setCurrentAuthor(author: Author) {
    this.currentAuthor = author;
  }
}

export const authorStore = new AuthorStore();