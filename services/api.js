import axios from 'axios';
import { API_BASE_URL } from '../constants/apiConfig';

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'maxBodyLength': Infinity,
    'Content-Type': 'application/json',
  },
});

export const login = async (email, password) => {
  const response = await api.post('/api/login', { email, password });
  return response.data;
};

export const register = async (email, password) => {
  try {
    const response = await api.post('/api/register', { email, password });
    return response.data;
  } catch (error) {
    console.error("Error during registration:", error);
    throw error;
  }
};

export const getBooks = async () => {
  const response = await api.get('/books');
  return response.data;
};

export const createBook = async (bookData) => {
  const response = await api.post('/books', bookData);
  return response.data;
};

export const updateBook = async (id, bookData) => {
  const response = await api.put(`/books/${id}`, bookData);
  return response.data;
};

export const deleteBook = async (id) => {
  const response = await api.delete(`/books/${id}`);
  return response.data;
};

export default api;
