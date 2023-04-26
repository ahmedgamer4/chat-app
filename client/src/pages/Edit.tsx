import { useAtom } from "jotai";
import { Loader2, MoonIcon } from "lucide-react";
import React, { useState } from "react";
import UserDropdownMenu from "../components/UserDropdownMenu";
import { Button } from "../components/ui/Button";
import { Input } from "../components/ui/Input";
import { userAtom } from "../context/atoms";
import useDarkMode from "../hooks/useDarkMode";
import { useToast } from "../hooks/useToast";
import { UpdateUserDto, updateUser } from "../services/user";
import { Link, useNavigate } from "react-router-dom";
import { ArrowLeft } from "lucide-react";

const Edit = () => {
  const { toast } = useToast();
  const navigate = useNavigate();
  const [user, setUser] = useAtom(userAtom);
  const { toggleTheme } = useDarkMode();
  const [name, setName] = useState("");
  const [bio, setBio] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setLoading] = useState(false);

  const onEdit = async (e: React.FormEvent) => {
    e.preventDefault();

    const userToUpdate: UpdateUserDto = {};

    if (name) userToUpdate.name = name;
    if (bio) userToUpdate.bio = bio;
    if (phone) userToUpdate.phone = phone;
    if (password) userToUpdate.password = password;
    console.log(userToUpdate);

    if (Object.keys(userToUpdate).length === 0) {
      toast({
        title: "Invalid Data",
        description: "cannot save this user",
      });
      return;
    }
    setLoading(true);
    const updatedUser = await updateUser(user.id, userToUpdate);
    setUser(updatedUser);
    toast({
      title: "Edited Successfully",
    });
    console.log(updatedUser);
    setLoading(false);

    navigate("/profile");
  };

  return (
    <div className="w-11/12  mx-auto flex flex-col justify-between min-h-screen py-10">
      <header className="w-full flex justify-between mx-auto">
        <MoonIcon onClick={toggleTheme} className="cursor-pointer" />
        <UserDropdownMenu />
      </header>
      <div className="mx-auto mt-9 w-full max-w-[800px] min-w-[200px]">
        <Link to="/profile">
          <Button variant="ghost">
            <ArrowLeft size={19} className="mr-1" />
            <p>Back</p>
          </Button>
        </Link>
      </div>
      <div className="mt-4 border rounded-lg w-full max-w-[800px] min-w-[200px] mx-auto text-gray-600 text-sm dark:text-white">
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
          <Button disabled={isLoading} className="w-24">
            {isLoading ? (
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            ) : null}
            Save
          </Button>
        </form>
      </div>
      <div></div>
    </div>
  );
};

export default Edit;
