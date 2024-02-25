interface loadCSV {
  filename: string;
}

//TODO: change parameters to work (could be different files to have different interfaces)
export function loadCSVMock(props: loadCSV): string {
  return "result: success, filepath: " + props.filename;
}
