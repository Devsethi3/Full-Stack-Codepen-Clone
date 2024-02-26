import { collection, getDocs, query } from "firebase/firestore";
import { db } from "../../config/firebaseConfig";
import { useEffect, useState } from "react";
import ProjectCard from "./ProjectCard";

const Projects = () => {
  const [projectsData, setProjectsData] = useState([]);
  const [docId, setDocId] = useState();

  useEffect(() => {
    getAllProjects();
  }, []);

  const getAllProjects = async () => {
    try {
      const q = query(collection(db, "Projects"));
      const querySnapshot = await getDocs(q);

      const projectsData = querySnapshot.docs.map((doc) => {
        const data = {
          id: doc.id,
          ...doc.data(),
        };
        setDocId(doc.id);
        return data;
      });

      setProjectsData(projectsData);
    } catch (error) {
      console.error("Error fetching user pins:", error);
    }
  };

  return (
    <>
      <div className="grid grid-cols-3 gap-6">
        {projectsData.map((project, index) => (
          <ProjectCard docId={docId} project={project} key={index} />
        ))}
      </div>
    </>
  );
};

export default Projects;
