import { Message } from "../services/message";
import ReactHTMLParser from "react-html-parser";

type MessageContentProps = {
  message: Message;
};

const MessageContent = ({ message }: MessageContentProps) => {
  const date = String(message.date).slice(6);

  return (
    <div className="flex gap-3 mt-9 border rounded-md pl-3 pt-3">
      <img
        src={message.user_photo}
        alt={message.username}
        className="text-xs bg-slate-800 w-11 h-11 rounded-md overflow-clip"
      />
      <div className="py-2 grid grid-cols-2 gap-3 text-sm font-bold items-center text-gray-700 dark:text-gray-400">
        <p>{message.username}</p>
        <p className="text-xs">{date}</p>
        <p className="col-start-1 col-end-3 dark:text-gray-200 text-gray-800"></p>
        <div className="ml-2">{ReactHTMLParser(message.content)}</div>
      </div>
    </div>
  );
};

export default MessageContent;
