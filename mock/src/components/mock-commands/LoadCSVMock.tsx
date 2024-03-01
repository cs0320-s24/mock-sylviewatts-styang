import { getFileToData } from "../mock-data/mockedJSON";

/**
 * Loads CSV mock data based on the specified filename.
 * @param filename The filename of the CSV mock data to load.
 * @param setLoadedData Function to set the loaded data in the component state.
 * @param setFilename Function to set the filename in the component state.
 * @returns A message indicating the success or failure of the operation.
 */
export function loadCSVMock(
  filename: string[],
  setLoadedData: (data: string[][]) => void,
  setFilename: (name: string) => void
): string {
  // Retrieve the map of filenames to CSV mock data
  const fileToData = getFileToData();

  // Retrieve the CSV mock data corresponding to the specified filename
  const dataForFile = fileToData.get(filename[0]);

  // If no data found for the specified filename, return an error message
  if (typeof dataForFile === "undefined") {
    return "Bad file name";
  } else {
    // Set the loaded data and filename in the component state
    setLoadedData(dataForFile);
    setFilename(filename[0]);

    // Return a success message
    return "Loaded " + filename[0];
  }
}
