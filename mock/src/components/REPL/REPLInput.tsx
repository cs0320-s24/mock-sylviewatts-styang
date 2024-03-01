import { Dispatch, SetStateAction, useState } from "react";
import "../../styles/main.css";
import { ControlledInput } from "./ControlledInput";
import { REPLFunction } from "./REPLFunction";

/**
 * Props interface for the REPLInput component.
 */
interface REPLInputProps {
  /**
   * Array containing the history of commands and their outputs.
   * Each entry in the history can either be a string or a 2D array representing a table.
   */
  history: (string | string[][])[];

  /**
   * Function to update the history state.
   */
  setHistory: Dispatch<SetStateAction<(string | string[][])[]>>;

  /**
   * Map containing available REPL commands and their corresponding functions.
   */
  commandMap: Map<string, REPLFunction>;

  /**
   * Function to set loaded data.
   * It receives a 2D array of strings as input.
   */
  setLoadedData: (data: string[][]) => void;

  /**
   * Determines the output mode of the REPL (brief or verbose).
   * Can be either "brief" or "verbose".
   */
  outputMode: "brief" | "verbose";
}

/**
 * A component representing the input section of a Read-Eval-Print Loop (REPL).
 * It allows users to input commands and handles their execution.
 * @param props The props for the REPLInput component.
 */
export function REPLInput(props: REPLInputProps) {
  // State to hold the input command string
  const [commandString, setCommandString] = useState<string>("");

  // State to keep track of the number of times the command has been submitted
  const [count, setCount] = useState<number>(0);

  /**
   * Function to handle the submission of a command.
   * @param commandString The input command string.
   */
  function handleSubmit(commandString: string) {
    // Increment the submission count
    setCount(count + 1);

    // Split the command string into arguments
    const args = commandString.split(" ");
    const commandName = args[0];

    // Get the corresponding function for the command
    const commandFunction = props.commandMap.get(commandName);

    // Execute the command if it exists, otherwise, show an error message
    if (typeof commandFunction === "undefined") {
      props.setHistory([...props.history, "Command not found: " + commandName]);
    } else {
      const result = commandFunction(args.slice(1));
      if (props.outputMode === "verbose") {
        if (typeof result === "string") {
          props.setHistory([
            ...props.history,
            "Command: " + commandName,
            "Output: " + result,
          ]);
        } else {
          props.setHistory([
            ...props.history,
            "Command: " + commandName,
            "Output table below: ",
            result,
          ]);
        }
      } else {
        props.setHistory([...props.history, result]);
      }
    }

    // Clear the command input field
    setCommandString("");
  }

  return (
    <div className="repl-input">
      <fieldset>
        <legend>Enter a command:</legend>
        {/* Controlled input component */}
        <ControlledInput
          value={commandString}
          setValue={setCommandString}
          ariaLabel={"Command input"}
        />
      </fieldset>
      {/* Button to submit the command */}
      <button onClick={() => handleSubmit(commandString)}>
        Submitted {count} times
      </button>
    </div>
  );
}
