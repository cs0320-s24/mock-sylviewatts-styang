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

export const searchCitiesClimateHumidContinental: REPLFunction = (
  columnNameAndValue: string[]
) => {
  return "New York City, Yes, 9 million, Humid continental, United States of America; Chicago, No, 3 million, Humid continental, United States of America";
};

export const searchAnimals3Black: REPLFunction = (
  columnIDAndValue: string[]
) => {
  return [["Little Penguin", "Carnivore", "6", "Black", "Bird"]];
};

export const searchAnimalsReptile: REPLFunction = (value: string[]) => {
  return [["Boa constrictor", "Carnivore", "20", "Green", "Reptile"]];
};
