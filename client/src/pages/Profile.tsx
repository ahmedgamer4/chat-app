import { MoonIcon, SunIcon } from "lucide-react";
import React from "react";
import ProfileInfo from "../components/ProfileInfo";
import UserDropdownMenu from "../components/UserDropdownMenu";
import { Button } from "../components/ui/Button";
import useDarkMode from "../hooks/useDarkMode";

const Profile = () => {
  const { theme, toggleTheme } = useDarkMode();

  return (
    <div className="w-11/12 mx-auto flex flex-col justify-between min-h-screen py-10">
      <header className="w-full flex justify-between mx-auto">
        <Button onClick={toggleTheme} className="w-9 h-9 p-0">
          {theme === "light" ? (
            <MoonIcon size={18} className="cursor-pointer" />
          ) : (
            <SunIcon size={18} className="cursor-pointer" />
          )}
        </Button>
        <UserDropdownMenu />
      </header>
      <ProfileInfo />
      <div></div>
    </div>
  );
};

export default Profile;
