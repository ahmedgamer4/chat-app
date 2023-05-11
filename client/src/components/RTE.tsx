import { RichTextEditor, Link } from "@mantine/tiptap";
import { useEditor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Underline from "@tiptap/extension-underline";
import TextAlign from "@tiptap/extension-text-align";
import Superscript from "@tiptap/extension-superscript";
import SubScript from "@tiptap/extension-subscript";
import { Loader2, SendIcon } from "lucide-react";
import { Button } from "./ui/Button";
import { socket } from "../services/socket";
import { useAtom } from "jotai";
import { groupAtom, userAtom } from "../context/atoms";
import { useState } from "react";

const MessageInput = () => {
  const [group] = useAtom(groupAtom);
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
  });

  const [sendLoading, setSendLoading] = useState(false);

  const sendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    const htmlContent = editor ? editor.getHTML() : "";

    setSendLoading(true);
    socket.emit(
      "createMessage",
      {
        group_id: group.id,
        content: htmlContent,
        user: user,
      },
      () => {
        setSendLoading(false);
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

          <RichTextEditor.Content className="max-h-24 sm:max-h-24 md:max-h-32 overflow-y-scroll" />
        </RichTextEditor>
        <Button
          disabled={sendLoading}
          className="h-9 w-9 p-2 absolute right-1.5 bottom-1.5"
        >
          {sendLoading ? (
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
          ) : (
            <SendIcon size={20} />
          )}
        </Button>
      </label>
    </form>
  );
};

export default MessageInput;
