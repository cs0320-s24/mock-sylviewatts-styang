import "../styles/main.css";

/**
 * Interface containing history props for REPLHistory component.
 */
interface REPLHistoryProps {
  /**
   * An array containing the history of commands entered into the REPL.
   * Each element can either be a string representing a single command,
   * or a nested array representing a table-like structure of commands.
   */
  history: (string | string[][])[];
}

/**
 * Component to display REPL command history.
 * 
 * @param props The props containing the history array.
 * @returns A JSX element displaying the REPL command history.
 */
export function REPLHistory(props: REPLHistoryProps) {
  const history = props.history;

  return (
    <div className="repl-history" aria-label="repl-history">
      {history.map((command, index) => (
        <div>
          {typeof command === "string" ? (
            <div className="string-history">
              <p>{command}</p>
            </div>
          ) : (
            <div className="repl-table-history">
              <table>
                <tbody>
                  {command.map((row, rowIndex) => (
                    <tr>
                      {row.map((cell, cellIndex) => (
                        <td>{cell}</td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      ))}
    </div>
  );
}
