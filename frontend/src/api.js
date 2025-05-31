import axios from 'axios';

const API = axios.create({
  baseURL: 'https://cancer-app-blog-mockup-backend.onrender.com/api', // Adjust if different
});

export const getPosts = () => API.get('/posts');
