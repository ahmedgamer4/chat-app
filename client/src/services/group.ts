import axios from "axios";
import { token } from "./auth";
import { Message } from "./message";
import { User } from "./user";

export type Group = {
  id: number;
  name: string;
  description: string;
  messages: Message[];
  users: Omit<User, "messages">[];
};

export type CreateGroupDto = {
  name: string;
  description: string;
};

const baseUrl = "http://localhost:3000/api/groups";

export const getAllGroups = async (): Promise<Group[]> => {
  const config = {
    headers: { Authorization: token.token },
  };

  console.log("token from group", config);
  const groups = await axios.get(baseUrl, config);
  return groups.data;
};

export const createGroup = async (data: CreateGroupDto) => {
  const config = {
    headers: { Authorization: token.token },
  };
  const group = await axios.post(baseUrl, data, config);
  return group;
};

export const getGroup = async (id: number) => {
  const config = {
    headers: { Authorization: token.token },
  };
  const group = await axios.get(`${baseUrl}/${id}`, config);
  return group.data;
};
