import { useState } from "react";
import { FaEye, FaEyeSlash, FaGithub } from "react-icons/fa6";
import { MdEmail } from "react-icons/md";
import { RiLockPasswordFill } from "react-icons/ri";
import { FcGoogle } from "react-icons/fc";
import { Link } from "react-router-dom";
import { FaArrowLeftLong } from "react-icons/fa6";
import { signInWithGoogle } from "../utils/helpers";
import { motion } from "framer-motion";

const SignUp = () => {
  const [showPass, setShowPass] = useState(false);
  const [isLogin, setIsLogin] = useState(true);

  return (
    <>
      <Link className="absolute top-[5%] left-[5%]" to="/">
        <FaArrowLeftLong className="text-[3rem] p-4 rounded-full bg-gray-800 hover:bg-slate-900" />
      </Link>
      <div className="flex items-center flex-col justify-center w-full h-screen">
        <h1 className="mb-8 text-center font-bold text-xl">
          Welcome to Name Lorem Ipusm
        </h1>

        <div className="w-[500px] bg-secondary min-h-[60vh] py-5 px-5 rounded-md">
          <div className="flex mb-4 flex-col gap-1">
            <label className="text-sm" htmlFor="email">
              Email
            </label>
            <div className="flex bg-[#363636] py-2.5 px-5 rounded-md items-center gap-4">
              <MdEmail className="text-xl opacity-70" />
              <input
                type="email"
                className="bg-transparent outline-none w-full"
                placeholder="johndoe@gmail.com"
              />
            </div>
          </div>
          <div className="flex flex-col gap-1">
            <label className="text-sm" htmlFor="email">
              Password
            </label>
            <div className="flex bg-[#363636] py-2.5 px-5 rounded-md items-center gap-4">
              <RiLockPasswordFill className="text-xl opacity-70" />
              <input
                type={`${showPass ? "text" : "password"}`}
                className="bg-transparent outline-none w-full"
                placeholder="At least 6 digits"
              />
              {showPass ? (
                <FaEye
                  onClick={() => setShowPass(!showPass)}
                  className="cursor-pointer text-xl"
                />
              ) : (
                <FaEyeSlash
                  onClick={() => setShowPass(!showPass)}
                  className="cursor-pointer text-xl"
                />
              )}
            </div>
          </div>
          <button className="py-2 text-lg font-medium bg-emerald-500 hover:bg-emerald-600 mt-8 rounded-md text-white w-full">
            {isLogin ? "Sign Up" : "Login"}
          </button>
          <p className="mt-3 text-gray-300">
            Already have a an account?{" "}
            <span
              onClick={() => setIsLogin(!isLogin)}
              className="underline cursor-pointer text-emerald-500"
            >
              Login Here
            </span>
          </p>
          <span className="relative mt-5 flex justify-center">
            <div className="absolute inset-x-0 top-1/2 h-px -translate-y-1/2 bg-transparent bg-gradient-to-r from-transparent via-gray-500 to-transparent opacity-75"></div>

            <span className="relative z-10 bg-secondary  px-6">or</span>
          </span>
          <motion.button
            whileTap={{ scale: 0.95 }}
            onClick={signInWithGoogle}
            className="flex items-center gap-3 w-full py-2.5 bg-[#474646] rounded-md justify-center mt-5"
          >
            <FcGoogle />
            <span>Sign Up With Google</span>
          </motion.button>
          <button className="flex items-center gap-3 w-full py-2.5 bg-[#474646] rounded-md justify-center mt-5">
            <FaGithub />
            <span>Sign Up With Google</span>
          </button>
        </div>
      </div>
    </>
  );
};

export default SignUp;
