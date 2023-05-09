import { RichTextEditor, Link } from "@mantine/tiptap";
import { useEditor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Underline from "@tiptap/extension-underline";
import TextAlign from "@tiptap/extension-text-align";
import Superscript from "@tiptap/extension-superscript";
import SubScript from "@tiptap/extension-subscript";
import { SendIcon } from "lucide-react";
import { Button } from "./ui/Button";
import { socket } from "../services/socket";
import { useAtom } from "jotai";
import { groupAtom, userAtom } from "../context/atoms";
import { messagesAtom } from "../context/currentMessages";
import { Message } from "../services/message";

const content = "";

const MessageInput = () => {
  const [group, setGroup] = useAtom(groupAtom);
  const [messages, setMessages] = useAtom(messagesAtom);
  const [user] = useAtom(userAtom);
  const editor = useEditor({
    extensions: [
      StarterKit,
      Underline,
      Link,
      Superscript,
      SubScript,
      TextAlign.configure({ types: ["heading", "paragraph"] }),
    ],
    content,
  });

  const sendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    const htmlContent = editor ? editor.getHTML() : "";
    const text = editor?.getText();
    console.log(text);

    socket.emit(
      "createMessage",
      {
        group_id: group.id,
        content: htmlContent,
        user: user,
      },
      (res: Message) => {
        console.log(res);
        setMessages((prev) => [...prev, res]);
        setGroup(group);
      }
    );
  };

  return (
    <form onSubmit={sendMessage}>
      <label className="absolute bottom-4 w-[92%] left-1/2 -translate-x-1/2">
        <RichTextEditor editor={editor}>
          <RichTextEditor.Toolbar sticky stickyOffset={60}>
            <RichTextEditor.ControlsGroup>
              <RichTextEditor.Bold />
              <RichTextEditor.Italic />
              <RichTextEditor.Underline />
              <RichTextEditor.Strikethrough />
              <RichTextEditor.ClearFormatting />
              <RichTextEditor.Code />
            </RichTextEditor.ControlsGroup>

            <RichTextEditor.H4 />

            <RichTextEditor.ControlsGroup>
              <RichTextEditor.BulletList />
              <RichTextEditor.OrderedList />
              <RichTextEditor.Subscript />
              <RichTextEditor.Superscript />
            </RichTextEditor.ControlsGroup>

            <RichTextEditor.ControlsGroup>
              <RichTextEditor.Link />
              <RichTextEditor.Unlink />
            </RichTextEditor.ControlsGroup>
          </RichTextEditor.Toolbar>

          <RichTextEditor.Content
            onChange={(_e) => console.log()}
            className="max-h-24 sm:max-h-24 md:max-h-32 overflow-y-scroll"
          />
        </RichTextEditor>
        <Button className="h-9 w-9 p-2 absolute right-1.5 bottom-1.5">
          <SendIcon size={20} />
        </Button>
      </label>
    </form>
  );
};

export default MessageInput;
