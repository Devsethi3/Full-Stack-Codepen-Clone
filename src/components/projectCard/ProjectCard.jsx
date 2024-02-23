import { motion } from "framer-motion";
import { useState } from "react";
import { MdBookmark } from "react-icons/md";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

const ProjectCard = ({ index, project }) => {
  const user = useSelector((state) => state.user?.user);

  return (
    <>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.5, delay: index * 0.2 }}
        key={index}
        className="w-full md:w-[380px] cursor-pointer p-3 bg-secondary rounded-md items-center justify-center gap-4"
      >
        <div className="bg-primary w-full h-[250px] rounded-md overflow-hidden">
          <iframe
            title="Result"
            srcDoc={project.output}
            style={{ border: "none", width: "100%", height: "100%" }}
          />
        </div>
        <div className="flex mt-4 items-center justify-between gap-3 w-full">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-emerald-500 rounded-full cursor-pointer overflow-hidden grid place-items-center">
              {project?.userImage ? (
                <>
                  <motion.img
                    src={project?.userImage}
                    alt={project?.userName}
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover"
                  />
                </>
              ) : (
                <p className="text-xl text-white font-semibold uppercase">
                  {project?.email[0]}
                </p>
              )}
            </div>
            <Link to={`/projects/${project.id}`}>
              <div className="flex flex-col">
                <p className="text-gray-200 text-xl font-medium">
                  {project.title}
                </p>
                <span className="text-sm text-gray-400 -mt-1">
                  {project.userName}
                </span>
              </div>
            </Link>
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
