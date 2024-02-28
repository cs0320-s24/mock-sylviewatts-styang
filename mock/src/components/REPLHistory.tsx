import "../styles/main.css";

interface REPLHistoryProps {
  // TODO: Fill with some shared state tracking all the pushed commands
  // CHANGED
  history: string[] | string[][];
}
export function REPLHistory(props: REPLHistoryProps) {
  const history = props.history;

  return (
    <div className="repl-history" aria-label="repl-history">
      {props.history.map((command, index) => (
        <p>{command}</p>
      ))}
    </div>
  );
}
