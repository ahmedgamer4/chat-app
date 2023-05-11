import { atom } from "jotai";
import { User } from "../services/user";
import { Group } from "../services/group";

export const userAtom = atom({} as User);

export const groupAtom = atom({} as Group);

export const groupsAtom = atom([] as Group[]);
