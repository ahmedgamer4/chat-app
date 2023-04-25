import { Route, Routes } from "react-router-dom";
import Register from "./pages/Register";
import Login from "./pages/Login";
import { Toaster } from "./components/ui/Toaster";
import Profile from "./pages/Profile";
import { useEffect } from "react";
import { setToken } from "./services/auth";
import { useAtom } from "jotai";
import { userAtom } from "./context/atoms";
import useDarkMode from "./hooks/useDarkMode";
import Edit from "./pages/Edit";

function App() {
  const { toggleTheme } = useDarkMode();
  const [, setUser] = useAtom(userAtom);

  useEffect(() => {
    const loggedUser = localStorage.getItem("loggedUser");

    if (loggedUser) {
      const token = JSON.parse(loggedUser);
      setToken(token.token);
      setUser(token.user);
    }
  }, []);

  return (
    <div className="min-h-screen flex justify-center items-center">
      <Routes>
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/edit" element={<Edit />} />
      </Routes>
      <Toaster />
    </div>
  );
}

export default App;
