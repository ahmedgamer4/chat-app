import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "../components/ui/Dropdown";
import { Separator } from "../components/ui/Separator";
import { Link } from "react-router-dom";
import { LogOut } from "lucide-react";
import { UsersIcon } from "lucide-react";
import { UserIcon } from "lucide-react";
import { useAtom } from "jotai";
import { userAtom } from "../context/atoms";

const UserDropdownMenu = ({}) => {
  const [user] = useAtom(userAtom);
  return (
    <DropdownMenu>
      <DropdownMenuTrigger className="flex gap-y-2 gap-x-3 items-center">
        <img
          src={user.photo}
          alt={user.name}
          className="text-xs bg-slate-700 rounded-md w-10 h-10"
        />
        <p className="text-sm">{user.name}</p>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="p-2 rounded-lg">
        <DropdownMenuItem>
          <Link
            to="/profile"
            className="flex items-center gap-2 bg-transparent"
          >
            <UserIcon size={18} />
            <p>My profile</p>
          </Link>
        </DropdownMenuItem>

        <DropdownMenuItem className="mt-2">
          <Link to="/chat" className="flex items-center gap-2 bg-transparent">
            <UsersIcon size={18} />
            <p>Group Chat</p>
          </Link>
        </DropdownMenuItem>

        <Separator className="my-2" />
        <DropdownMenuItem>
          <button className="flex items-center py-0 justify-between w-full bg-transparent text-red-500 hover:bg-transparent">
            <LogOut size={18} />
            <p>Logout</p>
          </button>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default UserDropdownMenu;
