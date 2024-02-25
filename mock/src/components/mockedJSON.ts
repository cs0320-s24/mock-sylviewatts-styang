export function getFileToData() {
  const fileToData = new Map<string, string[][]>();
  fileToData.set("mockedAnimals.csv", mockedAnimals);
  fileToData.set("mockedCities.csv", mockedCities);
  return fileToData;
}

const mockedAnimals: string[][] = [
  ["Name", "Diet", "Average Lifespan", "Color", "Class"],
  ["Little Penguin", "Carnivore", "6", "Black", "Bird"],
  ["Black Bear", "Omnivore", "10", "Black", "Mammal"],
  ["Boa constrictor", "Carnivore", "20", "Green", "Reptile"],
  ["Peregrine falcon", "Carnivore", "15", "Grey", "Bird"],
];

const mockedCities: string[][] = [
  ["Name", "Walkable", "Population", "Climate", "Country"],
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
  ["Tokyo", "Yes", "14 million", "Humid subtropical", "Japan"],
];
