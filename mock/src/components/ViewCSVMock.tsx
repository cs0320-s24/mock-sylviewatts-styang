import { getFileToData } from "./mockedJSON";

interface viewCSV {
  data : string[][]
}

export function viewCSVMock(props: viewCSV) : string {
  const concatenatedString = props.data.reduce((accumulator, currentValue) => {
    return accumulator.concat(currentValue.join(', ')); // Join inner arrays with ', ' separator
  }, '');

  return concatenatedString;
}
