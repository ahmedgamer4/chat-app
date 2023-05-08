import { useAtom } from "jotai";
import { Loader2, MenuIcon, SendIcon } from "lucide-react";
import { useEffect, useState } from "react";
import { useMutation } from "react-query";
import { io } from "socket.io-client";
import GroupNav from "../components/GroupNav";
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
import { Textarea } from "../components/ui/Textarea";
import { groupAtom, groupsAtom } from "../context/atoms";
import { groupExists } from "../context/groupExists";
import { useToast } from "../hooks/useToast";
import { Group, createGroup } from "../services/group";
import { messagesAtom } from "../context/currentMessages";
import { Message } from "../services/message";
import MessageContent from "../components/MessageContent";
import { ScrollArea } from "../components/ui/ScrollArea";

const socket = io("http://localhost:3000");

const Chat = () => {
  const { toast } = useToast();

  const [groupName, setGroupName] = useState("");
  const [groupDescription, setGroupDescription] = useState("");
  const [message, setMessage] = useState("");
  const [test, setTest] = useState("");

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

  const sendMessage = (e: React.FormEvent) => {
    e.preventDefault();

    socket.emit("findAllMessages", () => {
      // setTest(`You are connected with id ${socket.id}`);
      socket.emit("createMessage");
    });
  };

  return (
    <Dialog open={modalOpen} onOpenChange={setModalOpen}>
      <div className="flex w-full min-h-screen">
        {groupOpen ? <GroupNav /> : <SearchNav setModalOpen={setModalOpen} />}
        <section className="flex-grow relative">
          <div className="border-b fixed shadow w-full py-3 px-3 sm:px-9 flex gap-3 items-center">
            <button className="sm:hidden">
              <MenuIcon size={22} />
            </button>
            <h2 className="uppercase text-[17px]">{group.name}</h2>
          </div>
          <div className="w-11/12 mx-auto mt-16">
            <ScrollArea className="h-full w-full">
              {messages.map((message) => (
                <MessageContent message={message} key={message.id} />
              ))}
            </ScrollArea>
          </div>
          <form onSubmit={sendMessage}>
            <label className="absolute bottom-4 w-[92%] left-1/2 -translate-x-1/2">
              <Input
                placeholder="Type messsage here "
                className="relative h-12"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
              />
              <Button className="h-9 w-9 p-2 absolute right-1.5 bottom-1.5">
                <SendIcon size={20} />
              </Button>
            </label>
          </form>
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
