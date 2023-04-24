import useDarkMode from "./hooks/useDarkMode";
import Register from "./pages/Register";

const Themes = ['dark', 'light'] as const
type Theme = (typeof Themes)[number]

function App() {
  const [, toggleTheme] = useDarkMode()
  return (
    <div className="min-h-screen flex justify-center items-center">
      <Register />
    </div >
  )
}

export default App;
