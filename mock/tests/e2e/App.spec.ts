import { expect, test } from "@playwright/test";

test.beforeEach(async ({ page }) => {
  await page.goto("http://localhost:8000/");
});

/**
 * Ensures that on page load, a login button is visible.
 */
test("on page load, i see a login button", async ({ page }) => {
  await expect(page.getByLabel("Login")).toBeVisible();
});

/**
 * Ensures that on page load, the input box and sign out box are not visible until login.
 * After clicking the login button, the sign out box and input box become visible.
 */
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

/**
 * Tests logging in, signing out, and logging back in.
 */
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

/**
 * Ensures a button is visible on page load.
 */
test("on page load, i see a button", async ({ page }) => {
  await page.getByLabel("Login").click();
  await expect(
    page.getByRole("button", { name: "Submitted 0 times" })
  ).toBeVisible();
});

/**
 * Tests behavior when a non-existing command is entered.
 */
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

/**
 * Tests behavior when a button is clicked and its label increments.
 */
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

/**
 * Tests behavior when an empty command is entered.
 */
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

/**
 * Tests the functionality of the 'mode' command, ensuring it changes the response mode.
 */
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
test("call mode and check output change for commands", async ({ page }) => {
  await page.getByLabel("Login").click();
  await page.getByLabel("Command input").click();
  await page.getByLabel("Command input").fill("mode");
  await page.getByRole("button", { name: "Submitted 0 times" }).click();

  // Tests that mode is initially set as BRIEF
  const firstChild = await page.evaluate(() => {
    const history = document.querySelector(".repl-history");
    return history?.children[0]?.textContent;
  });

  // Calling load in VERBOSE
  await page.getByLabel("Command input").click();
  await page.getByLabel("Command input").fill("load_file mockedOneColumn.csv");
  await page.getByRole("button", { name: "Submitted 1 times" }).click();

  const secondChild = await page.evaluate(() => {
    const history = document.querySelector(".repl-history");
    return history?.children[1]?.textContent;
  });

  const thirdChild = await page.evaluate(() => {
    const history = document.querySelector(".repl-history");
    return history?.children[2]?.textContent;
  });

  // Calling  view in VERBOSE
  await page.getByLabel("Command input").click();
  await page.getByLabel("Command input").fill("view");
  await page.getByRole("button", { name: "Submitted 2 times" }).click();

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

  // Calling search in VERBOSE
  await page.getByLabel("Command input").click();
  await page.getByLabel("Command input").fill("search turtle");
  await page.getByRole("button", { name: "Submitted 3 times" }).click();

  const seventhChild = await page.evaluate(() => {
    const history = document.querySelector(".repl-history");
    return history?.children[6]?.textContent;
  });

  const eighthChild = await page.evaluate(() => {
    const history = document.querySelector(".repl-history");
    return history?.children[7]?.textContent;
  });

  // Calling mode in VERBOSE
  await page.getByLabel("Command input").click();
  await page.getByLabel("Command input").fill("mode");
  await page.getByRole("button", { name: "Submitted 4 times" }).click();

  const ninthChild = await page.evaluate(() => {
    const history = document.querySelector(".repl-history");
    return history?.children[8]?.textContent;
  });

  const tenthChild = await page.evaluate(() => {
    const history = document.querySelector(".repl-history");
    return history?.children[9]?.textContent;
  });

  // Calling load_file in BRIEF
  await page.getByLabel("Command input").click();
  await page.getByLabel("Command input").fill("load_file mockedOneColumn.csv");
  await page.getByRole("button", { name: "Submitted 5 times" }).click();

  const eleventhChild = await page.evaluate(() => {
    const history = document.querySelector(".repl-history");
    return history?.children[10]?.textContent;
  });

  // Calling view in BRIEF
  await page.getByLabel("Command input").click();
  await page.getByLabel("Command input").fill("view");
  await page.getByRole("button", { name: "Submitted 6 times" }).click();

  const twelfthChild = await page.evaluate(() => {
    const history = document.querySelector(".repl-history");
    return history?.children[11]?.textContent;
  });

  // calling search in BRIEF
  await page.getByLabel("Command input").click();
  await page.getByLabel("Command input").fill("search turtle");
  await page.getByRole("button", { name: "Submitted 7 times" }).click();

  const thirteenthChild = await page.evaluate(() => {
    const history = document.querySelector(".repl-history");
    return history?.children[12]?.textContent;
  });

  expect(firstChild).toEqual("Response mode has been set to VERBOSE");
  expect(secondChild).toEqual("Command: load_file");
  expect(thirdChild).toEqual("Output: Loaded mockedOneColumn.csv");
  expect(fourthChild).toEqual("Command: view");
  expect(fifthChild).toEqual("Output table below: ");
  expect(sixthChild).toEqual("Data");
  expect(seventhChild).toEqual("Command: search");
  expect(eighthChild).toEqual("Output: No matches");
  expect(ninthChild).toEqual("Command: mode");
  expect(tenthChild).toEqual("Output: Response mode has been set to BRIEF");
  expect(eleventhChild).toEqual("Loaded mockedOneColumn.csv");
  expect(twelfthChild).toEqual("Data");
  expect(thirteenthChild).toEqual("No matches");
});

/**
 * Tests the 'load_file' command for successful file loading.
 */
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

/**
 * Tests the 'load_file' command when wrong arguments are provided.
 */
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

/**
 * Tests the 'load_file' command when a bad filename is provided.
 */
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

/**
 * Tests the 'view' command for successful viewing of data.
 */
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

/**
 * Tests the 'view' command when executed before loading a file.
 */
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

/**
 * Tests the 'view' command when wrong arguments are provided.
 */
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

/**
 * Tests the 'view' command when the dataset has only one column.
 */
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

/**
 * Tests the 'view' command when the dataset is empty.
 */
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

/**
 * Tests the 'view' command when the dataset is an array containingh empty arrays.
 */
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

/**
 * Tests the 'searchReptile' command for successful search results.
 */
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

/**
 * Tests the 'searchClimateContinental' command for successful search results.
 */
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
    "New York CityYes9 millioncontinentalUnited States of AmericaChicagoNo3" +
      " millioncontinentalUnited States of America"
  );
});

/**
 * Tests the 'search3Black' command for successful search results.
 */
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
/**
 * Tests the 'search' command when executed before loading a file.
 */
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

/**
 * Tests the 'search' command when wrong number of arguments are provided.
 */
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

/**
 * Tests the 'search' command when no results are found.
 */
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

/**
 * Tests the execution of multiple commands in sequence.
 */
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
    "NameDietAverage LifespanColorClassLittle PenguinCarnivore6BlackBirdBlack" +
      " BearOmnivore10BlackMammalBoa constrictorCarnivore20GreenReptile" +
      "Peregrine falconCarnivore15GreyBird"
  );
  expect(sixthChild).toContain("Command: search");
  expect(seventhChild).toContain("Output table below: ");
  expect(eigthChild).toEqual("Boa constrictorCarnivore20GreenReptile");
});
