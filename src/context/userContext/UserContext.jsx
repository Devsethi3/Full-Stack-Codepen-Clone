import { onAuthStateChanged } from "firebase/auth";
import { createContext, useContext, useEffect, useState } from "react";
import { auth } from "../../config/firebaseConfig";

export const UserContext = createContext();

export const useUserState = () => {
  return useContext(UserContext);
};

export const UserContextProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        setUser(user);
      }
    });

    return () => unsubscribe();
  }, []);
  return (
    <>
      <UserContext.Provider value={{ user }}>{children}</UserContext.Provider>
    </>
  );
};
