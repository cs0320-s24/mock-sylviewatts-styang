import { REPLFunction } from "./REPLFunction";
import { getFileToData } from "./mockedJSON";

//TODO: CHANGE THIS, this is now done in view, load shouldn't do anything here?

export const loadCSVMock: REPLFunction = (filename: string[]) => {
  const fileToData = getFileToData();
  const dataForFile = fileToData.get(filename[0]);
  if (typeof dataForFile === "undefined") {
    return "Bad file name";
  } else {
    return "Loaded " + filename[0];
  }
  // } else {
  //   return dataForFile;
  // }

  //I think loaded just loads it and this check is done in view, but view can only happen
  //if loaded first, figure out how to do that?
};
