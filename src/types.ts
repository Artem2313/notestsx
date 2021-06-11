import {Action as ReduxAction} from 'redux';
import {ThunkDispatch} from 'redux-thunk';

export type Action<T = any> = ReduxAction & {
  payload: T;
};

export type Dispatch = ThunkDispatch<{}, {}, Action>;

export type Post = {
  _id?: string,
  title: string,
  message: string,
  name?: string,
  creator?: string,
  tags: any,
  selectedFile: string,
  likes?: string[],
  createdAt?: Date
};

export type Posts = Post[];

export type FormData = {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  confirmPassword: string;
}

export type IdProps = {
  currentId: string,
  setCurrentId: (el: string) => void
};

export type State = {
  posts: Posts
};