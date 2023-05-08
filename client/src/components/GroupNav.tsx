import { useAtom } from "jotai";
import { groupAtom } from "../context/atoms";
import { ScrollArea } from "./ui/ScrollArea";
import UserDropdownMenu from "./UserDropdownMenu";
import { ChevronLeft } from "lucide-react";
import { groupExists } from "../context/groupExists";
import { useSearchParams } from "react-router-dom";

const GroupNav = () => {
  const [, setSearchParams] = useSearchParams({});
  const [group] = useAtom(groupAtom);
  const [, setGroupOpen] = useAtom(groupExists);

  const onBackClick = () => {
    setSearchParams({});
    setGroupOpen(false);
  };

  return (
    <nav className="basis-[17rem] px-4 py-3 flex-col justify-between border-r shadow hidden sm:flex">
      <div>
        <button
          onClick={onBackClick}
          className="flex w-full gap-3 items-center"
        >
          <ChevronLeft size={22} />
          <h4>All channels</h4>
        </button>
        <h3 className="text-xl uppercase mt-7">{group.name}</h3>
        <p className="text-sm mt-2">{group.description}</p>
        <h3 className="uppercase mt-7">members</h3>
        <ScrollArea className="mt-4">
          {group.users
            ? group.users.map((user) => (
                <div>
                  <img
                    src={user.photo}
                    alt={user.name}
                    className="w-9 h-9 bg-slate-900 rounded-md text-xs text-white"
                  />
                  <p className="text-sm">{user.name}</p>
                </div>
              ))
            : null}
        </ScrollArea>
      </div>
      <UserDropdownMenu size="wide" />
    </nav>
  );
};

export default GroupNav;
