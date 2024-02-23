import { Route, useNavigate, Routes } from "react-router-dom";
import { Home, NewProject, SignUp, SingleProject } from "./pages";
import { useEffect, useState } from "react";
import { auth, db } from "./config/firebaseConfig";
import {
  collection,
  doc,
  onSnapshot,
  orderBy,
  query,
  setDoc,
} from "firebase/firestore";
import Loading from "./components/loading/Loading";
import { useDispatch } from "react-redux";
import { SET_USER } from "./context/actions/userAction";
import { SET_PROJECTS } from "./context/actions/projectAction";

const App = () => {
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((userCredential) => {
      if (userCredential) {
        setDoc(
          doc(db, "users", userCredential?.uid),
          userCredential?.providerData[0]
        ).then(() => {
          dispatch(SET_USER(userCredential?.providerData[0]));
        });

        navigate("/", { replace: true });
      } else {
        navigate("/auth", { replace: true });
      }
      setInterval(() => {
        setIsLoading(false);
      }, 1500);
    });

    return () => unsubscribe();
  }, []);

  useEffect(() => {
    const projectQuery = query(
      collection(db, "Projects"),
      orderBy("id", "desc")
    );
    const unsubscribe = onSnapshot(projectQuery, (querySnaps) => {
      const projectList = querySnaps.docs.map((doc) => doc.data());
      dispatch(SET_PROJECTS(projectList));
    });

    return unsubscribe;
  }, []);

  return (
    <>
      {isLoading ? (
        <div className="w-screen h-screen flex items-center justify-center overflow-hidden">
          <Loading />
        </div>
      ) : (
        <div>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/auth" element={<SignUp />} />
            <Route path="/newProject" element={<NewProject />} />
            <Route path="/projects/:id" element={<SingleProject />} />
          </Routes>
        </div>
      )}
    </>
  );
};

export default App;

// {
//   userName: userCredential?.providerData[0].displayName,
//   email: userCredential?.providerData[0].email,
//   userImage: userCredential?.providerData[0].photoURL,
//   uid: userCredential?.providerData[0].uid,
//   provider: userCredential?.providerData[0].providerId,
// }
