import { Route, useNavigate, Routes } from "react-router-dom";
import { Home, SignUp } from "./pages";
import { useEffect } from "react";
import { auth } from "./config/firebaseConfig";

const App = () => {
  const navigate = useNavigate();
  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((userCredential) => {
      if (userCredential) {
        console.log(userCredential?.providerData[0]);
      } else {
        navigate("/auth", { replace: true });
      }
    });
  }, []);
  return (
    <>
      <div>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/auth" element={<SignUp />} />
        </Routes>
      </div>
    </>
  );
};

export default App;
