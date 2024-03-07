import '../../styles/main.css';
import { Dispatch, SetStateAction } from 'react';

/**
 * Props interface for ControlledInput component.
 */
interface ControlledInputProps {
  value: string, // The current value of the input field.
  setValue: Dispatch<SetStateAction<string>>, // Function to update the value of the input field.
  ariaLabel: string // ARIA label for accessibility.
}

/**
 * Component representing an input field with controlled value.
 * @param value The current value of the input field.
 * @param setValue Function to update the value of the input field.
 * @param ariaLabel ARIA label for accessibility.
 * @returns A JSX element representing the controlled input field.
 */
export function ControlledInput({value, setValue, ariaLabel}: ControlledInputProps) {
  return (
    <input 
      type="text" 
      className="repl-command-box"
      value={value} 
      placeholder="Enter command here!"
      onChange={(ev) => setValue(ev.target.value)}
      aria-label={ariaLabel}
    />
  );
}