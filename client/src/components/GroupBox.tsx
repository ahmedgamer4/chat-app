import { Link } from "react-router-dom";

type GroupBoxProps = {
  name: string;
  id: number;
};

const GroupBox = ({ name, id }: GroupBoxProps) => {
  const [first, second] = name.split(" ");
  return (
    <Link
      to={`${id}`}
      className="flex items-center w-full gap-3 mt-4 overflow-x-hidden"
    >
      <span className="flex justify-center items-center uppercase font-bold text-lg bg-slate-900 w-10 h-10 rounded-md">
        {first[0]}
        {second ? second[0] : null}
      </span>
      <p className="text-sm font-bold uppercase">{name}</p>
    </Link>
  );
};

export default GroupBox;
