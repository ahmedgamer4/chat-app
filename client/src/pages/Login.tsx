import LoginForm from "../components/LoginForm";
import { Link } from "react-router-dom";
import google from "/icons/Google.svg";
import facebook from "/icons/Facebook.svg";
import github from "/icons/Gihub.svg";

const Login = () => {
  return (
    <div className="w-96 px-6 sm:px-10 py-8 border rounded-xl flex flex-col items-center">
      <div className="w-full">
        <h3 className="max-w-[310px] font-semibold">Login</h3>
        <LoginForm />
      </div>
      <p className="text-gray-500 text-[14px] mt-5 dark:text-gray-300">
        or continue with social profile
      </p>
      <div className="flex justify-between w-[69%] mt-6">
        <button>
          <img src={google} alt="google_icon" />
        </button>
        <button>
          <img src={github} alt="github_icon" />
        </button>
        <button>
          <img src={facebook} alt="facebook_icon" />
        </button>
      </div>
      <p className="mt-6 text-gray-500 dark:text-gray-300 text-[14px]">
        Don't have an account yet?{" "}
        <Link to="/register" className="text-blue-600 hover:underline">
          Register
        </Link>
      </p>
    </div>
  );
};

export default Login;
