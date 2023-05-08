import { atom } from "jotai";
import { Message } from "../services/message";

export const messagesAtom = atom<Message[]>([] as Message[]);
