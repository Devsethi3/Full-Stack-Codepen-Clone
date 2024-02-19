import { useState } from "react";
import { MdHome, MdOutlineKeyboardDoubleArrowLeft } from "react-icons/md";
import { FaCode } from "react-icons/fa6";
import { FaSearch } from "react-icons/fa";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import Projects from "../components/projects/Projects";

const Home = () => {
  
  const [isSideMenu, setIsSideMenu] = useState(true);
  const [user, setUser] = useState(null);

  return (
    <>
      <div className="w-full h-screen flex gap-12 min-h-screen">
        <div
          className={`w-[250px] ${
            isSideMenu ? "w-[250px]" : "w-[5px]"
          } h-screen max-h-screen relative px-3 py-6 flex flex-col items-center justify-start gap-4 transition-all duration-200 ease-in-out bg-secondary`}
        >
          <motion.div
            whileTap={{ scale: 0.8 }}
            onClick={() => setIsSideMenu(!isSideMenu)}
            className="w-10 h-8 bg-secondary rounded-tr-lg rounded-br-lg cursor-pointer flex items-center justify-center -right-8 absolute"
          >
            <MdOutlineKeyboardDoubleArrowLeft className="text-white text-xl bg-none" />
          </motion.div>
          <div className="overflow-hidden justify-center items-center  w-full flex flex-col gap-12">
            <Link className="bg-transparent" to="/">
              <img
                className="object-contain"
                src="/logo.png"
                alt="logo"
                width={150}
                height={150}
              />
            </Link>
            <Link to="/new-project">
              <button className="flex whitespace-nowrap items-center gap-2 py-2 px-6 border-2 border-[#7c7c7c] rounded-md">
                <FaCode />
                <span>Start Coding</span>
              </button>
            </Link>

            {user && (
              <Link to="/projects">
                <button className="flex whitespace-nowrap items-center gap-2 py-2 px-6 border-2 border-[#ffffff00] bg-primary shadow-lg rounded-md">
                  <MdHome />
                  <span>Go To Home</span>
                </button>
              </Link>
            )}
          </div>
        </div>
        <div className="mx-6 w-full h-screen">
          <div className="py-6 items-center flex gap-4">
            <div className="bg-secondary py-2.5 rounded-md px-4 flex items-center gap-3 w-[90%]">
              <FaSearch className="mr-3 opacity-70" />
              <input
                className="w-full outline-none bg-transparent"
                type="text"
                placeholder="Search Here..."
              />
            </div>
            <div className={` ${user ? "w-[15%]" : "w-[10%]"} w-[10%]`}>
              {user ? (
                <div className="">
                  <Link to="/auth">Sign Up</Link>
                </div>
              ) : (
                <motion.div whileTap={{ scale: 0.9 }} className="">
                  <Link
                    className="py-3 px-6 bg-teal-600 hover:bg-teal-700 rounded-md"
                    to="/auth"
                  >
                    Login
                  </Link>
                </motion.div>
              )}
            </div>
          </div>
          <Projects />
        </div>
      </div>
    </>
  );
};

export default Home;