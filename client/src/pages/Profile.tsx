import React from "react";
import UserDropdownMenu from "../components/UserDropdownMenu";
import { MoonIcon } from "lucide-react";
import useDarkMode from "../hooks/useDarkMode";
import ProfileInfo from "../components/ProfileInfo";

const Profile = () => {
  const { toggleTheme } = useDarkMode();

  return (
    <div className="w-11/12 mx-auto flex flex-col justify-between min-h-screen py-10">
      <header className="w-full flex justify-between mx-auto">
        <MoonIcon onClick={toggleTheme} className="cursor-pointer" />
        <UserDropdownMenu />
      </header>
      <ProfileInfo />
      <div></div>
    </div>
  );
};

export default Profile;
