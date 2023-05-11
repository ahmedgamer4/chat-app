import { useAtom } from "jotai";
import { MenuIcon } from "lucide-react";
import { Fragment, useEffect } from "react";
import GroupNav, { GroupNavContent } from "../components/GroupNav";
import MessageContent from "../components/MessageContent";
import MessageForm from "../components/RTE";
import SearchNav, { SearchNavContent } from "../components/SearchNav";
import { ScrollArea } from "../components/ui/ScrollArea";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetTrigger,
} from "../components/ui/Sheet";
import { groupAtom } from "../context/atoms";
import { messagesAtom } from "../context/currentMessages";
import { groupExists } from "../context/groupExists";
import { Message } from "../services/message";
import { socket } from "../services/socket";

const Chat = () => {
  const [groupOpen] = useAtom(groupExists);

  const [group] = useAtom(groupAtom);
  const [messages, setMessages] = useAtom(messagesAtom);

  useEffect(() => {
    const handleSendMessages = (res: Message[]) => {
      setMessages(res);
    };
    if (group) {
      socket.emit("findAllMessagesInGroup", group.id, handleSendMessages);
    }
    socket.off("findAllMessagesInGroup", handleSendMessages);
  }, [group]);

  useEffect(() => {
    const handleRecieveMessage = (message: Message) => {
      setMessages((prev) => [...prev, message]);
    };

    socket.on("recieveMessage", handleRecieveMessage);
    return () => {
      socket.off("recieveMessage", handleRecieveMessage);
    };
  }, [socket]);

  return (
    <div className="flex w-full min-h-screen">
      {groupOpen ? <GroupNav /> : <SearchNav />}
      <section className="flex-grow relative">
        <div className="border-b bg-white z-10 dark:bg-background fixed shadow w-full py-3 px-3 sm:px-9 flex gap-3 items-center">
          <Sheet>
            <SheetTrigger>
              <button className="md:hidden">
                <MenuIcon size={22} />
              </button>
            </SheetTrigger>
            <SheetContent position="left" className="w-full">
              <SheetDescription className="h-full">
                {groupOpen ? <GroupNavContent /> : <SearchNavContent />}
              </SheetDescription>
            </SheetContent>
          </Sheet>
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
  );
};

export default Chat;
