import { Message } from "../services/message";
import ReactHTMLParser from "react-html-parser";

type MessageContentProps = {
  message: Message;
};

const MessageContent = ({ message }: MessageContentProps) => {
  const date = String(message.date).slice(6);

  return (
    <div className="flex gap-3 mt-9 ">
      <img
        src={message.user_photo}
        alt={message.username}
        className="object-cover text-xs bg-slate-800 w-11 h-11 rounded-md overflow-clip"
      />
      <div className="border rounded-md max-w-[300px] pl-3 pt-3 py-2 grid grid-cols-2 gap-3 text-sm font-bold items-center text-gray-700 dark:text-gray-400">
        <p>{message.username}</p>
        <p className="text-xs">{date}</p>
        <div className="ml-2">{ReactHTMLParser(message.content)}</div>
      </div>
    </div>
  );
};

export default MessageContent;
