/**
 * Mock function to search for data in a CSV file based on provided arguments.
 * @param args The arguments provided for the search.
 * @param loadedData The data loaded from the CSV file.
 * @param filename The name of the CSV file being searched.
 * @returns A 2D array representing the search result.
 */
export function searchCSVMock(
  args: string[],
  loadedData: string[][],
  filename: string
): string[][] {
  // Check if the arguments match certain conditions and return mock data accordingly
  if (
    args.length >= 2 &&
    args[0] === "Climate" &&
    args[1] === "Humid continental" &&
    filename === "mockedCities.csv"
  ) {
    return searchCitiesClimateHumidContinental();
  } else if (
    args.length >= 2 &&
    args[0] === "3" &&
    args[1] === "Black" &&
    filename === "mockedAnimals.csv"
  ) {
    return searchAnimals3Black();
  } else if (
    args.length == 1 &&
    args[0] === "Reptile" &&
    filename === "mockedAnimals.csv"
  ) {
    return searchAnimalsReptile();
  }
  // If no matching conditions are found, return an empty array
  return [[]];
}

/**
 * Mock function to search for cities with a Humid continental climate within
 * the "climate" column.
 * @returns A 2D array representing the search result.
 */
export const searchCitiesClimateHumidContinental = (): string[][] => {
  return [
    [
      "New York City",
      "Yes",
      "9 million",
      "Humid continental",
      "United States of America",
    ],
    [
      "Chicago",
      "No",
      "3 million",
      "Humid continental",
      "United States of America",
    ],
  ];
};

/**
 * Mock function to search for animals that contain "black" in column index 3.
 * @returns A 2D array representing the search result.
 */
export const searchAnimals3Black = (): string[][] => {
  return [["Little Penguin", "Carnivore", "6", "Black", "Bird"]];
};

/**
 * Mock function to search for reptiles among animals.
 * @returns A 2D array representing the search result.
 */
export const searchAnimalsReptile = (): string[][] => {
  return [["Boa constrictor", "Carnivore", "20", "Green", "Reptile"]];
};
