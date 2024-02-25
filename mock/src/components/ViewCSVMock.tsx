import { getFileToData } from "./mockedJson";

interface viewCSV {
  filename: string;
}

export function viewCSV(props: viewCSV) {
  const fileToData = getFileToData();
  const dataForFile = fileToData.get(props.filename);

  return (
    <div className="view-CSV" aria-label="view-CSV">
      {"result: success, data: " + dataForFile}
    </div>
  );
}
