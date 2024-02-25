import Home from "./pages/home/Home";
import { Routes, Route } from "react-router-dom";
import NewProject from "./pages/newProject/NewProject";
import SignUp from "./pages/signUp/SignUp";
import SingleProjectPage from "./pages/singleProjectPage/SingleProjectPage";

const App = () => {
  return (
    <>
      <div>
        <Routes>
          <Route path="/" element={<Home />}></Route>
          <Route path="/sign-up" element={<SignUp />}></Route>
          <Route path="/new-project" element={<NewProject />}></Route>
          <Route path="/project/:id" element={<SingleProjectPage />}></Route>
        </Routes>
      </div>
    </>
  );
};

export default App;
