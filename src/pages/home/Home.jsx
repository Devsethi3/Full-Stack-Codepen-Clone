import { FaSearch } from "react-icons/fa";
import SideNav from "../../components/sideNav/SideNav";
import { Link } from "react-router-dom";
import { useUserState } from "../../context/userContext/UserContext";
import UserInfo from "../../components/userInfo/UserInfo";
import Projects from "../../components/projects/Projects";

const Home = () => {
  const { user } = useUserState();
  console.log(user);
  return (
    <>
      <div className="flex w-screen min-h-screen items-start">
        <SideNav />
        <div className="w-full">
          <div className="flex mt-6 items-center w-full">
            <div className="flex items-center rounded-md w-full ml-16 mr-8 gap-8 bg-secondary">
              <div className="flex py-3 px-4 w-full items-center gap-4 ">
                <FaSearch className="text-xl opacity-60" />
                <input
                  type="text"
                  className="bg-transparent outline-none w-full"
                />
              </div>
            </div>
            <div className="mr-12">
              {user ? (
                <UserInfo user={user} />
              ) : (
                <Link
                  to="/sign-up"
                  className="font-medium py-3 px-8 rounded-md bg-emerald-600"
                >
                  Login
                </Link>
              )}
            </div>
          </div>
          <div className="grid mx-20 mt-8">
            <Projects />
          </div>
        </div>
      </div>
    </>
  );
};

export default Home;
