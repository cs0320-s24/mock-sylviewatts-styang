/*
  Demo: test ordinary Java/TypeScript
*/

import { expect, test } from "vitest";

// all exports from main will now be available as main.X
// import * as main from '../mock/src/main';
import * as REPL from "../../src/components/REPL";
import * as LoadCSVMock from "../../src/components/LoadCSVMock";
import * as REPLFunction from "../../src/components/REPLFunction";

test("loadCSVMock correctly loads mocked CSV file", () => {
  // Mock setLoadedData and setFilename functions
  let data;
  let filename;
  const setLoadedData = (dataToSet: string[][]) => {
    data = dataToSet;
  };
  const setFilename = (nameToSet: string) => {
    filename = nameToSet;
  };

  // Call loadCSVMock function with a valid filename
  const result = LoadCSVMock.loadCSVMock(
    ["mockedCities.csv"],
    setLoadedData,
    setFilename
  );

  // Assertions
  expect(result).toBe("Loaded mockedCities.csv");
  expect(data).toStrictEqual([
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
  ]);
  expect(filename).toBe("mockedCities.csv");
});

test("loadCSVMock handles incorrect filename", () => {
  // Mock setLoadedData and setFilename functions
  let data;
  let filename;
  let dataLoaded: boolean = false;
  let filenameLoaded: boolean = false;
  const setLoadedData = (dataToSet: string[][]) => {
    data = dataToSet;
    dataLoaded = true;
  };
  const setFilename = (nameToSet: string) => {
    filename = nameToSet;
    filenameLoaded = true;
  };

  // Call loadCSVMock function with an invalid filename
  const result = LoadCSVMock.loadCSVMock(
    ["invalidFilename.csv"],
    setLoadedData,
    setFilename
  );

  // Assertions
  expect(result).toBe("Bad file name");
  expect(dataLoaded).toBe(false)
  expect(filenameLoaded).toBe(false);
});

test("searchCSVMock correctly searches for data in mocked CSV file", () => {
  // Mock loadedData and filename
  const loadedData = [
    [
      "New York City",
      "Yes",
      "9 million",
      "continental",
      "United States of America",
    ],
    ["Chicago", "No", "3 million", "continental", "United States of America"],
  ];
  const filename = "mockedCities.csv";

  // Call searchCSVMock function with valid arguments
  const result = searchCSVMock(
    ["Climate", "continental"],
    loadedData,
    filename
  );

  // Assertions
  expect(result).toEqual([
    [
      "New York City",
      "Yes",
      "9 million",
      "continental",
      "United States of America",
    ],
    ["Chicago", "No", "3 million", "continental", "United States of America"],
  ]);
});

// test("searchCSVMock handles incorrect arguments", () => {
//   // Mock loadedData and filename
//   const loadedData = [
//     [
//       "New York City",
//       "Yes",
//       "9 million",
//       "continental",
//       "United States of America",
//     ],
//     ["Chicago", "No", "3 million", "continental", "United States of America"],
//   ];
//   const filename = "mockedCities.csv";

//   // Call searchCSVMock function with invalid arguments
//   const result = searchCSVMock(["InvalidArgument"], loadedData, filename);

//   // Assertions
//   expect(result).toEqual([[]]);
// });
