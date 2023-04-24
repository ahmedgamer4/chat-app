import RegisterForm from "../components/RegisterForm"

const Register = () => {
  return (
    <div className="w-96 px-9 py-8 border border-gray-200 rounded-xl flex flex-col items-center">
      <div>
        <h3 className="max-w-[310px] font-semibold">Join thousands of learners from around the world</h3>
        <p className="text-gray-800 text-sm mt-3">
          Master web development by making real-life projects.
          There are multiple paths for you to choose
        </p>
        <RegisterForm />
      </div>
    </div>

  )
}

export default Register
