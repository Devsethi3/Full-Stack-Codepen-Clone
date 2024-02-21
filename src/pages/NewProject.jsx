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

const NewProject = () => {
  const [html, setHtml] = useState("");
  const [css, setCss] = useState("");
  const [js, setJs] = useState("");
  const [output, setOutput] = useState("");

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

  return (
    <>
      <div className="w-screen h-screen flex flex-col items-start justify-start overflow-hidden">
        {/* Alert Section */}

        {/* header Section */}

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
                <div className="w-full h-full">
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
                  <div className="w-full h-full">
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
                  <div className="w-full h-full">
                    <CodeMirror
                      value={js}
                      height="600px"
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
