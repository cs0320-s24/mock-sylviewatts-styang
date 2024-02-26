import { Dispatch, SetStateAction, useState } from "react";
import "../styles/main.css";
import { ControlledInput } from "./ControlledInput";
import { loadCSVMock } from "./LoadCSVMock";
import { viewCSVMock } from "./ViewCSVMock";
import {
  searchAnimals3Black,
  searchCitiesClimateHumidContinental,
} from "./SearchCSVMock";
import { REPLFunction } from "./REPLFunction";

interface REPLInputProps {
  // TODO: Fill this with desired props... Maybe something to keep track of the submitted commands
  // CHANGED
  history: string[];
  setHistory: Dispatch<SetStateAction<string[]>>;
  commandMap: Map<string, REPLFunction>;
  setLoadedData: (data: string[][]) => void;
}
// You can use a custom interface or explicit fields or both! An alternative to the current function header might be:
// REPLInput(history: string[], setHistory: Dispatch<SetStateAction<string[]>>)
export function REPLInput(props: REPLInputProps) {
  // Remember: let React manage state in your webapp.
  // Manages the contents of the input box
  const [commandString, setCommandString] = useState<string>("");
  // TODO WITH TA : add a count state
  const [count, setCount] = useState<number>(0);

  // Set data
  //const [data, setData] = useState<string[][]>();

  const [fileLoaded, setFileLoaded] = useState<boolean>(false);





  // This function is triggered when the button is clicked.
  function handleSubmit(commandString: string) {
    setCount(count + 1);
    // CHANGED

    const args = commandString.split(" ");
    const commandName = args[0];

    if (props.commandMap.has(commandName)) {
      const commandFunction = props.commandMap.get(commandName);
      if (typeof commandFunction === "undefined") {
        props.setHistory([
          ...props.history,
          "Command not found: " + commandName,
        ]);
      } else {
        const result = commandFunction(args.slice(1));
        if (typeof result === "string") {
          props.setHistory([...props.history, result]);
        } else if (Array.isArray(result)) {
          if (Array.isArray(result[0])) {
            props.setHistory([
              ...props.history,
              ...result.map((row) => row.join(", ")),
            ]);
          }
        }
      }
    }

    setCommandString("");
  }
  /**
   * We suggest breaking down this component into smaller components, think about the individual pieces
   * of the REPL and how they connect to each other...
   */
  return (
    <div className="repl-input">
      {/* This is a comment within the JSX. Notice that it's a TypeScript comment wrapped in
            braces, so that React knows it should be interpreted as TypeScript */}
      {/* I opted to use this HTML tag; you don't need to. It structures multiple input fields
            into a single unit, which makes it easier for screenreaders to navigate. */}
      <fieldset>
        <legend>Enter a command:</legend>
        <ControlledInput
          value={commandString}
          setValue={setCommandString}
          ariaLabel={"Command input"}
        />
      </fieldset>
      {/* TODO: Currently this button just counts up, can we make it push the contents of the input box to the history?*/}
      <button onClick={() => handleSubmit(commandString)}>
        Submitted {count} times
      </button>
    </div>
  );
}
