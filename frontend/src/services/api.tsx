import axios, { AxiosResponse } from "axios";

const API = axios.create({
  baseURL: "http://localhost:5000/api", // Backend server URL
});

API.interceptors.request.use((req) => {
  const token = localStorage.getItem("token");
  if (token && req.headers) {
    req.headers.Authorization = `Bearer ${token}`;
  }
  return req;
});

interface AuthData {
  email: string;
  password: string;
}

interface Book {
  id: string;
  title: string;
  author: string;
  genre: string;
  condition: string;
  availability: boolean;
}

export const registerUser = (data: AuthData): Promise<AxiosResponse> =>
  API.post("/auth/register", data);
export const loginUser = (
  data: AuthData
): Promise<AxiosResponse<{ token: string }>> => API.post("/auth/login", data);
export const fetchBooks = (query: string): Promise<AxiosResponse<Book[]>> =>
  API.get(`/books?search=${query}`);
