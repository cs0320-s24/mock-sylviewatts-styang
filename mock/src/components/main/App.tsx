import { useState } from "react";
import "../../styles/App.css";
import { LoginButton } from "./LoginButton";
import REPL from "../REPL/REPL";

/**
 * This is the highest level component representing the entire application.
 * @returns A JSX element representing the main application.
 */
function App() {
  // State to track the authentication status of the user
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);

  return (
    <div className="App">
      {/* Main application header */}
      <p className="App-header">
        <h1>Mock</h1>
        {/* Component to handle user login/logout */}
        <LoginButton isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn} />
      </p>

      {/* Display the REPL interface if the user is logged in */}
      {isLoggedIn && <REPL />}
    </div>
  );
}

export default App;
