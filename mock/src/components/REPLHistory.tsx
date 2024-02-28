import "../styles/main.css";

interface REPLHistoryProps {
  // TODO: Fill with some shared state tracking all the pushed commands
  // CHANGED
  history: (string | string[][])[];
}
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
