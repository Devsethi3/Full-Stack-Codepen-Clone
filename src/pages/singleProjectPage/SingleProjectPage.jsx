import SplitPane from "react-split-pane";
import { IoSettingsSharp } from "react-icons/io5";
import { FaCheck, FaChevronDown } from "react-icons/fa6";
import CodeMirror from "@uiw/react-codemirror";
import { dracula } from "@uiw/codemirror-theme-dracula";
import { javascript } from "@codemirror/lang-javascript";
import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { FaEdit } from "react-icons/fa";
import { useUserState } from "../../context/userContext/UserContext";
import Alert from "../../components/alert/Alert";
import { addDoc, collection, doc, getDoc } from "firebase/firestore";
import { db } from "../../config/firebaseConfig";
import { Link, useParams } from "react-router-dom";
import { useProjectState } from "../../context/userContext/postContext/PostContext";

const SingleProjectPage = () => {
  const { id: params } = useParams();

  const { listOfProject } = useProjectState();

  const [html, setHtml] = useState("");

  const [css, setCss] = useState("");
  const [js, setJs] = useState("");
  const [output, setOutput] = useState("");
  const [title, setTitle] = useState("Untitled");

  const [alert, setAlert] = useState(false);

  const [isTitle, setIsTitle] = useState("");

  const { user } = useUserState();

  const [projectId, setProjectId] = useState();
  const [projectDetail, setProjectDetail] = useState([]);

  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const getProjectDetail = async () => {
      try {
        const docRef = doc(db, "Projects", params);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
          setProjectDetail(docSnap.data());
        } else {
          console.log("No such document!");
        }
      } catch (error) {
        console.error("Error fetching project detail:", error);
      }
    };

    getProjectDetail();
  }, [params]);

  useEffect(() => {
    console.log(projectDetail);
  }, [projectDetail]);

  useEffect(() => {
    updateOutput();
  }, [html, css, js]);

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

  const updateProject = async () => {};
  const deleteProject = async () => {};

  return (
    <div>
      <div>
        <header className="w-full h-24 justify-between flex items-center container">
          {alert && (
            <Alert title="Project Saved Successfully" status="success" />
          )}
          <div className="flex items-center gap-8">
            <Link to={"/"}>
              <img src="/logo.png" width={150} height={150} alt="" />
            </Link>
            <div className="flex flex-col items-center ml-12">
              <div className="flex border-b-2 border-[#ffffff51] mb-2 items-center transition-all duration-200 ease-in-out justify-center gap-3">
                <AnimatePresence>
                  {isTitle ? (
                    <motion.input
                      key={"titleInput"}
                      type="text"
                      className="px-3 py-1.5 text-sm outline-none rounded-md bg-[#282A36]"
                      placeholder="Your Title"
                      value={title}
                      onChange={(e) => setTitle(e.target.value)}
                    ></motion.input>
                  ) : (
                    <>
                      <motion.p key={"titleLabel"} className="px-3 py-2">
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
              <div className="flex items-center gap-4">
                <p className="">{user?.displayName}</p>
                <span className="py-1 text-xs cursor-pointer bg-emerald-600 px-3 rounded-md">
                  Follow
                </span>
              </div>
            </div>
          </div>
          <div className="flex items-center gap-6">
            {/* <button
              onClick={saveProject}
              className="flex items-center gap-2 bg-emerald-600 py-2 px-6 rounded-md"
            >
              Update Project
            </button> */}
            <div className="w-10 h-10 bg-emerald-600 rounded-full cursor-pointer overflow-hidden grid place-items-center">
              {user?.photoURL ? (
                <>
                  <motion.img
                    src={user?.photoURL}
                    alt={user?.displayName}
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover"
                  />
                </>
              ) : (
                <p className="text-xl text-white font-semibold uppercase">
                  {user?.email[0]}
                </p>
              )}
            </div>
          </div>
        </header>
        <SplitPane split="horizontal">
          <SplitPane split="vertical" defaultSize="33%">
            {/* HTML */}
            <div className="flex flex-col h-full">
              <div className="flex items-center justify-between mx-4 border-b-2 pb-2">
                <div className="flex items-center gap-2">
                  <img src="/html.png" width={20} height={20} alt="html" />
                  <h2 className="text-xl font-semibold">HTML</h2>
                </div>
                <div className="flex items-center gap-2">
                  <IoSettingsSharp className="text-[2rem] cursor-pointer p-2 rounded-full hover:bg-[#ffffff08]" />
                  <FaChevronDown className="text-[2rem] cursor-pointer p-2 rounded-full hover:bg-[#ffffff08]" />
                </div>
              </div>
              <div className="flex overflow-y-auto flex-col h-full">
                <CodeMirror
                  minHeight="1000px"
                  // value={html}
                  height="100%"
                  theme={dracula}
                  extensions={[javascript({ jsx: true })]}
                  onChange={(value, viewUpdate) => {
                    setHtml(value);
                  }}
                />
              </div>
            </div>

            {/* CSS */}
            <SplitPane split="vertical" defaultSize="50%">
              <div className="flex flex-col h-full">
                <div className="flex items-center justify-between mx-4 border-b-2 pb-2">
                  <div className="flex items-center gap-2">
                    <img src="/css.png" width={20} height={20} alt="html" />
                    <h2 className="text-xl font-semibold">CSS</h2>
                  </div>
                  <div className="flex items-center gap-2">
                    <IoSettingsSharp className="text-[2rem] cursor-pointer p-2 rounded-full hover:bg-[#ffffff08]" />
                    <FaChevronDown className="text-[2rem] cursor-pointer p-2 rounded-full hover:bg-[#ffffff08]" />
                  </div>
                </div>
                <div className="flex overflow-y-auto  flex-col h-full">
                  <CodeMirror
                    minHeight="1000px"
                    value={css}
                    height="100%"
                    theme={dracula}
                    extensions={[javascript({ jsx: true })]}
                    onChange={(value, viewUpdate) => {
                      setCss(value);
                    }}
                  />
                </div>
              </div>
              {/* JavaScript */}
              <div className="flex flex-col h-full">
                <div className="flex items-center justify-between mx-4 border-b-2 pb-2">
                  <div className="flex items-center gap-2">
                    <img src="/js.png" width={20} height={20} alt="html" />
                    <h2 className="text-xl font-semibold">JS</h2>
                  </div>
                  <div className="flex items-center gap-2">
                    <IoSettingsSharp className="text-[2rem] cursor-pointer p-2 rounded-full hover:bg-[#ffffff08]" />
                    <FaChevronDown className="text-[2rem] cursor-pointer p-2 rounded-full hover:bg-[#ffffff08]" />
                  </div>
                </div>
                <div className="flex overflow-y-auto  flex-col h-full">
                  <CodeMirror
                    minHeight="1000px"
                    value={js}
                    height="100%"
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
          {/* Preview or Console */}
          <div className="pane blockl bg-white h-full">
            <iframe
              title="Result"
              srcDoc={output}
              className="w-full h-auto"
              sandbox="allow-scripts allow-same-origin"
            ></iframe>
          </div>
        </SplitPane>
      </div>
    </div>
  );
};

export default SingleProjectPage;
