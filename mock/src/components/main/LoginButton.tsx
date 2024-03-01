import { Dispatch, SetStateAction } from "react";

/**
 * Props interface for the LoginButton component.
 */
interface LoginProps {
  /**
   * Indicates whether the user is logged in.
   */
  isLoggedIn: boolean;

  /**
   * Function to update the isLoggedIn state.
   */
  setIsLoggedIn: Dispatch<SetStateAction<boolean>>;
}

/**
 * Component for rendering a login button that toggles the user's login status.
 * @param props The props for the LoginButton component.
 * @returns A button element that, when clicked, toggles the user's login status.
 */
export function LoginButton(props: LoginProps) {
  /**
   * 
   * @returns 
   */
  const authenticate = () => {
    const newValue = !props.isLoggedIn;
    props.setIsLoggedIn(newValue);
    return newValue;
  };

  // Render different button based on user's login status
  if (props.isLoggedIn) {
    return (
      <button aria-label="Sign Out" onClick={authenticate}>
        Sign out
      </button>
    );
  } else {
    return (
      <button aria-label="Login" onClick={authenticate}>
        Login
      </button>
    );
  }
}
