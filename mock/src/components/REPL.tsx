import { useState } from "react";
import "../styles/main.css";
import { REPLHistory } from "./REPLHistory";
import { REPLInput } from "./REPLInput";
import { REPLFunction } from "./REPLFunction";
import { loadCSVMock } from "./LoadCSVMock";
import { viewCSVMock } from "./ViewCSVMock";
import { searchCSVMock } from "./SearchCSVMock";

/* 
  You'll want to expand this component (and others) for the sprints! Remember 
  that you can pass "props" as function arguments. If you need to handle state 
  at a higher level, just move up the hooks and pass the state/setter as a prop.
  
  This is a great top level component for the REPL. It's a good idea to have organize all components in a component folder.
  You don't need to do that for this gearup.
*/

//question: do we want error things printed, like if load, search, or view is called wrong should we tell them when they call it?
//and also error when commands are not found
export default function REPL() {
  const [history, setHistory] = useState<(string | string[][])[]>([]);
  const [loadedData, setLoadedData] = useState<string[][] | undefined>(
    undefined
  );
  const [filename, setFilename] = useState<string | undefined>(undefined);
  const [outputMode, setOutputMode] = useState<"brief" | "verbose">("brief");

  const loadCSVMockWrapper: REPLFunction = (filename: string[]) => {
    if (filename.length != 1) {
      return "Wrong number of arguments, only give filename.";
    }
    return loadCSVMock(filename, setLoadedData, setFilename);
  };

  const viewCSVMockWrapper: REPLFunction = (args: string[]) => {
    if (args.length >= 1) {
      return "Wrong number of arguments, view does not take any.";
    } else if (typeof loadedData === "undefined") {
      return "File not loaded";
    } else {
      return viewCSVMock(loadedData);
    }
  };

  const searchCSVMockWrapper: REPLFunction = (args: string[]) => {
    if (args.length > 2 || args.length < 1) {
      return "Wrong number of arguments, search takes <column> <value> or <value>";
    } else if (
      typeof loadedData === "undefined" ||
      typeof filename === "undefined"
    ) {
      return "File not loaded";
    } else {
      const searchResult = searchCSVMock(args, loadedData, filename);
      if (searchResult.every((row) => row.length === 0)) {
        return "Bad arguments for search.";
      } else {
        return searchResult;
      }
    }
  };

  const mode: REPLFunction = (args: string[]) => {
    if (args.length >= 1) {
      return "Wrong number of arguments, view does not take any.";
    } else {
      if (outputMode === "verbose") {
        console.log("outputMode before switching: " + outputMode);
        setOutputMode("brief");
        return "Response mode has been set to BRIEF";
      } else {
        console.log("hi");
        console.log("outputMode before switching: " + outputMode);
        setOutputMode("verbose");
        return "Response mode has been set to VERBOSE";
      }
    }
  };

  const commandMap = new Map<string, REPLFunction>();
  commandMap.set("load_file", loadCSVMockWrapper);
  commandMap.set("view", viewCSVMockWrapper);
  commandMap.set("search", searchCSVMockWrapper);
  commandMap.set("mode", mode);

  return (
    <div className="repl">
      {/*This is where your REPLHistory might go... You also may choose to add it within your REPLInput 
      component or somewhere else depending on your component organization. What are the pros and cons of each? */}
      <REPLHistory history={history} />
      <hr></hr>
      {/* CHANGED */}
      <REPLInput
        history={history}
        setHistory={setHistory}
        commandMap={commandMap}
        setLoadedData={setLoadedData}
        outputMode={outputMode}
      />
    </div>
  );
}
