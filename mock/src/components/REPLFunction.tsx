/**
 * Represents a command for use Mock's REPL.
 * @param args An array of strings representing the arguments passed to the function.
 * @returns The result of the function, which can be either a string or a 2D array of strings.
 */
export interface REPLFunction {
  /**
   * A function that takes an array of strings as input and returns either a string or a 2D array of strings.
   * @param args An array of strings representing the arguments passed to the function.
   * @returns The result of the function, which can be either a string or a 2D array of strings.
   */
  (args: string[]): string | string[][];
}
