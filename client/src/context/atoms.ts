import { atom } from "jotai";

export const userAtom = atom({
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
});

export const groupsAtom = atom([
  {
    id: 0,
    name: "",
    description: "",
    messages: [],
    users: [],
  },
]);
