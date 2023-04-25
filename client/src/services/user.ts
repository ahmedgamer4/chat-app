import axios from "axios";
import { token } from "./auth";

type CreateUserDto = {
  name: string;
  email: string;
  password: string;
  googleId?: string;
  githubId?: string;
  facebookId?: string;
};

type UpdateUserDto = {
  name?: string;
  password?: string;
  bio?: string;
  phone?: string;
  photo?: string;
};

const config = {
  headers: { Authorization: token },
};

const baseUrl = location.origin + "/api/users";

export const getAll = async () => {
  const users = await axios.get(baseUrl, config);
  return users.data;
};

export const createUser = async (data: CreateUserDto) => {
  await axios.post(baseUrl, data);
};

export const getUser = async (id: number) => {
  const user = await axios.get(`${baseUrl}/${id}`, config);
  return user.data;
};

export const updateUser = async (id: number, data: UpdateUserDto) => {
  const user = await axios.put(`${baseUrl}/${id}`, data, config);
  return user.data;
};
