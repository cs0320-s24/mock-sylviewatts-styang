> **GETTING STARTED:** You should likely start with the `/mock` folder from your solution code for the mock gearup.

# Project Details

Project name: Mock
Sylvie Watts (sewatts) and Simon Yang (styang)
Hours spent: 13
Repo: https://github.com/cs0320-s24/mock-sylviewatts-styang

# Design Choices

App contains a shared state that tracks if user is logged in, a Login button - handles logged in, logged out
and a REPL interface which is displayed when user is logged in.

Controlled input:
Has the command box where users can enter their command, sets value to the command inputted by the user.

Login Button:
Button that on click logs the user in and out, sets the shared state logged in to true or false (when not logged in button says login, when logged in button says sign out)

REPLFunction:
Interface that defines REPL functions, take in an array of strings and returns either a string or a 2D array of strings

REPL:
Shared states: history - command history, load data - loaded data from CSV file, filename - loaded filename from CSV file, output mode - state that saves whether in brief or verbose mode
Then creates wrapper functions for our loadCSVMock, viewCSVMock, and searchCSVMock so that the wrappers are REPLFunctions, as REPLInput only calls commands using the CommandMap which contains REPL functions. The wrappers also allows us to pass more inputs to our actual Mock files, and to add more error checking in these wrappers.
Creates a function that is a REPLFunction which switches the mode between brief and verbose - where brief mode means that commands simply returns the output of the command and verbose mode means that commands returns both the command and the output
Then REPL creates a commandMap that maps strings to REPL functions and adds those four functions mentioned above (this allows us in REPLInput to take the string commands given to us and only call commands that are actually in our map, but also do it without having many if else statements to check commands - we can just check if the commands are in the map. This also allows stakeholders to easily add more REPLFunctions without changing REPLInput)

REPLInput:
When a user submits their command, the count on the submitted button goes up and the command given - if it is in the commandMap (i.e. is a REPLFunciton we added) - is called
After it is called depending on the mode the user is currently in, either the output is added to the history shared state or the command and the output is added to the history

REPLHistory:
Displays the command history, takes in the shared state history which is filled with the strings or string 2D arrays we want to display and adds them to our front-end

Then we also have loadCSVMock which sets the loadedData and filename if the given inputs are correct and returns loaded. We have viewCSVMock which just returns the loadedData and searchCSVMock which does not actually search, it just models three different search commands. Also we have mockedJSOn with mocked CSV files.

# Errors/Bugs

You can not call search for values that have spaces as we thought that could be better handled when implementing search, rather than when mocking it.

# Tests

-Tests that when the page is loaded there is a login button
-Tests that when the page is loaded you can not see the input box or the sign out box until you login, and then when you login you then cannot see the login button
-Tests that you can login, sign out, and then log back in again and see the expected results each time
-Tests that on page load you see the submit button and that it says submitted 0 times
-Tests then when a user enters a non-existing command - “given command” in the map that the user is shown “Command not found: given command”
-Tests that after clicking the submitted button, the count goes up
-Tests that an empty command returns command not found
-Tests mode, that switching it accurately switches the mode and that the outputs change to show command and output when in verbose mode
-Tests all of our commands in both brief and verbose modes and that it displays the data we expect
-Tests that when loading a file that exists, the output says Loaded with the name of the file
-Tests that when given the wrong amount of arguments for a load command, it outputs "Wrong number of arguments, only give filename.”
-Tests that when given a bad filename (a filename that does not exist) for load it returns “Bad file name”
-Tests that loading and then viewing a file successfully works and outputs the data
-Testing that trying to view before load returns “File not loaded”
-Tests that calling view with the wrong number of arguments returns “Wrong number of arguments, view does not take any.”
-Tests that calling view on a dataset with just one column and one row just returns that one piece of data
-Tests that calling view on an empty dataset returns an empty dataset
-Tests that calling view on an 2D dataset that contains two empty arrays returns an empty dataset
-Tests that calling search on mockedAnimals.csv with Reptile works, and returns the data expected in our mock
-Tests that calling search on mockedCities.csv with Climate continental works and returns the data expected in our mock
-Tests that calling search on mockedAnimals.csv with 3 Black works, and returns the data expected in our mock
-Tests that calling search before loading a file returns “File not loaded”
-Tests that calling search with the wrong number of arguments returns "Wrong number of arguments, search takes <column><value> or <value>"
-Tests that calling search with something not in the dataset/not mocked returns “No matches”
-Tests running everything successfully - i.e. load, then mode, then view, then search and that it returns all the data we expect

# How to

In the terminal run npm start, then navigate to the browser using that link. Then to login you push the login button, and if you want to then signout you click the button that changed to read signout. Once logged in you will see a bar at the bottom that says “Enter command here!” You type in your command there and then press the button at the bottom that will at first say “Submitted 0 times” but as you submit, it will increment to reflect the amount of times you have submitted. The commands we support are: mode, load_file + filename where filename is just the name of the file, view, and search + <column><value> OR search + <value>. Column can either be an integer column number or the string name of the column. Our five filenames are “mockedAnimals.csv”, “mockedCities.csv”, mockedOneColumn.csv”, “mockedEmptyyDataset.csv”, and “mockedEmptyArrayDataset.csv”. At this point we have only mocked Search so you can only search mockedCities for “Climate” “continental” and mockedAnimals for “3” “Black” and “Reptile”.

# Collaboration

None
