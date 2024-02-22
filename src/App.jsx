import { Route, useNavigate, Routes } from "react-router-dom";
import { Home, NewProject, SignUp } from "./pages";
import { useEffect, useState } from "react";
import { auth, db } from "./config/firebaseConfig";
import { doc, setDoc } from "firebase/firestore";
import Loading from "./components/loading/Loading";
import { useDispatch } from "react-redux";
import { SET_USER } from "./context/actions/userAction";

const App = () => {
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((userCredential) => {
      if (userCredential) {
        console.log(userCredential?.uid);
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
          </Routes>
        </div>
      )}
    </>
  );
  b;
};

export default App;

// {
//   userName: userCredential?.providerData[0].displayName,
//   email: userCredential?.providerData[0].email,
//   userImage: userCredential?.providerData[0].photoURL,
//   uid: userCredential?.providerData[0].uid,
//   provider: userCredential?.providerData[0].providerId,
// }
