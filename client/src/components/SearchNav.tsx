// @ts-nocheck
import { Textarea } from "@mantine/core";
import { useAtom } from "jotai";
import { Loader2, SearchIcon } from "lucide-react";
import { Fragment, useEffect, useState } from "react";
import { useMutation, useQuery } from "react-query";
import { ScrollArea } from "../components/ui/ScrollArea";
import { groupsAtom } from "../context/atoms";
import { useToast } from "../hooks/useToast";
import { Group, createGroup, getAllGroups } from "../services/group";
import GroupBox from "./GroupBox";
import UserDropdownMenu from "./UserDropdownMenu";
import { Button } from "./ui/Button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogTitle,
  DialogTrigger,
} from "./ui/Dialog";
import { Input } from "./ui/Input";
import { Skeleton } from "./ui/Skeleton";

const GroupsSkeleton = () => {
  return (
    <Fragment>
      <Skeleton className="mt-5 w-full h-16 rounded-md dark:bg-slate-800" />
      <Skeleton className="mt-4 w-full h-16 rounded-md dark:bg-slate-800" />
      <Skeleton className="mt-4 w-full h-16 rounded-md dark:bg-slate-800" />
    </Fragment>
  );
};

export const SearchNavContent = () => {
  const [groups, setGroups] = useAtom(groupsAtom);
  const [searchGroups, setSearchGroups] = useState<Group[]>([]);
  const { toast } = useToast();
  const [groupName, setGroupName] = useState("");
  const [groupDescription, setGroupDescription] = useState("");

  const [loading, setLoading] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);

  const [searchQuery, setSearchQuery] = useState<Group[]>([]);

  const { isLoading, isError } = useQuery({
    queryKey: ["groups", groups],
    queryFn: getAllGroups,
    onSuccess: (res: Group[]) => {
      setGroups(res);
    },
    refetchOnWindowFocus: false,
  });

  useEffect(() => {
    setSearchGroups(groups.filter((group) => group.name.includes(searchQuery)));
  }, [searchQuery, groups]);

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
    <div className="w-full h-full flex-col justify-between flex my-4">
      <section>
        <div className="flex justify-between items-center mb-4">
          <h3>Channels</h3>
          <Dialog open={modalOpen} onOpenChange={setModalOpen}>
            <DialogTrigger>
              <Button onClick={() => setModalOpen(true)} className="h-6 p-2">
                +
              </Button>
            </DialogTrigger>
            <DialogContent className="absolute">
              <DialogTitle className="text-lg">NEW CHANNEL</DialogTitle>
              <DialogDescription>
                <form id="dialog_form" onSubmit={onCreateGroup}>
                  <Input
                    value={groupName}
                    onChange={(e) => setGroupName(e.target.value)}
                    placeholder="Channel name"
                  />
                  <Textarea
                    value={groupDescription}
                    onChange={(e) => setGroupDescription(e.target.value)}
                    placeholder="Channel description"
                    className="bg-transparent mt-5 h-32"
                  />
                </form>
              </DialogDescription>
              <DialogFooter>
                <Button disabled={loading} form="dialog_form" type="submit">
                  {loading ? (
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  ) : null}
                  Save
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
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
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </label>
        {isError || isLoading ? (
          <GroupsSkeleton />
        ) : (
          <ScrollArea className="h-96 rounded-md mt-4 p-3 pt-0 border ">
            {searchGroups.map((g) => (
              <GroupBox group={g} key={g.id} />
            ))}
          </ScrollArea>
        )}
      </section>
      <UserDropdownMenu size="wide" />
    </div>
  );
};

const SearchNav = () => {
  return (
    <Fragment>
      <section className="basis-[17rem] px-4 flex-col justify-between border-r shadow hidden md:flex">
        <SearchNavContent />
      </section>
    </Fragment>
  );
};

export default SearchNav;
