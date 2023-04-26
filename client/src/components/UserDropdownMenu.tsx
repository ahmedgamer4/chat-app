import { useAtom } from "jotai";
import { LogOut, UserIcon, UsersIcon } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "../components/ui/Dropdown";
import { Separator } from "../components/ui/Separator";
import { userAtom } from "../context/atoms";
import { resetToken, token } from "../services/auth";

const UserDropdownMenu = ({}) => {
  const navigate = useNavigate();
  const [user, setUser] = useAtom(userAtom);

  const logOut = () => {
    localStorage.removeItem("loggedUser");
    setUser({
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
    resetToken();
    console.log(token);
    navigate("/login");
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger className="flex gap-y-2 gap-x-3 items-center">
        <img
          src={user.photo}
          alt={user.name}
          className="text-xs bg-slate-700 rounded-md w-10 h-10 text-white"
        />
        <p className="text-sm">{user.name}</p>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="p-2 rounded-lg">
        <DropdownMenuItem className="">
          <Link
            to="/profile"
            className="flex items-center bg-transparent justify-between w-full text-[13px]"
          >
            <UserIcon size={18} />
            <p>My profile</p>
          </Link>
        </DropdownMenuItem>

        <DropdownMenuItem className="mt-2 flex items-center justify-between w-full">
          <Link
            to="/chat"
            className="flex items-center justify-between w-full bg-transparent text-[13px]"
          >
            <UsersIcon size={18} />
            <p>Group Chat</p>
          </Link>
        </DropdownMenuItem>

        <Separator className="my-2" />
        <DropdownMenuItem>
          <button
            onClick={logOut}
            className="flex items-center justify-between w-full text-red-500 hover:bg-transparent text-[13px]"
          >
            <LogOut size={18} />
            <p>Logout</p>
          </button>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default UserDropdownMenu;
