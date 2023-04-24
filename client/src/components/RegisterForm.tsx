import { Button } from "./ui/Button";
import { Input } from "./ui/Input";
import { Link } from 'react-router-dom'
import { UserIcon } from "lucide-react";
import { LockIcon } from "lucide-react";
import { MailIcon } from "lucide-react";

const RegisterForm = () => {
  return (
    <form>
      <label htmlFor="username" className="w-full">
        <UserIcon className="absolute translate-x-2 translate-y-[0.7rem] z-10 w-[1.1rem]" size={18}></UserIcon>
        <Input id="username" className="mt-6 relative pl-8" placeholder="Username" />
      </label>
      <label htmlFor="email" className="w-full">
        <MailIcon className="absolute translate-x-2 translate-y-[1.7rem] z-10 w-[1.1rem]" size={18} />
        <Input id="email" className="mt-4 relative pl-8" placeholder="Email" />
      </label>
      <label htmlFor="password" className="w-full">
        <LockIcon className="absolute translate-x-2 translate-y-[1.7rem] z-10 w-[1.1rem]" size={18}></LockIcon>
        <Input id="password" className="mt-4 relative pl-8" placeholder="Password" />
      </label>
      <Button variant='default' className="mt-4 w-full" >Start coding now</Button>
      <p className="mt-6 text-sm">Already a member? <Link to="/login" className="text-blue-600 hover:underline">Login</Link></p>
    </form>
  )
}

export default RegisterForm
