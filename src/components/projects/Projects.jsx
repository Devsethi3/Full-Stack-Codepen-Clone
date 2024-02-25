import { collection, getDocs, query } from "firebase/firestore";
import { db } from "../../config/firebaseConfig";
import { useEffect, useState } from "react";
import ProjectCard from "./ProjectCard";

const Projects = () => {
  const [projectsData, setProjectsData] = useState([]);

  useEffect(() => {
    getAllPins();
  }, []);
  const getAllPins = async () => {
    try {
      const q = query(collection(db, "Projects"));
      const querySnapshot = await getDocs(q);
      const projectsData = querySnapshot.docs.map((doc) => doc.data());
      setProjectsData(projectsData);
    } catch (error) {
      console.error("Error fetching user pins:", error);
    }
  };

  return (
    <>
      <div className="grid grid-cols-3 gap-6">
        {projectsData.map((project, index) => (
          <ProjectCard project={project} key={index} />
        ))}
      </div>
    </>
  );
};

export default Projects;
