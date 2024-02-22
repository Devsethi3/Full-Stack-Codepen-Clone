import { motion } from "framer-motion";
import { useState } from "react";
import { MdBookmark } from "react-icons/md";
const ProjectCard = ({ index, project }) => {
  return (
    <>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.5, delay: index * 0.2 }}
        key={index}
        className="w-full cursor-pointer md:w-[450px] h-[305px] p-3 bg-secondary rounded-md items-center justify-center gap-4"
      >
        <div
          className="bg-primary w-full h-full rounded-md overflow-hidden"
          style={{ overflow: "hidden", height: "100%" }}
        >
          <iframe
            title="Result"
            srcDoc={project.output}
            style={{ border: "none", width: "100%", height: "100%" }}
          />
        </div>
        <div className="flex items-center justify-between gap-3 w-full">
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
          <motion.div whileTap={{ scale: 0.9 }}>
            <MdBookmark className="text-gray-500 text-xl" />
          </motion.div>
        </div>
      </motion.div>
    </>
  );
};

export default ProjectCard;
