import axios from 'axios';

const API = axios.create({
  baseURL: 'http://localhost:3000/api', // Adjust if different
});

export const getPosts = () => API.get('/posts');
