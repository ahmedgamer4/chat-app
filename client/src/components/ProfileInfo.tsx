import { useAtom } from "jotai";
import { Button } from "../components/ui/Button";
import { Separator } from "../components/ui/Separator";
import { userAtom } from "../context/atoms";

const ProfileInfo = () => {
  const [user] = useAtom(userAtom);

  return (
    <section className="flex flex-col items-center mx-auto w-full max-w-[800px] min-w-[200px]">
      <h1 className="mx-auto text-3xl">Personal Info</h1>
      <p className="mx-auto text-sm mt-4">
        Basic info, like your name and photo
      </p>
      <div className="mt-9 border rounded-lg w-full text-gray-600 text-sm dark:text-white">
        <section className="flex justify-between py-5 px-6">
          <div>
            <h4 className="text-xl">Profile</h4>
            <p className="text-xs">Some info may be visibel to other people</p>
          </div>
          <Button variant="outline">Edit</Button>
        </section>
        <Separator />
        <section className="flex justify-between py-5 px-6">
          <p>PHOTO</p>
          <img
            className="w-14 h-14 rounded-lg text-white bg-slate-700"
            src={user.photo}
            alt={user.name}
          />
        </section>
        <Separator />
        <section className="flex justify-between py-5 px-6">
          <p>NAME</p>
          <p className="text-gray-900 text-base dark:text-white">{user.name}</p>
        </section>
        <Separator />
        <section className="flex justify-between py-5 px-6">
          <p>BIO</p>
          <p className="text-gray-900 text-base dark:text-white">{user.bio}</p>
        </section>
        <Separator />
        <section className="flex justify-between py-5 px-6">
          <p>PHONE</p>
          <p className="text-gray-900 text-base dark:text-white">
            {user.phone}
          </p>
        </section>
        <Separator />
        <section className="flex justify-between py-5 px-6">
          <p>EMAIL</p>
          <p className="text-gray-900 text-base dark:text-white">
            {user.email}
          </p>
        </section>
        <Separator />
        <section className="flex justify-between py-5 px-6">
          <p>password</p>
          <p className="text-gray-900 text-base dark:text-white">
            ************
          </p>
        </section>
      </div>
    </section>
  );
};

export default ProfileInfo;
