import { useSelector } from "react-redux";
import ProjectCard from "../projectCard/ProjectCard";

const Projects = () => {
  const projects = useSelector((state) => state.projects?.projects);
  return (
    <>
      <div className="w-full py-6 flex items-center justify-center gap-5 flex-wrap">
        <ProjectCard />
        {/* {projects &&
          projects.map((project, index) => (
            <ProjectCard key={index} project={project} index={index} />
          ))} */}
      </div>
    </>
  );
};

export default Projects;
