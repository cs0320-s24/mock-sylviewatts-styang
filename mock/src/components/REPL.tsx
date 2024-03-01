import { useState } from "react";
import "../styles/main.css";
import { REPLHistory } from "./REPLHistory";
import { REPLInput } from "./REPLInput";
import { REPLFunction } from "./REPLFunction";
import { loadCSVMock } from "./LoadCSVMock";
import { viewCSVMock } from "./ViewCSVMock";
import { searchCSVMock } from "./SearchCSVMock";

/**
 * Component representing Mock's REPL interface
 * @returns A JSX element displaying the REPL command history and input
 */
export default function REPL() {
  // State to store the command history
  const [history, setHistory] = useState<(string | string[][])[]>([]);
  // State to store loaded data from a CSV file
  const [loadedData, setLoadedData] = useState<string[][] | undefined>(
    undefined
  );
  // State to store the filename of the loaded CSV file
  const [filename, setFilename] = useState<string | undefined>(undefined);
  // State to determine the output mode of the REPL (brief or verbose)
  const [outputMode, setOutputMode] = useState<"brief" | "verbose">("brief");

  /**
   * Wrapper function for loading CSV data.
   * @param filename The filename of the CSV data to load.
   * @returns A message indicating the success or failure of the operation.
   */
  const loadCSVMockWrapper: REPLFunction = (filename: string[]) => {
    if (filename.length > 1) {
      return "Wrong number of arguments, only give filename.";
    }
    return loadCSVMock(filename, setLoadedData, setFilename);
  };

  /**
   * Wrapper function for viewing CSV mock data.
   * @param args Arbitrary field that must be empty
   * @returns CSV data as string[][] or an error message indicating failure.
   */
  const viewCSVMockWrapper: REPLFunction = (args: string[]) => {
    if (args.length >= 1) {
      return "Wrong number of arguments, view does not take any.";
    } else if (typeof loadedData === "undefined") {
      return "File not loaded";
    } else {
      return viewCSVMock(loadedData);
    }
  };

  /**
   * Wrapper function for searching CSV mock data.
   * @param args Arguments for specifying the search criteria.
   * @returns The search results as string [][] or an error message indicating failure.
   */
  const searchCSVMockWrapper: REPLFunction = (args: string[]) => {
    if (args.length > 2 || args.length < 1) {
      return "Wrong number of arguments, search takes <column> <value> or <value>";
    } else if (
      typeof loadedData === "undefined" ||
      typeof filename === "undefined"
    ) {
      return "File not loaded";
    } else {
      return searchCSVMock(args, loadedData, filename);
    }
  };

  /**
   * Function for changing the output mode of the REPL.
   * @param args Arbitrary field that must be empty.
   * @returns A message confirming the change of output mode.
   */
  const mode: REPLFunction = (args: string[]) => {
    if (args.length >= 1) {
      return "Wrong number of arguments, view does not take any.";
    } else {
      if (outputMode === "verbose") {
        setOutputMode("brief");
        return "Response mode has been set to BRIEF";
      } else {
        setOutputMode("verbose");
        return "Response mode has been set to VERBOSE";
      }
    }
  };

  // Map containing available REPL commands and their corresponding functions
  const commandMap = new Map<string, REPLFunction>();
  commandMap.set("load_file", loadCSVMockWrapper);
  commandMap.set("view", viewCSVMockWrapper);
  commandMap.set("search", searchCSVMockWrapper);
  commandMap.set("mode", mode);

  return (
    <div className="repl">
      {/* Component to display command history */}
      <REPLHistory history={history} />
      <hr></hr>
      {/* Component to input commands */}
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
