import { getFileToData } from "./mockedJSON";
import { REPLFunction } from "./REPLFunction";

interface viewCSV {
  data: string[][];
}

//or figure out how to do it without passing anything in
export const viewCSVMock: REPLFunction = (filename: string[]) => {
  const fileToData = getFileToData();
  const dataForFile = fileToData.get(filename[0]);
  if (typeof dataForFile === "undefined") {
    return [[]];
  }

  //change this to be a 2D array or a table (if a table then need to change REPL Function)
  const concatenatedString = dataForFile
    .map((row) => row.join(", "))
    .join("; ");
  return concatenatedString;
};
