import { useAtom } from "jotai";
import { Loader2, LockIcon, MailIcon } from "lucide-react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { userAtom } from "../context/atoms";
import { useToast } from "../hooks/useToast";
import { loginUser, setToken } from "../services/auth";
import { Button } from "./ui/Button";
import { Input } from "./ui/Input";

const LoginForm = () => {
  const { toast } = useToast();
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [, setUser] = useAtom(userAtom);
  const [loading, setLoading] = useState(false);

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
      setLoading(true);
      const token = await loginUser(userToLogin);

      setLoading(false);

      localStorage.setItem("loggedUser", JSON.stringify(token));
      setToken(token.token);

      if (token.user && token.user.id) {
        setUser(token.user);
        navigate("/profile");
      }

      setEmail("");
      setPassword("");
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
      <Button variant="default" className="mt-4 w-full" disabled={loading}>
        {loading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : null}
        Start coding now
      </Button>
    </form>
  );
};

export default LoginForm;
