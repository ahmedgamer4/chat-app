import { Button } from "./ui/Button";
import { Input } from "./ui/Input";
import { UserIcon } from "lucide-react";
import { LockIcon } from "lucide-react";
import { MailIcon } from "lucide-react";
import { registerUser } from "../services/auth";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useToast } from "../hooks/useToast";

const RegisterForm = () => {
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { toast } = useToast();

  const onRegister = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!name || !email || !password) {
      toast({
        title: "Invalid Data",
        description: "please provide the required data",
      });
      return;
    }

    const userToRegister = {
      name,
      email,
      password,
    };

    await registerUser(userToRegister);
    navigate("/login");
  };

  return (
    <form onSubmit={onRegister}>
      <label htmlFor="username" className="w-full">
        <UserIcon
          className="absolute translate-x-2 translate-y-[0.7rem] z-10 w-[1.1rem]"
          size={18}
        ></UserIcon>
        <Input
          id="username"
          className="mt-6 relative pl-8"
          placeholder="Username"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
      </label>
      <label htmlFor="email" className="w-full">
        <MailIcon
          className="absolute translate-x-2 translate-y-[1.7rem] z-10 w-[1.1rem]"
          size={18}
        />
        <Input
          id="email"
          className="mt-4 relative pl-8"
          placeholder="Email"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
      </label>
      <label htmlFor="password" className="w-full">
        <LockIcon
          className="absolute translate-x-2 translate-y-[1.7rem] z-10 w-[1.1rem]"
          size={18}
        ></LockIcon>
        <Input
          id="password"
          type="password"
          className="mt-4 relative pl-8"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
      </label>
      <Button variant="default" className="mt-4 w-full">
        Start coding now
      </Button>
    </form>
  );
};

export default RegisterForm;
