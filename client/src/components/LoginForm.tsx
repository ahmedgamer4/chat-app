import { useState } from "react";
import { Button } from "./ui/Button";
import { Input } from "./ui/Input";
import { LockIcon, MailIcon } from "lucide-react";
import { loginUser, setToken } from "../services/auth";
import { useAtom } from "jotai";
import { userAtom } from "../context/atoms";
import { toast } from "../hooks/useToast";
import { useNavigate } from "react-router-dom";

const LoginForm = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [, setUser] = useAtom(userAtom);

  const onLogin = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!email || !password) {
      toast({
        title: "Invalid Data",
        description: "please provide the required data",
      });
      return;
    }

    const userToLogin = {
      email,
      password,
    };

    try {
      const token = await loginUser(userToLogin);

      localStorage.setItem("loggedUser", JSON.stringify(token));
      setToken(token.token);

      if (token.user && token.user.id) {
        setUser(token.user);
        navigate("/profile");
      }

      setEmail("");
      setPassword("");

      console.log("user", token.user);
      console.log("token", token.token);
    } catch (error) {
      toast({
        title: "Invalid Data",
        description: "invalid email or password",
      });
    }
  };

  return (
    <form className="mt-8" onSubmit={onLogin}>
      <label htmlFor="email" className="w-full">
        <MailIcon
          className="absolute translate-x-2 translate-y-[0.7rem] z-10 w-[1.1rem]"
          size={18}
        />
        <Input
          id="email"
          className="mt-4 relative pl-8"
          placeholder="Email"
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
          type="password"
          id="password"
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

export default LoginForm;
