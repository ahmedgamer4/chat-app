import { useAtom } from "jotai";
import { useEffect } from "react";
import { Navigate, Route, Routes, useNavigate } from "react-router-dom";
import { Toaster } from "./components/ui/Toaster";
import { userAtom } from "./context/atoms";
import useDarkMode from "./hooks/useDarkMode";
import Edit from "./pages/Edit";
import Login from "./pages/Login";
import Profile from "./pages/Profile";
import Register from "./pages/Register";
import { setToken, token } from "./services/auth";
import Chat from "./pages/Chat";
import * as React from "react";

import { ScrollArea } from "./components/ui/ScrollArea";
import { Separator } from "./components/ui/Separator";

const tags = Array.from({ length: 50 }).map(
  (_, i, a) => `v1.2.0-beta.${a.length - i}`
);

export function ScrollAreaDemo() {
  return (
    <ScrollArea className="h-72 w-48 rounded-md border">
      <div className="p-4">
        <h4 className="mb-4 text-sm font-medium leading-none">Tags</h4>
        {tags.map((tag) => (
          <React.Fragment>
            <div className="text-sm" key={tag}>
              {tag}
            </div>
            <Separator className="my-2" />
          </React.Fragment>
        ))}
      </div>
    </ScrollArea>
  );
}

function App() {
  const navigate = useNavigate();
  const {} = useDarkMode();
  const [user, setUser] = useAtom(userAtom);

  useEffect(() => {
    const loggedUser = localStorage.getItem("loggedUser");

    if (loggedUser) {
      const token = JSON.parse(loggedUser);
      setToken(token.token);
      setUser(token.user);
      console.log(user);
    }
    if (!token.token) navigate("/login");
    console.log(token);
  }, []);

  return (
    <div className="min-h-screen flex flex-col justify-center items-center">
      <Routes>
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/edit" element={<Edit />} />
        <Route path="/chat" element={<Chat />} />
        {/* <Route path="*" element={<Navigate replace to="/login" />} /> */}
      </Routes>
      <Toaster />
    </div>
  );
}

export default App;
