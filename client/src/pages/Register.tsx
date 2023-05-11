import { Link } from "react-router-dom";
import RegisterForm from "../components/RegisterForm";
import facebook from "/icons/Facebook.svg";
import github from "/icons/Gihub.svg";
import google from "/icons/Google.svg";

const Register = () => {
  return (
    <div className="w-96 px-6 sm:px-10  py-8 border rounded-xl flex flex-col items-center">
      <div>
        <h3 className="max-w-[310px] font-semibold">
          Join thousands of learners from around the world
        </h3>
        <p
          className="text-gray-800 text-sm mt-3
          dark:text-gray-200"
        >
          Master web development by making real-life projects. There are
          multiple paths for you to choose
        </p>
        <RegisterForm />
      </div>
      <p className="text-gray-500 text-[14px] mt-5 dark:text-gray-300">
        or continue with social profile
      </p>
      <div className="flex justify-between w-[69%] mt-4">
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
      <p className="mt-5 text-sm">
        Already a member?{" "}
        <Link to="/login" className="text-blue-600 hover:underline">
          Login
        </Link>
      </p>
    </div>
  );
};

export default Register;
