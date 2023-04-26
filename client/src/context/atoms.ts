import { atom } from "jotai";

export const userAtom = atom({
  id: 0,
  name: "",
  email: "",
  passwordHash: "",
  messages: [
    {
      id: 0,
      content: "",
      date: new Date(),
      username: "",
    },
  ],
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
