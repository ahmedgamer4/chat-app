import { useSearchParams } from "react-router-dom";
import { Group } from "../services/group";
import { useAtom } from "jotai";
import { groupAtom } from "../context/atoms";
import { groupExists } from "../context/groupExists";

type GroupBoxProps = {
  group: Group;
};

const GroupBox = ({ group }: GroupBoxProps) => {
  const [first, second] = group.name.split(" ");
  const [, setGroup] = useAtom(groupAtom);
  const [, setSearchParams] = useSearchParams({});
  const [, setGroupOpen] = useAtom(groupExists);

  const onClick = () => {
    setGroup(group);
    setSearchParams({ group_id: group.id.toString() });
    setGroupOpen(true);
  };

  return (
    <button
      onClick={onClick}
      className="mt-4 flex items-center w-full gap-3 overflow-x-hidden"
    >
      <span
        className="flex justify-center items-center uppercase font-bold text-lg bg-slate-900 w-10 h-10 rounded-md
            text-white"
      >
        {first[0]}
        {second ? second[0] : null}
      </span>
      <p className="text-sm font-bold uppercase">{group.name}</p>
    </button>
  );
};

export default GroupBox;
