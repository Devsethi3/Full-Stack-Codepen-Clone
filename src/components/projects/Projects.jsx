import { useSelector } from "react-redux";
import ProjectCard from "../projectCard/ProjectCard";
import { useEffect, useState } from "react";

const Projects = () => {
  const [filtered, setFiltered] = useState(null);

  const projects = useSelector((state) => state.projects?.projects);

  const searchTerm = useSelector((state) =>
    state.searchTerm?.searchTerm ? state.searchTerm?.searchTerm : ""
  );

  useEffect(() => {
    if (searchTerm?.length > 0) {
      setFiltered(
        projects?.filter((project) => {
          const lowerCaseItem = project?.title.toLowerCase();
          return searchTerm
            .split("")
            .every((letter) => lowerCaseItem.includes(letter));
        })
      );
    } else {
      setFiltered(null);
    }
  }, [searchTerm]);

  return (
    <>
      <div className="w-full py-6 flex items-center justify-center gap-5 flex-wrap">
        {filtered ? (
          <>
            {filtered &&
              filtered.map((project, index) => (
                <ProjectCard key={index} project={project} index={index} />
              ))}
          </>
        ) : (
          <>
            {projects &&
              projects.map((project, index) => (
                <ProjectCard key={index} project={project} index={index} />
              ))}
          </> 
        )}
      </div>
    </>
  );
};

export default Projects;
