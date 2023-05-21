import { Link } from "react-router-dom";
import RegisterForm from "../components/RegisterForm";
import facebook from "/icons/Facebook.svg";
import github from "/icons/Gihub.svg";
import google from "/icons/Google.svg";

const Register = () => {
  return (
    <div className="w-80 px-6 sm:px-10  py-8 border rounded-xl flex flex-col items-center">
      <div className="w-11/12">
        <h3 className="max-w-[310px] font-semibold">
          Join Us
        </h3>
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
