// @ts-nocheck
import { useAtom } from "jotai";
import * as React from "react";
import { useEffect } from "react";
import { Navigate, Route, Routes, useNavigate } from "react-router-dom";
import { Toaster } from "./components/ui/Toaster";
import { userAtom } from "./context/atoms";
import useDarkMode from "./hooks/useDarkMode";
import Edit from "./pages/Edit";
import Login from "./pages/Login";
import Register from "./pages/Register";
import { setToken, token } from "./services/auth";
import { getUser } from "./services/user";
import { Skeleton } from "./components/ui/Skeleton";

const Chat = React.lazy(() => import("./pages/Chat"));
const Profile = React.lazy(() => import("./pages/Profile"));

const Loading = () => {
  return (
    <Skeleton className="w-[97%] h-[90%] rounded-lg dark:bg-slate-900 bg-gray-100" />
  );
};

function App() {
  const navigate = useNavigate();
  const dark = useDarkMode();
  const [, setUser] = useAtom(userAtom);

  useEffect(() => {
    const loggedUser = localStorage.getItem("loggedUser");

    if (loggedUser) {
      const token = JSON.parse(loggedUser);
      setToken(token.token);
      getUser(token.user.id).then((user) => {
        setUser(user);
      });
    }
    if (!token.token) navigate("/login");
  }, []);

  return (
    <div className="h-screen flex flex-col justify-center items-center">
      <React.Suspense fallback={<Loading />}>
        <Routes>
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/edit" element={<Edit />} />
          <Route path="/chat" element={<Chat />} />
          <Route path="*" element={<Navigate replace to="/login" />} />
        </Routes>
        <Toaster />
      </React.Suspense>
    </div>
  );
}

export default App;
