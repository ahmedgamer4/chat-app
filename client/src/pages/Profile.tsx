import React from "react";
import { userAtom } from "../context/atoms";
import { useAtom } from "jotai";
import UserDropdownMenu from "../components/UserDropdownMenu";
import { MoonIcon } from "lucide-react";
import useDarkMode from "../hooks/useDarkMode";
import { Button } from "../components/ui/Button";
import { Separator } from "../components/ui/Separator";

const Profile = () => {
  const [user] = useAtom(userAtom);
  const { toggleTheme } = useDarkMode();

  return (
    <div className="w-11/12 mx-auto flex flex-col justify-between min-h-screen py-10">
      <header className="w-full flex justify-between mx-auto">
        <MoonIcon onClick={toggleTheme} className="cursor-pointer" />
        <UserDropdownMenu />
      </header>
      <section className="flex flex-col items-center mx-auto w-full max-w-[800px] min-w-[200px]">
        <h1 className="mx-auto text-3xl">Personal Info</h1>
        <p className="mx-auto text-sm mt-4">
          Basic info, like your name and photo
        </p>
        <div className="mt-9 border rounded-lg w-full text-gray-600 text-sm dark:text-white">
          <section className="flex justify-between py-5 px-6">
            <div>
              <h4 className="text-xl">Profile</h4>
              <p className="text-xs">
                Some info may be visibel to other people
              </p>
            </div>
            <Button variant="outline">Edit</Button>
          </section>
          <Separator />
          <section className="flex justify-between py-5 px-6">
            <p>PHOTO</p>
            <img
              className="w-14 h-14 rounded-lg text-white bg-slate-700"
              src={user.photo}
              alt={user.name}
            />
          </section>
          <Separator />
          <section className="flex justify-between py-5 px-6">
            <p>NAME</p>
            <p className="text-gray-900 text-base dark:text-white">
              {user.name}
            </p>
          </section>
          <Separator />
          <section className="flex justify-between py-5 px-6">
            <p>BIO</p>
            <p className="text-gray-900 text-base dark:text-white">
              {user.bio}
            </p>
          </section>
          <Separator />
          <section className="flex justify-between py-5 px-6">
            <p>PHONE</p>
            <p className="text-gray-900 text-base dark:text-white">
              {user.phone}
            </p>
          </section>
          <Separator />
          <section className="flex justify-between py-5 px-6">
            <p>EMAIL</p>
            <p className="text-gray-900 text-base dark:text-white">
              {user.email}
            </p>
          </section>
          <Separator />
          <section className="flex justify-between py-5 px-6">
            <p>password</p>
            <p className="text-gray-900 text-base dark:text-white">
              ************
            </p>
          </section>
        </div>
      </section>
      <div></div>
    </div>
  );
};

export default Profile;
