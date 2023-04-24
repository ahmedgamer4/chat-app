import { Button } from "./ui/Button";
import { Input } from "./ui/Input";
import { Link } from 'react-router-dom'
import lockIcon from '/icons/lock.svg'
import emailIcon from '/icons/email.svg'
import { MailIcon } from "lucide-react";

const RegisterForm = () => {
  return (
    <form>
      <label htmlFor="email" className="w-full">
        <MailIcon />
        <Input id="email" className="mt-4 relative pl-8" placeholder="Email" />
      </label>
      <label htmlFor="password" className="w-full">
        <img src={lockIcon} alt="user_icon" className="absolute translate-x-2 translate-y-[1.7rem] z-10 w-[1.1rem]" />
        <Input id="password" className="mt-4 relative pl-8" placeholder="Password" />
      </label>
      <Button variant='default' className="mt-4 w-full" >Start coding now</Button>
      <p className="mt-6 text-sm">Already a member? <Link to="/login" className="text-blue-600 hover:underline">Login</Link></p>
    </form>
  )
}

export default RegisterForm
