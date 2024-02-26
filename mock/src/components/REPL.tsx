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

export default function REPL() {
  // TODO: Add some kind of shared state that holds all the commands submitted.
  // CHANGED
  const [history, setHistory] = useState<string[]>([]);
  const [loadedData, setLoadedData] = useState<string[][] | undefined>(
    undefined
  );

  const loadCSVMockWrapper: REPLFunction = (filename: string[]) => {
    return loadCSVMock(filename, setLoadedData);
  };

  const viewCSVMockWrapper: REPLFunction = (args: string[]) => {
    if (typeof loadedData === "undefined") {
      return "File not loaded";
    } else {
      return viewCSVMock(loadedData);
    }
  };

  const searchCSVMockWrapper: REPLFunction = (args: string[]) => {
    if (typeof loadedData === "undefined") {
      return "File not loaded";
    } else {
      return searchCSVMock(args, loadedData);
    }
  };

  const commandMap = new Map<string, REPLFunction>();
  commandMap.set("load_file", loadCSVMockWrapper);
  commandMap.set("view", viewCSVMockWrapper);
  commandMap.set("search", searchCSVMockWrapper);

  //commandMap.set("search", searchCSVMock);

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
      />
    </div>
  );
}
