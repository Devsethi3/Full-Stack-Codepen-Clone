import { motion } from "framer-motion";
import { Link } from "react-router-dom";

const ProjectCard = ({ project, index, docId }) => {
  return (
    <>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.5, delay: index * 0.2 }}
        key={index}
        className="rounded-md p-3 bg-secondary overflow-hidden"
      >
        <iframe
          frameborder="0"
          title="Result"
          srcDoc={project.output}
          allowFullScreen="true"
          className="w-full h-[200px] rounded-md"
        ></iframe>
        <div className="flex  mt-4 items-center gap-3">
          <div className="w-10 h-10 bg-emerald-600 rounded-full cursor-pointer overflow-hidden grid place-items-center">
            {project?.userImage ? (
              <>
                <img
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
          <div className="flex flex-col">
            <Link to={`project/${docId}`}>
              <h4 className="font-medium text-xl">{project.title}</h4>
            </Link>
            <p className="opacity-70 text-sm">{project.userName}</p>
          </div>
        </div>
      </motion.div>
    </>
  );
};

export default ProjectCard;
