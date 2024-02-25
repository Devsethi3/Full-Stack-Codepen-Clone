import { useEffect, useState } from "react";
import { FaEye, FaEyeSlash, FaGithub } from "react-icons/fa6";
import { MdEmail } from "react-icons/md";
import { RiLockPasswordFill } from "react-icons/ri";
import { FcGoogle } from "react-icons/fc";
import { Link } from "react-router-dom";
import { FaArrowLeftLong } from "react-icons/fa6";
import { signInWithGithub, signInWithGoogle } from "../../utils/helpers";
import { motion, AnimatePresence } from "framer-motion";
import {
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  signInWithEmailAndPassword,
} from "firebase/auth";
import { auth } from "../../config/firebaseConfig";

const SignUp = () => {
  const [showPass, setShowPass] = useState(false);
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [alert, setAlert] = useState(false);
  const [alertMesssage, setAlertMessage] = useState("");

  const validateEmail = (value) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!value) {
      setEmailError("Email is required");
    } else if (!emailRegex.test(value)) {
      setEmailError("Invalid email format");
    } else {
      setEmailError("");
    }
  };

  const validatePassword = (value) => {
    if (!value) {
      setPasswordError("Password is required");
    } else if (value.length < 6) {
      setPasswordError("Password must be at least 6 characters long");
    } else {
      setPasswordError("");
    }
  };

  const createNewUser = async () => {
    if (validateEmail && validatePassword) {
      await createUserWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
          if (userCredential) {
            console.log(userCredential);
          }
        })
        .catch((err) => {
          console.log("Something went wrong");
        });
    }
  };

  const loginWithEmailPassword = async () => {
    if (validateEmail && validatePassword) {
      await signInWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
          if (userCredential) {
            console.log(userCredential);
          }
        })
        .catch((err) => {
          console.log(err.message);
          if (err.message.includes("invalid-credential")) {
            setAlert(true);
            setAlertMessage("Invalid Id : User Not Found");
          } else {
            setAlert(true);
            setAlertMessage("Temporarily disabled due to manu failed login");
          }
          setInterval(() => {
            setAlert(false);
          }, 3000);
        });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    validateEmail(email);
    validatePassword(password);

    if (!emailError && !passwordError) {
      createNewUser();
    } else {
      console.log("Form has errors, please fix them");
    }
  };

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
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                onBlur={() => validateEmail(email)}
                className="bg-transparent outline-none w-full"
                placeholder="johndoe@gmail.com"
              />
            </div>
            {emailError && <p className="text-red-500 text-sm">{emailError}</p>}
          </div>
          <div className="flex flex-col gap-1">
            <label className="text-sm" htmlFor="password">
              Password
            </label>
            <div className="flex bg-[#363636] py-2.5 px-5 rounded-md items-center gap-4">
              <RiLockPasswordFill className="text-xl opacity-70" />
              <input
                type={`${showPass ? "text" : "password"}`}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                onBlur={() => validatePassword(password)}
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
            {passwordError && (
              <p className="text-red-500 text-sm">{passwordError}</p>
            )}
          </div>

          {/* Alert Message */}

          <AnimatePresence>
            {alert && (
              <motion.p
                key={"AlertMessage"}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="text-red-500 text-center mt-8"
              >
                {alertMesssage}
              </motion.p>
            )}
          </AnimatePresence>

          {isLogin ? (
            <button
              onClick={handleSubmit}
              className="py-2 text-lg font-medium bg-emerald-500 hover:bg-emerald-600 mt-8 rounded-md text-white w-full"
            >
              Sign Up
            </button>
          ) : (
            <button
              onClick={loginWithEmailPassword}
              className="py-2 text-lg font-medium bg-emerald-500 hover:bg-emerald-600 mt-8 rounded-md text-white w-full"
            >
              Login
            </button>
          )}
          <p className="mt-3 text-gray-300">
            Already have an account?{" "}
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
          <motion.button
            whileTap={{ scale: 0.95 }}
            onClick={signInWithGithub}
            className="flex items-center gap-3 w-full py-2.5 bg-[#474646] rounded-md justify-center mt-5"
          >
            <FaGithub />
            <span>Sign Up With GitHub</span>
          </motion.button>
        </div>
      </div>
    </>
  );
};

export default SignUp;
