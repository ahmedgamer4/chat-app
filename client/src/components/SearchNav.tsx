import { useAtom } from "jotai";
import { SearchIcon } from "lucide-react";
import { Fragment, useState } from "react";
import { useMutation, useQuery } from "react-query";
import { ScrollArea } from "../components/ui/ScrollArea";
import { groupsAtom } from "../context/atoms";
import { useToast } from "../hooks/useToast";
import { Group, createGroup, getAllGroups } from "../services/group";
import GroupBox from "./GroupBox";
import UserDropdownMenu from "./UserDropdownMenu";
import { Button } from "./ui/Button";
import { Input } from "./ui/Input";
import { Skeleton } from "./ui/Skeleton";
import { SheetTrigger } from "./ui/Sheet";
import { DialogTrigger } from "./ui/Dialog";

type SearchNavProps = {
  setModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
};

const GroupsSkeleton = () => {
  return (
    <Fragment>
      <Skeleton className="mt-5 w-full h-16 rounded-md bg-slate-800 " />
      <Skeleton className="mt-4 w-full h-16 rounded-md bg-slate-800 " />
      <Skeleton className="mt-4 w-full h-16 rounded-md bg-slate-800 " />
    </Fragment>
  );
};

const SearchNav = ({ setModalOpen }: SearchNavProps) => {
  const [groups, setGroups] = useAtom(groupsAtom);
  const { toast } = useToast();
  const [groupName, setGroupName] = useState("");
  const [groupDescription, setGroupDescription] = useState("");
  const [loading, setLoading] = useState(false);

  const { isLoading, isError } = useQuery({
    queryKey: ["groups", groups],
    queryFn: getAllGroups,
    onSuccess: (res: Group[]) => {
      setGroups(res);
    },
    refetchOnWindowFocus: false,
  });

  const newGroupMutation = useMutation(createGroup, {
    onSuccess: async (newGroup: Group) => {
      setGroups([...groups, newGroup]);
      setLoading(false);
      setGroupName("");
      setGroupDescription("");
    },
  });

  const onCreateGroup = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!groupName || !groupDescription) {
      toast({
        title: "Invalid Data",
        description: "missing name or description",
      });
      return;
    }

    const newGroup = {
      name: groupName,
      description: groupDescription,
    };

    setLoading(true);
    newGroupMutation.mutate(newGroup);
  };

  return (
    <nav className="basis-[17rem] px-4 py-3 flex-col justify-between border-r shadow hidden sm:flex">
      <section>
        <div className="flex justify-between items-center mb-4">
          <h3>Channels</h3>
          <DialogTrigger>
            <Button onClick={() => setModalOpen(true)} className="h-6 p-2">
              +
            </Button>
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
        {isError || isLoading ? (
          <GroupsSkeleton />
        ) : (
          <ScrollArea className="h-96 rounded-md mt-4 p-3 pt-0 border ">
            {groups.map((g) => (
              <GroupBox group={g} key={g.id} />
            ))}
          </ScrollArea>
        )}
      </section>
      <UserDropdownMenu size="wide" />
    </nav>
  );
};

export default SearchNav;
