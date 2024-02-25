import { motion, AnimatePresence } from "framer-motion";
import { FaUserCircle } from "react-icons/fa";
import { FaChevronDown } from "react-icons/fa6";
import { Link } from "react-router-dom";
import { VscProject } from "react-icons/vsc";
import { TbLogout } from "react-icons/tb";
import { MdCollectionsBookmark } from "react-icons/md";
import { singOutAction } from "../../utils/helpers";
import { useState } from "react";

const UserInfo = ({ user }) => {
  const [isMenu, setIsMenu] = useState(false);

  return (
    <>
      <div className="flex items-center justify-center relative gap-4">
        <div className="w-12 h-12 bg-emerald-500 rounded-full cursor-pointer overflow-hidden grid place-items-center">
          {user?.photoURL ? (
            <>
              <motion.img
                src={user?.photoURL}
                alt={user?.displayName}
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover"
              />
            </>
          ) : (
            <p className="text-xl text-white font-semibold uppercase">
              {user?.email[0]}
            </p>
          )}
        </div>
        <motion.div
          onClick={() => setIsMenu(!isMenu)}
          whileTap={{ scale: 0.9 }}
          className=" grid bg-secondary place-items-center rounded-full p-4 cursor-pointer"
        >
          <FaChevronDown className="opacity-70" />
        </motion.div>
        {isMenu && (
          <AnimatePresence>
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 50 }}
              className="bg-secondary absolute top-16 right-0 px-4 py-3 rounded-md shadow-lg z-20 flex flex-col items-start justify-start gap-3 min-w-[200px]"
            >
              <Link
                to="/"
                className=" text-lg hover:bg-[#ffffff0d] flex items-center gap-4 px-2 py-1 w-full rounded-md"
              >
                <VscProject className="opacity-60" />
                <span className="text-gray-500">Project</span>
              </Link>
              <Link
                to="/"
                className=" text-lg hover:bg-[#ffffff0d] flex items-center gap-4 px-2 py-1 w-full rounded-md"
              >
                <MdCollectionsBookmark className="opacity-60" />
                <span className="text-gray-500">Collection</span>
              </Link>
              <Link
                to="/"
                className=" text-lg hover:bg-[#ffffff0d] flex items-center gap-4 px-2 py-1 w-full rounded-md"
              >
                <FaUserCircle className="opacity-60" />
                <span className="text-gray-500">Profile</span>
              </Link>
              <button
                onClick={singOutAction}
                className=" text-lg hover:bg-[#ffffff0d] flex items-center gap-4 px-2 py-1 w-full rounded-md"
              >
                <TbLogout className="opacity-60" />
                <span className="text-gray-500">Logout</span>
              </button>
            </motion.div>
          </AnimatePresence>
        )}
      </div>
    </>
  );
};

export default UserInfo;
