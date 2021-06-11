import {FETCH_ALL, CREATE, UPDATE, DELETE, LIKE} from '../constants/actionTypes';
import {Dispatch, Post} from '../../types';

import * as api from '../../api/index';

export const getPosts = () => async (dispatch: Dispatch) => {
  try {
    const {data} = await api.fetchPosts();

    dispatch({type: FETCH_ALL, payload: data});
  } catch (error) {
    console.log(error.message);
  }
};

export const createPost = (post: Post) => async (dispatch: Dispatch) => {
  try {
    const {data} = await api.createPost(post);

    dispatch({type: CREATE, payload: data});
  } catch (error) {
    console.log(error.message);
  }
};

export const updatePost = (id: string, post: Post) => async (dispatch: Dispatch) => {
  try {
    const {data} = await api.updatePost(id, post);

    dispatch({type: UPDATE, payload: data});
  } catch (error) {
    console.log(error.message);
  }
};

export const likePost = (id: string) => async (dispatch: Dispatch) => {
  try {
    const {data} = await api.likePost(id);

    dispatch({type: LIKE, payload: data});
  } catch (error) {
    console.log(error.message);
  }
};

export const deletePost = (id: string) => async (dispatch: Dispatch) => {
  try {
    await api.deletePost(id);

    dispatch({type: DELETE, payload: id});
  } catch (error) {
    console.log(error.message);
  }
};