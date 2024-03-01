import { expect, test } from "@playwright/test";

/**
  The general shapes of tests in Playwright Test are:
    1. Navigate to a URL
    2. Interact with the page
    3. Assert something about the page against your expectations
  Look for this pattern in the tests below!
 */

// If you needed to do something before every test case...
test.beforeEach(async ({ page }) => {
  await page.goto("http://localhost:8000/");
});

/**
 * Don't worry about the "async" yet. We'll cover it in more detail
 * for the next sprint. For now, just think about "await" as something
 * you put before parts of your test that might take time to run,
 * like any interaction with the page.
 */
test("on page load, i see a login button", async ({ page }) => {
  await expect(page.getByLabel("Login")).toBeVisible();
});

test("on page load, i dont see the input box and sign out box until login", async ({
  page,
}) => {
  await expect(page.getByLabel("Sign Out")).not.toBeVisible();
  await expect(page.getByLabel("Command input")).not.toBeVisible();
  await expect(page.getByLabel("Login")).toBeVisible();

  // click the login button
  await page.getByLabel("Login").click();
  await expect(page.getByLabel("Sign Out")).toBeVisible();
  await expect(page.getByLabel("Command input")).toBeVisible();
  await expect(page.getByLabel("Login")).not.toBeVisible();
});

test("after logging in, I can sign out and can log back in again", async ({
  page,
}) => {
  await page.getByLabel("Login").click();

  //log in
  await expect(page.getByLabel("Sign Out")).toBeVisible();
  await expect(page.getByLabel("Command input")).toBeVisible();
  await expect(page.getByLabel("Login")).not.toBeVisible();

  //sign out
  await page.getByLabel("Sign Out").click();
  await expect(page.getByLabel("Sign Out")).not.toBeVisible();
  await expect(page.getByLabel("Command input")).not.toBeVisible();
  await expect(page.getByLabel("Login")).toBeVisible();

  //log back in
  await page.getByLabel("Login").click();
  await expect(page.getByLabel("Sign Out")).toBeVisible();
  await expect(page.getByLabel("Command input")).toBeVisible();
  await expect(page.getByLabel("Login")).not.toBeVisible();
});

test("on page load, i see a button", async ({ page }) => {
  await page.getByLabel("Login").click();
  await expect(
    page.getByRole("button", { name: "Submitted 0 times" })
  ).toBeVisible();
});

test("non-existing command tells user command not found", async ({ page }) => {
  await page.getByLabel("Login").click();
  await page.getByLabel("Command input").fill("Awesome command");
  await page.getByRole("button", { name: "Submitted 0 times" }).click();

  const firstChild = await page.evaluate(() => {
    const history = document.querySelector(".repl-history");
    return history?.children[0]?.textContent;
  });
  expect(firstChild).toEqual("Command not found: Awesome");
});

test("after I click the button, its label increments", async ({ page }) => {
  await page.getByLabel("Login").click();
  await expect(
    page.getByRole("button", { name: "Submitted 0 times" })
  ).toBeVisible();
  await page.getByRole("button", { name: "Submitted 0 times" }).click();
  await expect(
    page.getByRole("button", { name: "Submitted 1 times" })
  ).toBeVisible();
});

test("empty command submitted gives command not found", async ({ page }) => {
  await page.getByLabel("Login").click();
  await page.getByLabel("Command input").fill("");
  await page.getByRole("button", { name: "Submitted 0 times" }).click();

  const firstChild = await page.evaluate(() => {
    const history = document.querySelector(".repl-history");
    return history?.children[0]?.textContent;
  });
  expect(firstChild).toEqual("Command not found: ");
});

test("mode functionality", async ({ page }) => {
  await page.getByLabel("Login").click();

  await page.getByLabel("Command input").click();
  //command to switch mode, switching to verbose
  await page.getByLabel("Command input").fill("mode");
  await page.getByRole("button", { name: "Submitted 0 times" }).click();

  const firstChild = await page.evaluate(() => {
    const history = document.querySelector(".repl-history");
    return history?.children[0]?.textContent;
  });
  expect(firstChild).toEqual("Response mode has been set to VERBOSE");

  //switch to brief
  await page.getByLabel("Command input").click();
  await page.getByLabel("Command input").fill("mode");
  await page.getByRole("button", { name: "Submitted 1 times" }).click();

  const secondChild = await page.evaluate(() => {
    const history = document.querySelector(".repl-history");
    return history?.children[1]?.textContent;
  });

  const thirdChild = await page.evaluate(() => {
    const history = document.querySelector(".repl-history");
    return history?.children[2]?.textContent;
  });

  expect(secondChild).toEqual("Command: mode");
  expect(thirdChild).toEqual("Output: Response mode has been set to BRIEF");
});

/**
 * Tests that calling mode changes output, and that system begins in mode BRIEF
 */
// test("call mode and check output change for commands", async ({ page }) => {
//   await page.getByLabel("Login").click();
//   await page.getByLabel("Command input").click();
//   await page.getByLabel("Command input").fill("mode");
//   await page.getByRole("button", { name: "Submitted 0 times" }).click();

//   // Tests that mode is initially set as BRIEF
//   const firstChild = await page.evaluate(() => {
//     const history = document.querySelector(".repl-history");
//     return history?.children[0]?.textContent;
//   });

//   // Calling load in VERBOSE
//   await page.getByLabel("Command input").click();
//   await page.getByLabel("Command input").fill("load_file mockedOneColumn.csv");
//   await page.getByRole("button", { name: "Submitted 1 times" }).click();

//   const secondChild = await page.evaluate(() => {
//     const history = document.querySelector(".repl-history");
//     return history?.children[1]?.textContent;
//   });

//   const thirdChild = await page.evaluate(() => {
//     const history = document.querySelector(".repl-history");
//     return history?.children[2]?.textContent;
//   });

//   // Calling  view in VERBOSE
//   await page.getByLabel("Command input").click();
//   await page.getByLabel("Command input").fill("view");
//   await page.getByRole("button", { name: "Submitted 2 times" }).click();

//   const fourthChild = await page.evaluate(() => {
//     const history = document.querySelector(".repl-history");
//     return history?.children[3]?.textContent;
//   });

//   const fifthChild = await page.evaluate(() => {
//     const history = document.querySelector(".repl-history");
//     return history?.children[4]?.textContent;
//   });

//   const sixthChild = await page.evaluate(() => {
//     const history = document.querySelector(".repl-history");
//     return history?.children[5]?.textContent;
//   });

//   // Calling search in VERBOSE
//   await page.getByLabel("Command input").click();
//   await page.getByLabel("Command input").fill("search turtle");
//   await page.getByRole("button", { name: "Submitted 3 times" }).click();

//   const seventhChild = await page.evaluate(() => {
//     const history = document.querySelector(".repl-history");
//     return history?.children[6]?.textContent;
//   });

//   const eighthChild = await page.evaluate(() => {
//     const history = document.querySelector(".repl-history");
//     return history?.children[7]?.textContent;
//   });

//   // Calling mode in VERBOSE
//   await page.getByLabel("Command input").click();
//   await page.getByLabel("Command input").fill("mode");
//   await page.getByRole("button", { name: "Submitted 4 times" }).click();

//   const ninthChild = await page.evaluate(() => {
//     const history = document.querySelector(".repl-history");
//     return history?.children[8]?.textContent;
//   });

//   const tenthChild = await page.evaluate(() => {
//     const history = document.querySelector(".repl-history");
//     return history?.children[9]?.textContent;
//   });

//   // Calling load_file in BRIEF
//   await page.getByLabel("Command input").click();
//   await page.getByLabel("Command input").fill("load_file mockedOneColumn.csv");
//   await page.getByRole("button", { name: "Submitted 5 times" }).click();

//   const eleventhChild = await page.evaluate(() => {
//     const history = document.querySelector(".repl-history");
//     return history?.children[10]?.textContent;
//   });

//   // Calling view in BRIEF
//   await page.getByLabel("Command input").click();
//   await page.getByLabel("Command input").fill("view");
//   await page.getByRole("button", { name: "Submitted 6 times" }).click();

//   const twelfthChild = await page.evaluate(() => {
//     const history = document.querySelector(".repl-history");
//     return history?.children[3]?.textContent;
//   });

//   expect(firstChild).toEqual("Response mode set to VERBOSE");
//   expect(secondChild).toEqual("Command: load_file");
//   expect(thirdChild).toEqual("Output: Loaded mockedOneColumn.csv");
//   expect(fourthChild).toEqual("Command: view");
//   expect(fifthChild).toEqual("Output table below: ");
//   expect(sixthChild).toEqual("Data");
//   expect(seventhChild).toEqual("Command: search");
//   expect(ninthChild).toEqual("Command: mode");
//   expect(tenthChild).toEqual("Output: Response mode set to BRIEF");
//   expect(eleventhChild).toEqual("Loaded mockedOneColumn.csv");
// });

test("load_file success", async ({ page }) => {
  await page.getByLabel("Login").click();
  await page.getByLabel("Command input").click();
  await page.getByLabel("Command input").fill("load_file mockedAnimals.csv");
  await page.getByRole("button", { name: "Submitted 0 times" }).click();

  const firstChild = await page.evaluate(() => {
    const history = document.querySelector(".repl-history");
    return history?.children[0]?.textContent;
  });

  expect(firstChild).toEqual("Loaded mockedAnimals.csv");
});

test("load_file wrong arguments", async ({ page }) => {
  await page.getByLabel("Login").click();
  await page.getByLabel("Command input").click();
  await page.getByLabel("Command input").fill("load_file");
  await page.getByRole("button", { name: "Submitted 0 times" }).click();

  const firstChild = await page.evaluate(() => {
    const history = document.querySelector(".repl-history");
    return history?.children[0]?.textContent;
  });

  expect(firstChild).toEqual("Wrong number of arguments, only give filename.");
});

test("load_file bad filename", async ({ page }) => {
  await page.getByLabel("Login").click();
  await page.getByLabel("Command input").click();
  await page.getByLabel("Command input").fill("load_file adsfda");
  await page.getByRole("button", { name: "Submitted 0 times" }).click();

  const firstChild = await page.evaluate(() => {
    const history = document.querySelector(".repl-history");
    return history?.children[0]?.textContent;
  });

  expect(firstChild).toEqual("Bad file name");
});

//test view
test("view success", async ({ page }) => {
  await page.getByLabel("Login").click();
  await page.getByLabel("Command input").click();
  await page.getByLabel("Command input").fill("load_file mockedCities.csv");
  await page.getByRole("button", { name: "Submitted 0 times" }).click();

  await page.getByLabel("Command input").click();
  await page.getByLabel("Command input").fill("view");
  await page.getByRole("button", { name: "Submitted 1 times" }).click();

  const secondChild = await page.evaluate(() => {
    const history = document.querySelector(".repl-history");
    return history?.children[1]?.textContent;
  });

  expect(secondChild).toContain(
    "NameWalkablePopulationClimateCountryNew York CityYes9 millioncontinentalUnited States of AmericaChicagoNo3 millioncontinentalUnited States of AmericaTokyoYes14 millionsubtropicalJapan"
  );
});

test("view before load", async ({ page }) => {
  await page.getByLabel("Login").click();
  await page.getByLabel("Command input").click();
  await page.getByLabel("Command input").fill("view");
  await page.getByRole("button", { name: "Submitted 0 times" }).click();

  const firstChild = await page.evaluate(() => {
    const history = document.querySelector(".repl-history");
    return history?.children[0]?.textContent;
  });

  expect(firstChild).toContain("File not loaded");
});

test("view wrong arguments", async ({ page }) => {
  await page.getByLabel("Login").click();
  await page.getByLabel("Command input").click();
  await page.getByLabel("Command input").fill("load_file mockedAnimals.csv");
  await page.getByRole("button", { name: "Submitted 0 times" }).click();

  await page.getByLabel("Command input").click();
  await page.getByLabel("Command input").fill("view file");
  await page.getByRole("button", { name: "Submitted 1 times" }).click();

  const secondChild = await page.evaluate(() => {
    const history = document.querySelector(".repl-history");
    return history?.children[1]?.textContent;
  });

  expect(secondChild).toEqual(
    "Wrong number of arguments, view does not take any."
  );
});

test("view dataset one column", async ({ page }) => {
  await page.getByLabel("Login").click();
  await page.getByLabel("Command input").click();
  await page.getByLabel("Command input").fill("load_file mockedOneColumn.csv");
  await page.getByRole("button", { name: "Submitted 0 times" }).click();

  await page.getByLabel("Command input").click();
  await page.getByLabel("Command input").fill("view");
  await page.getByRole("button", { name: "Submitted 1 times" }).click();

  const secondChild = await page.evaluate(() => {
    const history = document.querySelector(".repl-history");
    return history?.children[1]?.textContent;
  });

  expect(secondChild).toEqual("Data");
});

test("view empty dataset", async ({ page }) => {
  await page.getByLabel("Login").click();
  await page.getByLabel("Command input").click();
  await page
    .getByLabel("Command input")
    .fill("load_file mockedEmptyDataset.csv");
  await page.getByRole("button", { name: "Submitted 0 times" }).click();

  await page.getByLabel("Command input").click();
  await page.getByLabel("Command input").fill("view");
  await page.getByRole("button", { name: "Submitted 1 times" }).click();

  const secondChild = await page.evaluate(() => {
    const history = document.querySelector(".repl-history");
    return history?.children[1]?.textContent;
  });

  expect(secondChild).toEqual("");
});

test("view empty array dataset", async ({ page }) => {
  await page.getByLabel("Login").click();
  await page.getByLabel("Command input").click();
  await page
    .getByLabel("Command input")
    .fill("load_file mockedEmptyArrayDataset.csv");
  await page.getByRole("button", { name: "Submitted 0 times" }).click();

  await page.getByLabel("Command input").click();
  await page.getByLabel("Command input").fill("view");
  await page.getByRole("button", { name: "Submitted 1 times" }).click();

  const secondChild = await page.evaluate(() => {
    const history = document.querySelector(".repl-history");
    return history?.children[1]?.textContent;
  });

  expect(secondChild).toEqual("");
});

test("searchReptile success", async ({ page }) => {
  await page.getByLabel("Login").click();
  await page.getByLabel("Command input").click();
  await page.getByLabel("Command input").fill("load_file mockedAnimals.csv");
  await page.getByRole("button", { name: "Submitted 0 times" }).click();

  await page.getByLabel("Command input").click();
  await page.getByLabel("Command input").fill("search Reptile");
  await page.getByRole("button", { name: "Submitted 1 times" }).click();

  const secondChild = await page.evaluate(() => {
    const history = document.querySelector(".repl-history");
    return history?.children[1]?.textContent;
  });

  expect(secondChild).toEqual("Boa constrictorCarnivore20GreenReptile");
});

test("searchClimateContinental success", async ({ page }) => {
  await page.getByLabel("Login").click();
  await page.getByLabel("Command input").click();
  await page.getByLabel("Command input").fill("load_file mockedCities.csv");
  await page.getByRole("button", { name: "Submitted 0 times" }).click();

  await page.getByLabel("Command input").click();
  await page.getByLabel("Command input").fill("search Climate continental");
  await page.getByRole("button", { name: "Submitted 1 times" }).click();

  const secondChild = await page.evaluate(() => {
    const history = document.querySelector(".repl-history");
    return history?.children[1]?.textContent;
  });

  expect(secondChild).toEqual(
    "New York CityYes9 millioncontinentalUnited States of AmericaChicagoNo3 millioncontinentalUnited States of America"
  );
});

test("search3Black success", async ({ page }) => {
  await page.getByLabel("Login").click();
  await page.getByLabel("Command input").click();
  await page.getByLabel("Command input").fill("load_file mockedAnimals.csv");
  await page.getByRole("button", { name: "Submitted 0 times" }).click();

  await page.getByLabel("Command input").click();
  await page.getByLabel("Command input").fill("search 3 Black");
  await page.getByRole("button", { name: "Submitted 1 times" }).click();

  const secondChild = await page.evaluate(() => {
    const history = document.querySelector(".repl-history");
    return history?.children[1]?.textContent;
  });

  expect(secondChild).toEqual("Little PenguinCarnivore6BlackBird");
});

test("search before load", async ({ page }) => {
  await page.getByLabel("Login").click();
  await page.getByLabel("Command input").click();
  await page.getByLabel("Command input").fill("search Reptile");
  await page.getByRole("button", { name: "Submitted 0 times" }).click();

  const firstChild = await page.evaluate(() => {
    const history = document.querySelector(".repl-history");
    return history?.children[0]?.textContent;
  });

  expect(firstChild).toContain("File not loaded");
});

test("search wrong number of arguments", async ({ page }) => {
  await page.getByLabel("Login").click();
  await page.getByLabel("Command input").click();
  await page.getByLabel("Command input").fill("load_file mockedAnimals.csv");
  await page.getByRole("button", { name: "Submitted 0 times" }).click();

  await page.getByLabel("Command input").click();
  await page.getByLabel("Command input").fill("search");
  await page.getByRole("button", { name: "Submitted 1 times" }).click();

  const secondChild = await page.evaluate(() => {
    const history = document.querySelector(".repl-history");
    return history?.children[1]?.textContent;
  });

  expect(secondChild).toContain(
    "Wrong number of arguments, search takes <column> <value> or <value>"
  );
});

test("search no results", async ({ page }) => {
  await page.getByLabel("Login").click();
  await page.getByLabel("Command input").click();
  await page.getByLabel("Command input").fill("load_file mockedAnimals.csv");
  await page.getByRole("button", { name: "Submitted 0 times" }).click();

  await page.getByLabel("Command input").click();
  await page.getByLabel("Command input").fill("search turtle");
  await page.getByRole("button", { name: "Submitted 1 times" }).click();

  const secondChild = await page.evaluate(() => {
    const history = document.querySelector(".repl-history");
    return history?.children[1]?.textContent;
  });

  expect(secondChild).toEqual("No matches");
});

test("running everything", async ({ page }) => {
  await page.getByLabel("Login").click();
  await page.getByLabel("Command input").click();
  await page.getByLabel("Command input").fill("load_file mockedAnimals.csv");
  await page.getByRole("button", { name: "Submitted 0 times" }).click();

  await page.getByLabel("Command input").click();
  await page.getByLabel("Command input").fill("mode");
  await page.getByRole("button", { name: "Submitted 1 times" }).click();

  await page.getByLabel("Command input").click();
  await page.getByLabel("Command input").fill("view");
  await page.getByRole("button", { name: "Submitted 2 times" }).click();

  await page.getByLabel("Command input").click();
  await page.getByLabel("Command input").fill("search Reptile");
  await page.getByRole("button", { name: "Submitted 3 times" }).click();

  const firstChild = await page.evaluate(() => {
    const history = document.querySelector(".repl-history");
    return history?.children[0]?.textContent;
  });

  const secondChild = await page.evaluate(() => {
    const history = document.querySelector(".repl-history");
    return history?.children[1]?.textContent;
  });

  const thirdChild = await page.evaluate(() => {
    const history = document.querySelector(".repl-history");
    return history?.children[2]?.textContent;
  });

  const fourthChild = await page.evaluate(() => {
    const history = document.querySelector(".repl-history");
    return history?.children[3]?.textContent;
  });

  const fifthChild = await page.evaluate(() => {
    const history = document.querySelector(".repl-history");
    return history?.children[4]?.textContent;
  });

  const sixthChild = await page.evaluate(() => {
    const history = document.querySelector(".repl-history");
    return history?.children[5]?.textContent;
  });

  const seventhChild = await page.evaluate(() => {
    const history = document.querySelector(".repl-history");
    return history?.children[6]?.textContent;
  });

  const eigthChild = await page.evaluate(() => {
    const history = document.querySelector(".repl-history");
    return history?.children[7]?.textContent;
  });

  expect(firstChild).toContain("Loaded mockedAnimals.csv");
  expect(secondChild).toContain("Response mode has been set to VERBOSE");
  expect(thirdChild).toContain("Command: view");
  expect(fourthChild).toContain("Output table below: ");
  expect(fifthChild).toContain(
    "NameDietAverage LifespanColorClassLittle PenguinCarnivore6BlackBirdBlack BearOmnivore10BlackMammalBoa constrictorCarnivore20GreenReptilePeregrine falconCarnivore15GreyBird"
  );
  expect(sixthChild).toContain("Command: search");
  expect(seventhChild).toContain("Output table below: ");
  expect(eigthChild).toEqual("Boa constrictorCarnivore20GreenReptile");
});
