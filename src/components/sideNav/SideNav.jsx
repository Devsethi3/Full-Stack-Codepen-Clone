import { FaCode } from "react-icons/fa6";
import { FaHome } from "react-icons/fa";
import { Link } from "react-router-dom";
import {
  MdKeyboardDoubleArrowLeft,
  MdKeyboardDoubleArrowRight,
} from "react-icons/md";
import { useState } from "react";

const SideNav = () => {
  const [isOpen, setIsOpen] = useState(true);
  return (
    <>
      <div
        className={`${
          isOpen ? "w-[300px]" : "w-[10px]"
        } flex items-center flex-col gap-12 transition-all duration-200 ease-in-out relative min-h-screen bg-secondary py-8`}
      >
        {isOpen ? (
          <>
            <MdKeyboardDoubleArrowRight
              onClick={() => setIsOpen(!isOpen)}
              className="absolute -right-8 cursor-pointer rounded-md top-7 text-4xl p-2 bg-secondary"
            />
          </>
        ) : (
          <>
            <MdKeyboardDoubleArrowLeft
              onClick={() => setIsOpen(!isOpen)}
              className="absolute -right-8 cursor-pointer rounded-md top-7 text-4xl p-2 bg-secondary"
            />
          </>
        )}

        <img
          className={`flex flex-col overflow-hidden ${
            isOpen ? null : "hidden"
          }`}
          src="/logo.png"
          alt="logo"
          width={150}
          height={150}
        />
        <div
          className={`flex flex-col overflow-hidden ${
            isOpen ? null : "hidden"
          } w-full px-12 gap-8`}
        >
          <Link
            to="new-project"
            className="py-2.5 whitespace-nowrap flex items-center justify-center border-[#626262] gap-2 px-8 bg-[#121317] border-2 rounded-md"
          >
            <FaCode className="text-xl" />
            <span>Start Coding</span>
          </Link>
          <Link
            to="/"
            className="py-2.5 whitespace-nowrap flex items-center justify-center gap-2 px-8 border-[#626262] border-2 rounded-md"
          >
            <FaHome className="text-xl" />
            <span>Home</span>
          </Link>
        </div>
      </div>
    </>
  );
};

export default SideNav;
