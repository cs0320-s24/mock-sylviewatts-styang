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
<<<<<<< HEAD
      {props.history.map((command, index) => (
        <p key={index}>{command}</p>
=======
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
                    <tr key={rowIndex}>
                      {row.map((cell, cellIndex) => (
                        <td key={cellIndex}>{cell}</td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
>>>>>>> 8819eea9408b5fdc7c8aba5b2dfeb620b5334718
      ))}
    </div>
  );
  // return (
  //   <div className="repl-history" aria-label="repl-history">
  //     {props.history.map((command, index) => (
  //       <p>{command}</p>
  //     ))}
  //   </div>
  // );
}
