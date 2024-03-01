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
): string[][] {
  // Check if the arguments match certain conditions and return mock data accordingly
  if (
    args[0] === "Climate" &&
    args[1] === "continental"
  ) {
    return searchCitiesClimateContinental();
  } else if (
    args[0] === "3" &&
    args[1] === "Black"
  ) {
    return searchAnimals3Black();
  } else if (
    args[0] === "Reptile"
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
export const searchCitiesClimateContinental = (): string[][] => {
  return [
    [
      "New York City",
      "Yes",
      "9 million",
      "continental",
      "United States of America",
    ],
    ["Chicago", "No", "3 million", "continental", "United States of America"],
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
