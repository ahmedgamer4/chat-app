import { useAtom } from "jotai";
import { Loader2, MenuIcon } from "lucide-react";
import { Fragment, useEffect, useState } from "react";
import { useMutation } from "react-query";
import GroupNav from "../components/GroupNav";
import MessageContent from "../components/MessageContent";
import MessageForm from "../components/RTE";
import SearchNav from "../components/SearchNav";
import { Button } from "../components/ui/Button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogTitle,
} from "../components/ui/Dialog";
import { Input } from "../components/ui/Input";
import { ScrollArea } from "../components/ui/ScrollArea";
import { Textarea } from "../components/ui/Textarea";
import { groupAtom, groupsAtom } from "../context/atoms";
import { messagesAtom } from "../context/currentMessages";
import { groupExists } from "../context/groupExists";
import { useToast } from "../hooks/useToast";
import { Group, createGroup } from "../services/group";
import { Message } from "../services/message";
import { socket } from "../services/socket";

const Chat = () => {
  const { toast } = useToast();

  const [groupName, setGroupName] = useState("");
  const [groupDescription, setGroupDescription] = useState("");

  const [isLoading, setLoading] = useState(false);
  const [groupOpen] = useAtom(groupExists);

  const [group] = useAtom(groupAtom);
  const [groups, setGroups] = useAtom(groupsAtom);
  const [messages, setMessages] = useAtom(messagesAtom);

  const [modalOpen, setModalOpen] = useState(false);

  const newGroupMutation = useMutation(createGroup, {
    onSuccess: async (newGroup: Group) => {
      setGroups([...groups, newGroup]);
      setLoading(false);
      setGroupName("");
      setGroupDescription("");
      setModalOpen(false);
    },
  });

  useEffect(() => {
    if (group.id !== 0) {
      socket.emit("findAllMessagesInGroup", group.id, (res: Message[]) => {
        console.log(res);
        setMessages(res);
      });
    }
  }, [group, setMessages]);

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
    <Dialog open={modalOpen} onOpenChange={setModalOpen}>
      <div className="flex w-full min-h-screen">
        {groupOpen ? <GroupNav /> : <SearchNav setModalOpen={setModalOpen} />}
        <section className="flex-grow relative">
          <div className="border-b bg-white z-10 dark:bg-background fixed shadow w-full py-3 px-3 sm:px-9 flex gap-3 items-center">
            <button className="sm:hidden">
              <MenuIcon size={22} />
            </button>
            <h2 className="uppercase text-[17px]">
              {group.name ? group.name : "WELCOME"}
            </h2>
          </div>
          {group.id ? (
            <Fragment>
              <ScrollArea className="h-[70%] mt-8 mx-2 sm:mx-9 overflow-y-scroll">
                <div>
                  {messages.map((message) => (
                    <MessageContent message={message} key={message.id} />
                  ))}
                </div>
              </ScrollArea>
              <MessageForm />
            </Fragment>
          ) : (
            <img
              src="https://m.media-amazon.com/images/I/51y8GUVKJoL._AC_UF894,1000_QL80_.jpg"
              className="w-[90%] mt-10 sm:w-[700px] mx-auto"
            />
          )}
        </section>
      </div>
      <DialogContent>
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
              className="mt-5 h-32"
            />
          </form>
        </DialogDescription>
        <DialogFooter>
          <Button disabled={isLoading} form="dialog_form" type="submit">
            {isLoading ? (
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            ) : null}
            Save
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default Chat;
