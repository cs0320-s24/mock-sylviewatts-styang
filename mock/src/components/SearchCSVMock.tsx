import { REPLFunction } from "./REPLFunction";

// interface actionProps {
//   value: string;
// }

// interface columnIDProp extends actionProps {
//   columnID: number;
// }

// interface columnNameProp extends actionProps {
//   columnName: string;
// }

export function searchCSVMock(
  args: string[],
  loadedData: string[][],
  filename: string
): string[][] {
  // need to fix / fill (can use if/then statements based on args)
  //TODO:
  //if loadedData from map's filename is cities call search citiies
  //otherwise if two arguments call searchAnimals3Black
  //otherwise call searchAnimalsReptile

  //how mocked should it be? like i could actually check that arg is an int, and the value is the value we're looking for or i could just pretend
  if (
    args.length >= 2 &&
    args[0] === "Climate" &&
    args[1] === "continental" &&
    filename === "mockedCities.csv"
  ) {
    return searchCitiesClimateContinental();
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
  return [[]];
}

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

export const searchAnimals3Black = (): string[][] => {
  return [["Little Penguin", "Carnivore", "6", "Black", "Bird"]];
};

export const searchAnimalsReptile = (): string[][] => {
  return [["Boa constrictor", "Carnivore", "20", "Green", "Reptile"]];
};
