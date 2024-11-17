import axios, { AxiosResponse } from "axios";

const API = axios.create({
  baseURL: "http://localhost:5595/api", // Backend server URL
});

API.interceptors.request.use((req) => {
  const token = localStorage.getItem("token");
  if (token && req.headers) {
    req.headers.Authorization = `Bearer ${token}`;
  }
  return req;
});
interface fetchUserId {
  id: number;
  listId: string;
}
interface LoginData {
  email: string;
  password: string;
}
interface AuthData {
  username: string;
  email: string;
  password: string;
}
interface resetData {
  email: string;
  password: string;
  repassword: string;
}
interface Book {
  id: string;
  title: string;
  author: string;
  genre: string;
  status: string;
  availability: boolean;
}

export const registerUser = (data: AuthData): Promise<AxiosResponse> =>
  API.post(`${process.env.NEXT_PUBLIC_API_URL}/auth/register`, data);
export const loginUser = (data: LoginData): Promise<AxiosResponse> =>
  API.post(`${process.env.NEXT_PUBLIC_API_URL}/auth/login`, data);
export const forgotPassword = (data: resetData): Promise<AxiosResponse> =>
  API.post(`${process.env.NEXT_PUBLIC_API_URL}/auth/forgot`, data);
export const fetchBooks = (query: string): Promise<AxiosResponse<Book[]>> =>
  API.get(`${process.env.NEXT_PUBLIC_API_URL}/books?search=${query}`, {
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
      "Content-Type": "application/json", // Optional
    },
  });

export const fetchMyList = (data: fetchUserId): Promise<AxiosResponse> =>
  API.get(`${process.env.NEXT_PUBLIC_API_URL}/books/${data.id}`, {
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
      "Content-Type": "application/json", // Optional
    },
  });

export const deleteList = (data: fetchUserId): Promise<AxiosResponse> =>
  API.delete(`${process.env.NEXT_PUBLIC_API_URL}/books/${data.id}`, {
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
      "Content-Type": "application/json", // Optional
    },
  });
