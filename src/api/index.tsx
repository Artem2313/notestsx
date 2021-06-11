import axios from 'axios';
import { FormData, Post } from '../types';

const API = axios.create({baseURL: 'http://localhost:5000'});

API.interceptors.request.use((req) => {
  const localProfile: string | null = localStorage.getItem('profile');

  if(localProfile && localProfile !== null) {
    req.headers.Authorization = `Bearer ${JSON.parse(localProfile).token}`;
  }

  return req;
});

export const fetchPosts = () => API.get('/posts');
export const createPost = (newPost: Post) => API.post('/posts', newPost);
export const likePost = (id: string) => API.patch(`/posts/${id}/likePost`);
export const updatePost = (id: string, updatedPost: Post) => API.patch(`/posts/${id}`, updatedPost);
export const deletePost = (id: string) => API.delete(`/posts/${id}`);

export const signIn = (formData: FormData) => API.post('/user/signin', formData);

export const signUp = (formData: FormData) => API.post('/user/signup', formData);

