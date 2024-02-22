import { motion } from "framer-motion";
const ProjectCard = ({ index, project }) => {
  return (
    <>
      <motion.div
        key={index}
        className="w-full cursor-pointer md:w-[450px] h-[305px] bg-secondary rounded-md items-center justify-center gap-4"
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
      </motion.div>
    </>
  );
};

export default ProjectCard;
