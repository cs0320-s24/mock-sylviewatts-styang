import { getFileToData } from "./mockedJSON";

interface viewCSV {
  data: string[][];
}

export function viewCSVMock(props: viewCSV): string {
  const concatenatedString = props.data.map((row) => row.join(", ")).join("; ");
  return concatenatedString;
}
