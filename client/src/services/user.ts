import axios from "axios";
import { token } from "./auth";
import { Message } from "./message";

export type User = {
  id: number;
  name: string;
  email: string;
  passwordHash: string;
  googleId?: string;
  githubId?: string;
  facebookId?: string;
  messages?: Message[];
  bio?: string;
  phone?: string;
  photo?: string;
};

type CreateUserDto = {
  name: string;
  email: string;
  password: string;
  googleId?: string;
  githubId?: string;
  facebookId?: string;
};

export type UpdateUserDto = {
  name?: string;
  password?: string;
  bio?: string;
  phone?: string;
  photo?: string;
};

const baseUrl = "http://localhost:3000/api/users";

export const getAll = async () => {
  const config = {
    headers: { Authorization: token.token },
  };
  const users = await axios.get(baseUrl, config);
  return users.data;
};

export const createUser = async (data: CreateUserDto) => {
  await axios.post(baseUrl, data);
};

export const getUser = async (id: number) => {
  const config = {
    headers: { Authorization: token.token },
  };
  const user = await axios.get(`${baseUrl}/${id}`, config);
  return user.data;
};

export const updateUser = async (id: number, data: UpdateUserDto) => {
  const config = {
    headers: { Authorization: token.token },
  };
  const user = await axios.patch(`${baseUrl}/${id}`, data, config);
  return user.data;
};
