/**
 * Creates a mapping of filenames to their respective data.
 * @returns A map containing filenames as keys and corresponding data as values.
 */
export function getFileToData() {
  // Create a map to store filenames and their respective data
  const fileToData = new Map<string, string[][]>();

  // Populate the map with mocked data for animals and cities
  fileToData.set("mockedAnimals.csv", mockedAnimals);
  fileToData.set("mockedCities.csv", mockedCities);

  // Return the populated map
  return fileToData;
}

// Mocked data for animals
const mockedAnimals: string[][] = [
  ["Name", "Diet", "Average Lifespan", "Color", "Class"],
  ["Little Penguin", "Carnivore", "6", "Black", "Bird"],
  ["Black Bear", "Omnivore", "10", "Black", "Mammal"],
  ["Boa constrictor", "Carnivore", "20", "Green", "Reptile"],
  ["Peregrine falcon", "Carnivore", "15", "Grey", "Bird"],
];

// Mocked data for cities
const mockedCities: string[][] = [
  ["Name", "Walkable", "Population", "Climate", "Country"],
  [
    "New York City",
    "Yes",
    "9 million",
    "continental",
    "United States of America",
  ],
  ["Chicago", "No", "3 million", "continental", "United States of America"],
  ["Tokyo", "Yes", "14 million", "subtropical", "Japan"],
];
