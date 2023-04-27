import { Input } from "../components/ui/Input";
import { Button } from "../components/ui/Button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogTitle,
} from "../components/ui/Dialog";
import { Textarea } from "../components/ui/Textarea";
import SearchNav from "../components/SearchNav";
import { useState } from "react";
import { useToast } from "../hooks/useToast";
import { createGroup } from "../services/group";
import { Loader2 } from "lucide-react";

const Chat = () => {
  const { toast } = useToast();
  const [groupName, setGroupName] = useState("");
  const [groupDescription, setGroupDescription] = useState("");
  const [isLoading, setLoading] = useState(false);

  const onCreateGroup = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!groupName || !groupDescription) {
      toast({
        title: "Invalid Data",
        description: "missing name or description",
      });
    }

    const newGroup = {
      name: groupName,
      description: groupDescription,
    };

    setLoading(true);
    await createGroup(newGroup);
    setLoading(false);
    setGroupName("");
    setGroupDescription("");
  };

  return (
    <Dialog>
      <div className="flex w-full min-h-screen">
        <SearchNav />
        <section className="flex-grow">
          <h1 className="border-b"></h1>
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
