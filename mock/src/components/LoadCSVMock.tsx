import { getFileToData } from "./mockedJSON";

interface loadCSV {
  filename: string;
}

//TODO: change parameters to work (could be different files to have different interfaces)
export function loadCSVMock(props: loadCSV): string[][] {
  const fileToData = getFileToData();
  const dataForFile = fileToData.get(props.filename);
  if (typeof dataForFile === "undefined") {
    return [[]]
  } else {
  return dataForFile
  }
}
