"use strict"


//Menu functions.
//Used for the overall flow of the application.
/////////////////////////////////////////////////////////////////
//#region 

// app is the function called to start the entire application
function app(people){
  let searchType = promptFor("Do you know the name of the person you are looking for? Enter 'yes' or 'no'", yesNo).toLowerCase();
  let searchResults;
  switch(searchType){
    case 'yes':
      searchResults = searchByName(people);
      break;
    case 'no':
      // TODO: search by traits
      let traitSearchType = promptFor(`What trait would you like to search for? 
      Enter "1" to search by gender
      Enter "2" to search by birthdate
      Enter "3" to search by height
      Enter "4" to search by weight
      Enter "5" to search by eye color
      Enter "6" to search by occupation
      Enter "7" to search by a parent's name
      Enter "8" to search by a spouse's name`,traitChoice);
      searchResults = searchByTrait(traitSearchType);
      break;
      default:
    app(people); // restart app
      break;
  }
  
  // Call the mainMenu function ONLY after you find the SINGLE person you are looking for
  mainMenu(searchResults, people);
}

// Menu function to call once you find who you are looking for
function mainMenu(person, people){

  /* Here we pass in the entire person object that we found in our search, as well as the entire original dataset of people. We need people in order to find descendants and other information that the user may want. */

  if(!person){
    alert("Could not find that individual.");
    return app(people); // restart
  }

  let displayOption = promptFor("Found " + person.firstName + " " + person.lastName + " . Do you want to know their 'info', 'family', or 'descendants'? Type the option you want or 'restart' or 'quit'", autoValid);

  switch(displayOption){
    case "info":
    // TODO: get person's info
    break;
    case "family":
    // TODO: get person's family
    break;
    case "descendants":
    // TODO: get person's descendants
    break;
    case "restart":
    app(people); // restart
    break;
    case "quit":
    return; // stop execution
    default:
    return mainMenu(person, people); // ask again
  }
}

//#endregion

//Filter functions.
//Ideally you will have a function for each trait.
/////////////////////////////////////////////////////////////////
//#region 

//nearly finished function used to search through an array of people to find matching first and last name and return a SINGLE person object.
function searchByName(people){
  let firstName = promptFor("What is the person's first name?", autoValid);
  let lastName = promptFor("What is the person's last name?", autoValid);

  let foundPerson = people.filter(function(potentialMatch){
    if(potentialMatch.firstName === firstName && potentialMatch.lastName === lastName){
      return true;
    }
    else{
      return false;
    }
  })
  // TODO: find the person single person object using the name they entered.
  return foundPerson;
}

//unfinished function to search through an array of people to find matching eye colors. Use searchByName as reference.
function searchByTrait(traitType){
  traitType = parseInt(traitType);
  switch(traitType){
    case 1:
      let genderChoice = prompt("Enter a gender to search by.");
      searchByGender(genderChoice);
      break;
    case 2:
      let dobChoice = prompt("Enter a birthdate to search by.");
      searchByDOB(dobChoice);
      break;
    case 3:
      let heightChoice = prompt("Enter a height to search by.");
      searchByHeight(heightChoice);
      break;
    case 4:
      let weightChoice = prompt("Enter a weight to search by.");
      searchByWeight(weightChoice);
      break;
    case 5:
      //TODO (Gary) Give specific choices and validate - green, blue, grey, brown, black
      let eyeColorChoice = prompt("Enter an eye color to search by.");
      searchByEyeColor(eyeColorChoice);
      break;
    case 6:
      let jobChoice = prompt("Enter an occupation to search by.");
      searchByJob(jobChoice);
      break;
    case 7:
      let parentsChoice = prompt("Enter a parent\'s name to search by.");
      searchByParents(parentsChoice);
      break;
    case 8:
        let spouseChoice = prompt("Enter a spouse to search by.");
        searchBySpouse(spouseChoice);
        break;
    default:
    alert("That\'s and invalid entry"); // ask again
  }
}
function searchByEyeColor(people){
  let eyeColor = promptFor("What is the person\'s eye color?");
  let foundPerson = people.filter(function(potentialMatch){
    if(potentialMatch.eyeColor === eyeColor){
      return true;
    }
    else{
      return false;
    } 
  })
  return foundPerson;
}

//TODO: add other trait filter functions here.
function searchByGender(genderChoice){
  alert("Create Gender search");
}

function searchByDOB(dobChoice){
  alert("Create DOB search");
}

function searchByHeight(heightChoice){
  alert("Create height search");
}

function searchByWeight(weightChoice){
  alert("Create weight search");
}

function searchByJob(jobChoice){
  alert("Create occupation search");
}

function searchByParents(parentsChoice){
  alert("Create parents search");
}

function searchBySpouse(spouseChoice){
  alert("Create spouse search");
}

//#endregion

//Display functions.
//Functions for user interface.
/////////////////////////////////////////////////////////////////
//#region 

// alerts a list of people
function displayPeople(people){
  alert(people.map(function(person){
    return person.firstName + " " + person.lastName;
  }).join("\n"));
}

function displayPerson(person){
  // print all of the information about a person:
  // height, weight, age, name, occupation, eye color.
  let personInfo = "First Name: " + person.firstName + "\n";
  personInfo += "Last Name: " + person.lastName + "\n";
  // TODO: finish getting the rest of the information to display.
  alert(personInfo);
}

//#endregion



//Validation functions.
//Functions to validate user input.
/////////////////////////////////////////////////////////////////
//#region 

//a function that takes in a question to prompt, and a callback function to validate the user input.
//response: Will capture the user input.
//isValid: Will capture the return of the validation function callback. true(the user input is valid)/false(the user input was not valid).
//this function will continue to loop until the user enters something that is not an empty string("") or is considered valid based off the callback function(valid).
function promptFor(question, valid){
  let isValid;
  do{
    var response = prompt(question).trim();
    isValid = valid(response);
  } while(response === ""  ||  isValid === false)
  return response;
}

// helper function/callback to pass into promptFor to validate yes/no answers.
function yesNo(input){
  if(input.toLowerCase() == "yes" || input.toLowerCase() == "no"){
    return true;
  }
  else{
    return false;
  }
}
function traitChoice(input){
  if(parseInt(input) >= 1 && parseInt(input) <= 8){
    return true;
  }
  else{
    return false;
  }
}
// helper function to pass in as default promptFor validation.
//this will always return true for all inputs.
function autoValid(input){
  return true; // default validation only
}

//Unfinished validation function you can use for any of your custom validation callbacks.
//can be used for things like eye color validation for example.
function customValidation(input){
  
}

//#endregion