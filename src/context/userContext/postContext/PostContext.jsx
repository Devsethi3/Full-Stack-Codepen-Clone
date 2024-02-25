import { collection, getDocs, query } from "firebase/firestore";
import { createContext, useContext, useEffect, useState } from "react";
import { db } from "../../../config/firebaseConfig";

export const ProjectContext = createContext();

export const useProjectState = () => {
  return useContext(ProjectContext);
};

export const ProjectContextProvider = ({ children }) => {
  const [listOfProject, setListOfProject] = useState([]);

  useEffect(() => {
    getAllProjects();
  }, []);

  const getAllProjects = async () => {
    try {
      const q = query(collection(db, "Projects"));
      const querySnapshot = await getDocs(q);
      const projectData = querySnapshot.docs.map((doc) => doc.data());

      setListOfProject(projectData);
    } catch (error) {
      console.error("Error fetching user project:", error);
    }
  };
  return (
    <>
      <ProjectContext.Provider value={{ listOfProject }}>
        {children}
      </ProjectContext.Provider>
    </>
  );
};
