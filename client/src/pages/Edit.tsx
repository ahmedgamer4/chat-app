import React, { useState } from "react";
import UserDropdownMenu from "../components/UserDropdownMenu";
import { MoonIcon } from "lucide-react";
import useDarkMode from "../hooks/useDarkMode";
import { Input } from "../components/ui/Input";
import { useAtom } from "jotai";
import { userAtom } from "../context/atoms";
import { updateUser } from "../services/user";
import { Button } from "../components/ui/Button";
import { toast } from "../hooks/useToast";

const Edit = () => {
  const { toggleTheme } = useDarkMode();
  const [user] = useAtom(userAtom);
  const [name, setName] = useState("");
  const [bio, setBio] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");

  const onEdit = async (e: React.FormEvent) => {
    e.preventDefault();

    const userToUpdate = {
      name,
      bio,
      phone,
      password,
    };

    console.log(userToUpdate);

    const data = await updateUser(user.id, userToUpdate);
    toast({
      title: "Edited Successfully",
    });
    console.log(data);
  };

  return (
    <div className="w-11/12  mx-auto flex flex-col justify-between min-h-screen py-10">
      <header className="w-full flex justify-between mx-auto">
        <MoonIcon onClick={toggleTheme} className="cursor-pointer" />
        <UserDropdownMenu />
      </header>
      <div className="mt-9 border rounded-lg w-full max-w-[800px] min-w-[200px] mx-auto text-gray-600 text-sm dark:text-white">
        <form
          onSubmit={onEdit}
          className="sm:w-1/2 py-5 px-6 flex flex-col gap-y-4"
        >
          <section>
            <h3 className="text-xl text-black dark:text-white">Change Info</h3>
            <p className="text-xs">
              Changes will be reflected to every service
            </p>
          </section>
          <div>
            <img
              className="w-14 h-14 rounded-lg text-white bg-slate-700"
              src={user.photo}
              alt={user.name}
            />
          </div>
          <label htmlFor="">
            <p>Name</p>
            <Input
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="mt-2"
            />
          </label>
          <label htmlFor="">
            <p>Bio</p>
            <Input
              value={bio}
              onChange={(e) => setBio(e.target.value)}
              className="mt-2"
            />
          </label>
          <label htmlFor="">
            <p>Phone</p>
            <Input
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              className="mt-2"
            />
          </label>
          <label htmlFor="">
            <p>Password</p>
            <Input
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="mt-2"
            />
          </label>
          <Button className="w-24">Save</Button>
        </form>
      </div>
      <div></div>
    </div>
  );
};

export default Edit;
