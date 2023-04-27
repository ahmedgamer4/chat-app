import { DialogTrigger } from "@radix-ui/react-dialog";
import { SearchIcon } from "lucide-react";
import UserDropdownMenu from "./UserDropdownMenu";
import { Button } from "./ui/Button";
import { Input } from "./ui/Input";
import { ScrollArea } from "@radix-ui/react-scroll-area";
import { useQuery } from "react-query";
import { Group, getAllGroups } from "../services/group";
import { useAtom } from "jotai";
import { groupsAtom } from "../context/atoms";
import { Skeleton } from "./ui/Skeleton";
import GroupBox from "./GroupBox";

const SearchNav = () => {
  const [groups, setGroups] = useAtom(groupsAtom);

  const { data, isLoading } = useQuery({
    queryKey: ["groups"],
    queryFn: getAllGroups,
    onSuccess: (res: Group[]) => {
      setGroups(res);
    },
  });

  if (isLoading) {
    return <Skeleton />;
  }

  return (
    <nav className="basis-[17rem] px-4 py-3 flex-col justify-between border-r shadow hidden sm:flex">
      <section>
        <div className="flex justify-between items-center mb-4">
          <h3>Channels</h3>
          <DialogTrigger asChild>
            <Button className="h-6 p-2">+</Button>
          </DialogTrigger>
        </div>
        <label htmlFor="group_name">
          <SearchIcon
            size={18}
            className="absolute translate-y-2.5 translate-x-2"
          />
          <Input
            id="group_name"
            className="relative pl-8"
            placeholder="Search"
          />
        </label>
        <ScrollArea className="h-96 rounded-md mt-4 p-3 pt-0 border">
          <div>
            {groups.map((g) => (
              <GroupBox name={g.name} id={g.id} key={g.id} />
            ))}
          </div>
        </ScrollArea>
      </section>
      <UserDropdownMenu size="wide" />
    </nav>
  );
};

export default SearchNav;
