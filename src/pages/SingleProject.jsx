import SplitPane from "react-split-pane";
import { IoLogoHtml5 } from "react-icons/io5";
import { IoMdSettings } from "react-icons/io";
import { IoChevronDownOutline } from "react-icons/io5";
import { IoLogoJavascript } from "react-icons/io5";
import { IoLogoCss3 } from "react-icons/io5";
import { javascript } from "@codemirror/lang-javascript";
import CodeMirror from "@uiw/react-codemirror";
import { dracula } from "@uiw/codemirror-theme-dracula";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { FaEdit, FaCheck } from "react-icons/fa";
import { useSelector } from "react-redux";
import UserDetails from "../components/profile/UserDetails";
import { doc, getDoc, setDoc } from "firebase/firestore";
import { db } from "../config/firebaseConfig";
import Alert from "../components/alert/Alert";
import { collection, addDoc } from "firebase/firestore";
import { useParams } from "react-router-dom";

const NewProject = () => {
  const { id: paramsId } = useParams();
  console.log(paramsId);
  // const projects = useSelector((state) => state.projects?.projects);
  const user = useSelector((state) => state.user.user);
  const [html, setHtml] = useState("");
  const [css, setCss] = useState("");
  const [js, setJs] = useState("");
  const [output, setOutput] = useState("");
  const [title, setTitle] = useState("Untitled");
  const [projectId, setProjectId] = useState();

  const [alert, setAlert] = useState(false);

  const [isTitle, setIsTitle] = useState("");

  useEffect(() => {
    updateOutput();
  }, [html, css, js]);

  useEffect(() => {
    setProjectId(paramsId);

    const getProjectDetail = async () => {
      const projectRef = doc(db, "Projects", projectId);
      const projectSnap = await getDoc(projectRef);
      if (projectSnap.exists()) {
        console.log(projectSnap.data());
      } else{
        console.log("No such document exists");
      }
    };
    getProjectDetail();
  }, [paramsId]);

  const updateOutput = () => {
    const combinedOutput = `
    <html>
      <head>
        <style>${css}</style>
      </head>
      <body>${html}</body>
      <script>${js}</script>
    </html>
    `;
    setOutput(combinedOutput);
  };

  const updateProject = async () => {
    try {
      const projectRef = doc(db, "Projects", projectId);

      await setDoc(projectRef, {
        title: title,
        html: html,
        css: css,
        js: js,
        output: output,
        email: user.email,
        userName: user.displayName,
        userImage: user.photoURL,
      });

      console.log("Project updated with ID: ", projectId);

      setAlert(true);
      setTimeout(() => {
        setAlert(false);
        history.push("/");
      }, 2000);
    } catch (error) {
      console.error("Error updating project:", error);
    }
  };

  return (
    <>
      <div className="w-screen h-screen flex flex-col items-start justify-start overflow-hidden">
        {/* Alert Section */}
        {alert && <Alert title="Project Saved Successfully" status="success" />}
        {/* header Section */}
        <header className="w-full flex items-center justify-between px-12 py-4">
          <div className="flex items-center justify-center gap-6">
            <Link to={"/"}>
              <img src="/logo.png" width={120} height={120} alt="logo" />
            </Link>
            <div className="flex flex-col items-start justify-normal">
              {/* Title */}
              <div className="flex items-center justify-center gap-3">
                <AnimatePresence>
                  {isTitle ? (
                    <motion.input
                      key={"titleInput"}
                      type="text"
                      className="px-4 py-2 outline-none rounded-md bg-gray-800"
                      placeholder="Your Title"
                      value={title}
                      onChange={(e) => setTitle(e.target.value)}
                    ></motion.input>
                  ) : (
                    <>
                      <motion.p
                        key={"titleLabel"}
                        className="px-3 py-2 text-lg"
                      >
                        {title}
                      </motion.p>
                    </>
                  )}
                </AnimatePresence>

                <AnimatePresence>
                  {isTitle ? (
                    <>
                      <motion.div
                        key={"FaCheck"}
                        whileTap={{ scale: 0.9 }}
                        className="cursor-pointer"
                        onClick={() => setIsTitle(false)}
                      >
                        <FaCheck className="text-emerald-500" />
                      </motion.div>
                    </>
                  ) : (
                    <>
                      <motion.div
                        key={"FaEdit"}
                        whileTap={{ scale: 0.9 }}
                        className="cursor-pointer"
                        onClick={() => setIsTitle(true)}
                      >
                        <FaEdit className="text-gray-500" />
                      </motion.div>
                    </>
                  )}
                </AnimatePresence>
              </div>
              {/* Follow */}
              <div className="flex items-center justify-center px-3 gap-4">
                <p className="text-gray-300 text-sm">
                  {user?.displayName
                    ? user?.displayName
                    : `${user?.email.split("@")[0]}`}
                </p>
                <motion.p
                  whileTap={{ scale: 0.9 }}
                  className="text-xs px-2.5 py-[2px] bg-[#05a271] rounded-sm text-white cursor-pointer"
                >
                  Follow +
                </motion.p>
              </div>
            </div>
          </div>

          {/* User Section */}
          {user && (
            <div className="flex items-center justify-center gap-4">
              <motion.button
                onClick={updateProject}
                className="px-6 py-2 bg-[#05a271] text-white font-medium rounded-md"
              >
                Update Project
              </motion.button>
              <UserDetails user={user} />
            </div>
          )}
        </header>

        {/* coding Section */}
        <div>
          {/* Horizontal */}
          <SplitPane
            split="horizontal"
            minSize={100}
            maxSize={100}
            defaultSize={"50%"}
            resizable={false} // Disable resizing after dragging
            onDragFinished={() => {}} // Prevent unnecessary re-renders
          >
            {/* Top Coding Section */}
            <SplitPane split="vertical" minSize={500}>
              {/* HTML CODE */}

              <div className="w-full h-full flex flex-col items-start justify-start">
                <div className="w-full flex items-center justify-between">
                  <div className="flex items-center justify-between bg-secondary border-t-gray-300 gap-4 px-4 py-2 border-t-4">
                    <IoLogoHtml5 className="text-xl text-red-500" />
                    <p className="font-semibold text-gray-300">HTML</p>
                  </div>
                  <div className="cursor-pointer flex items-center justify-center gap-4 px-4 py-2">
                    <IoMdSettings className="text-xl text-gray-400" />
                    <IoChevronDownOutline className="text-xl text-gray-400" />
                  </div>
                </div>
                <div className="w-full overflow-y-auto h-full">
                  <CodeMirror
                    value={html}
                    height="600px"
                    theme={dracula}
                    extensions={[javascript({ jsx: true })]}
                    onChange={(value, viewUpdate) => {
                      setHtml(value);
                    }}
                  />
                </div>
              </div>

              <SplitPane split="vertical" minSize={500}>
                {/* CSS CODE */}
                <div className="w-full h-full flex flex-col items-start justify-start">
                  <div className="w-full flex items-center justify-between">
                    <div className="flex items-center justify-between bg-secondary border-t-gray-300 gap-4 px-4 py-2 border-t-4">
                      <IoLogoCss3 className="text-xl text-red-500" />
                      <p className="font-semibold text-gray-300">CSS</p>
                    </div>
                    <div className="cursor-pointer flex items-center justify-center gap-4 px-4 py-2">
                      <IoMdSettings className="text-xl text-gray-400" />
                      <IoChevronDownOutline className="text-xl text-gray-400" />
                    </div>
                  </div>
                  <div className="w-full overflow-y-auto h-full">
                    <CodeMirror
                      value={css}
                      height="600px"
                      theme={dracula}
                      extensions={[javascript({ jsx: true })]}
                      onChange={(value, viewUpdate) => {
                        setCss(value);
                      }}
                    />
                  </div>
                </div>
                {/* JS CODE */}
                <div className="w-full h-full flex flex-col items-start justify-start">
                  <div className="w-full flex items-center justify-between">
                    <div className="flex items-center justify-between bg-secondary border-t-gray-300 gap-4 px-4 py-2 border-t-4">
                      <IoLogoJavascript className="text-xl text-red-500" />
                      <p className="font-semibold text-gray-300">JS</p>
                    </div>
                    <div className="cursor-pointer flex items-center justify-center gap-4 px-4 py-2">
                      <IoMdSettings className="text-xl text-gray-400" />
                      <IoChevronDownOutline className="text-xl text-gray-400" />
                    </div>
                  </div>
                  <div className="w-full overflow-y-auto h-full">
                    <CodeMirror
                      height="600px"
                      value={js}
                      theme={dracula}
                      extensions={[javascript({ jsx: true })]}
                      onChange={(value, viewUpdate) => {
                        setJs(value);
                      }}
                    />
                  </div>
                </div>
              </SplitPane>
            </SplitPane>

            {/* Bottom Result Section */}
            <div
              className="bg-white"
              style={{ overflow: "hidden", height: "100%" }}
            >
              <iframe
                title="Result"
                srcDoc={output}
                style={{ border: "none", width: "100%", height: "100%" }}
              />
            </div>
          </SplitPane>
        </div>
      </div>
    </>
  );
};

export default NewProject;
