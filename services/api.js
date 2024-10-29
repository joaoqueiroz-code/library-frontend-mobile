import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { API_BASE_URL } from '../constants/apiConfig';

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'maxBodyLength': Infinity,
    'Content-Type': 'application/json',
  },
});

api.interceptors.request.use(async (config) => {
  const token = await AsyncStorage.getItem('authToken');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
}, (error) => {
  return Promise.reject(error);
});

const saveToken = async (token) => {
  await AsyncStorage.setItem('authToken', token);
};

export const login = async (email, password) => {
  const response = await api.post('/api/login', { email, password });
  const { token } = response.data;
  await saveToken(token); // Salva o token
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
  const response = await api.get('/api/books');
  return response.data;
};

export const createBook = async (bookData) => {
  try {
    const response = await api.post('/api/books', bookData);
    return response.data;
  } catch (error) {
    console.error("Error during registration:", error);
    throw error;
  }
};

export const updateBook = async (id, bookData) => {
  const response = await api.put(`/api/books/${id}`, bookData);
  return response.data;
};

export const deleteBook = async (id) => {
  const response = await api.delete(`/api/books/${id}`);
  return response.data;
};

export default api;
