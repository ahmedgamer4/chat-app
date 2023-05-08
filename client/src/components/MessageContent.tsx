import { Message } from "../services/message";

type MessageContentProps = {
  message: Message;
};

const MessageContent = ({ message }: MessageContentProps) => {
  const date = String(message.date).slice(6);

  return (
    <div>
      <div className="flex gap-3">
        <p>{message.username}</p>
        <p>{date}</p>
      </div>
      <p>{message.content}</p>
    </div>
  );
};

export default MessageContent;
