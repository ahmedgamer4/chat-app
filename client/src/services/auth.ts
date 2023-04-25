import axios from "axios";

const baseUrl = "http://localhost:3000/api/auth";

type RegisterUserDto = {
  name: string;
  email: string;
  password: string;
};

type LoginUserDto = {
  email: string;
  password: string;
};

export let token = {
  token: "",
  user: {
    id: 0,
    name: "",
    email: "",
    passwordHash: "",
    messages: [],
    bio: "",
    photo: "",
    phone: "",
    googleId: "",
    githubId: "",
    facebookId: "",
  },
};

export const setToken = (newToken: string) => {
  token.token = `bearer ${newToken}`;
};

export const registerUser = async (data: RegisterUserDto) => {
  await axios.post(`${baseUrl}/email/register`, data);
};

export const loginUser = async (data: LoginUserDto) => {
  console.log(data);
  const token = await axios.post(`${baseUrl}/email/login`, data);
  return token.data;
};
