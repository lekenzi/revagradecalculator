//Variables
var numberOfSubjects = 0;
var numberOfIA = 0;
var numberOfSubjectsArr = [];
var internals = [];
var tempInternals = [];
var assignments = [];
var tempAssignments = [];
var addAssignments = [];
var addInternals = [];
var dividedInternals = [];
var marks = [];
var subjNumber = 1;
var totalInternals = 0;
var totalAssignments = 0;
var mainTableHeader = ["Subjects", "Internals", "Assignments", "Marks"];
var semTableHeader = ["Subjects", "Marks", "Credits", "G.P", "C.P", "Grade"];
var semMarks = [];
var creditMarks = [];
var gradeMarks = [];
var gradePoints = [];
var creditPoints = [];
var letterGrades = [];

//Flags
var numberCheckFlag = false;
var inputCheckFlag = true;
var iaOver = false;
var assignmentOver = false;

//Elements
const numberOfSubIa = document.querySelector("#numberinput");
const inputerror = document.querySelector("#inputerr");
const mainButton = document.getElementsByClassName("button")[0];
const semButton = document.getElementsByClassName("button")[1];
const noFecthSection = document.getElementById("numberfetchsection");
const subIALabel = document.getElementById("inputlabel");
const mainDiv = document.getElementById("maindiv");

//Semester Shifting button
semButton.addEventListener("click", (event) => {
  event.preventDefault();
  if (numberCheckFlag) {
    if (
      parseInt(numberOfSubIa.value) <= 20 &&
      parseInt(numberOfSubIa.value) > 1
    ) {
      //Remove All child
      numberOfSubjects = parseInt(numberOfSubIa.value);
      noFecthSection.remove();
      //Add Sem Marks
      mainDiv.appendChild(createSemesterMarks(numberOfSubjects));
    } else {
      numberOfSubIa.value = "";
      changeError(false, inputerror, "Please Enter a number between 2 and 20");
    }
  } else {
    changeError(numberCheckFlag, inputerror, "Please Enter a number");
  }
});

//Subject and IA numbers button
mainButton.addEventListener("click", (event) => {
  event.preventDefault();
  if (numberCheckFlag) {
    if (mainButton.getAttribute("id") == "subnbtn") {
      if (
        parseInt(numberOfSubIa.value) <= 20 &&
        parseInt(numberOfSubIa.value) > 1
      ) {
        numberOfSubjects = numberOfSubIa.value;
        numberOfSubIa.value = "";
        subIALabel.innerText = "Number of Internals and Assignments";
        mainButton.setAttribute("id", "ianbtn");
      } else {
        numberOfSubIa.value = "";
        changeError(
          false,
          inputerror,
          "Please Enter a number between 2 and 20"
        );
      }
    } else if (mainButton.getAttribute("id") == "ianbtn") {
      if (
        parseInt(numberOfSubIa.value) <= 5 &&
        parseInt(numberOfSubIa.value) >= 1
      ) {
        numberOfIA = numberOfSubIa.value;
        noFecthSection.remove();
        //Create a set of Subjects array
        createArraySubjects(numberOfSubjects);
        //Create first section
        createSubjectInputSet(subjNumber, numberOfIA, "next", "Next");
      } else {
        numberOfSubIa.value = "";
        changeError(false, inputerror, "Please Enter a number between 1 and 5");
      }
    }
  } else {
    changeError(numberCheckFlag, inputerror, "Please Enter a number");
  }
});

// Function to check if the input is number
function checkIfNumber(text) {
  if (Number.isInteger(parseInt(text))) {
    numberCheckFlag = true;
  } else {
    numberCheckFlag = false;
  }
  return numberCheckFlag;
}

//Function to check IA over input
function checkIAOver(text) {
  if (parseInt(text) >= 1 && parseInt(text) <= 30) {
    iaOver = true;
  } else {
    iaOver = false;
  }
  return iaOver;
}

//Function to check Assignment over input
function checkAssignOver(text) {
  if (parseInt(text) >= 1 && parseInt(text) <= 10) {
    assignmentOver = true;
  } else {
    assignmentOver = false;
  }
  return assignmentOver;
}

//Function to change error value
function changeError(flag, errorelelement, text) {
  if (flag) {
    errorelelement.style.visibility = "hidden";
  } else {
    errorelelement.style.visibility = "visible";
    errorelelement.innerText = text;
  }
}

//Checkinput
numberOfSubIa.addEventListener("input", (event) => {
  if (checkIfNumber(numberOfSubIa.value)) {
    changeError(numberCheckFlag, inputerror, "Please Enter a number");
  } else {
    changeError(numberCheckFlag, inputerror, "Please Enter a number");
  }
});

//Check if inputs are filled
function checkInputFill() {
  //Check input values are filled or not
  const inputs = document.getElementsByClassName("inputs");
  for (let i = 0; i < inputs.length; i++) {
    if (inputs[i].value == "") {
      inputCheckFlag = false;
    } else {
      inputCheckFlag = true;
    }
  }
  return inputCheckFlag;
}

//Initialiazing Number of Subjects array
function createArraySubjects(noOfSubjects) {
  for (let i = 0; i < noOfSubjects; i++) {
    numberOfSubjectsArr.push(i);
  }
  return numberOfSubjectsArr;
}

//Creation
//Create Subject Input Set
function createSubjectInputSet(
  subNumber,
  internalAssignNumber,
  btnId,
  btnText
) {
  //Decrease the number of subject
  numberOfSubjectsArr.pop();
  const setDiv = document.createElement("div");
  setDiv.setAttribute("id", "setdiv");
  setDiv.appendChild(createSubjectHeader(subNumber));
  setDiv.appendChild(createMarksIndicator("Max IA marks - 30"));
  setDiv.appendChild(createMarksIndicator("Max Assignment marks - 10"));

  //Internals Input
  for (let i = 0; i < internalAssignNumber; i++) {
    const iaInput = createIAInput(i);
    setDiv.appendChild(iaInput);
  }

  //Assignment Input
  for (let i = 0; i < internalAssignNumber; i++) {
    const assignmentInput = createAssignmentInput(i);
    setDiv.appendChild(assignmentInput);
  }

  //Next Button
  const nextButton = createNextButton(btnId, btnText);
  setDiv.appendChild(nextButton);

  //Section Div Added
  mainDiv.appendChild(setDiv);

  const nextButtons = document.querySelector("button");

  //NextButtonClickCode
  nextButtons.addEventListener("click", (event) => {
    event.preventDefault();

    subjNumber += 1;
    //If id is next
    if (checkInputFill()) {
      if (nextButtons.id == "next") {
        if (numberOfSubjectsArr.length == 1) {
          //Fetch Input values
          for (let i = 0; i < internalAssignNumber; i++) {
            const singleIAInput = document.getElementById(`ia${i + 1}`);
            tempInternals.push(parseInt(singleIAInput.value));
          }
          internals.push([tempInternals]);
          tempInternals = [];

          //Fetch Assignment values
          for (let i = 0; i < internalAssignNumber; i++) {
            const singleAssignInput = document.getElementById(`assign${i + 1}`);
            tempAssignments.push(parseInt(singleAssignInput.value));
          }
          assignments.push([tempAssignments]);
          tempAssignments = [];
          //Remove Last Subject Set
          setDiv.remove();

          //Add a new Subject set
          createSubjectInputSet(
            subjNumber,
            numberOfIA,
            "calculate",
            "Calculate"
          );
        } else {
          //Fetch Input values
          for (let i = 0; i < internalAssignNumber; i++) {
            const singleIAInput = document.getElementById(`ia${i + 1}`);
            tempInternals.push(parseInt(singleIAInput.value));
          }
          internals.push([tempInternals]);
          tempInternals = [];

          //Fetch Assignment values
          for (let i = 0; i < internalAssignNumber; i++) {
            const singleAssignInput = document.getElementById(`assign${i + 1}`);
            tempAssignments.push(parseInt(singleAssignInput.value));
          }
          assignments.push([tempAssignments]);
          tempAssignments = [];
          //Remove Last Subject Set
          setDiv.remove();
          //Add a new Subject set
          createSubjectInputSet(subjNumber, numberOfIA, "next", "Next");
        }
      }
      //If id is calculate
      else {
        //Fetch Last Input Value
        //Fetch Input values
        for (let i = 0; i < internalAssignNumber; i++) {
          const singleIAInput = document.getElementById(`ia${i + 1}`);
          tempInternals.push(parseInt(singleIAInput.value));
        }
        internals.push([tempInternals]);
        tempInternals = [];

        //Fetch Assignment values
        for (let i = 0; i < internalAssignNumber; i++) {
          const singleAssignInput = document.getElementById(`assign${i + 1}`);
          tempAssignments.push(parseInt(singleAssignInput.value));
        }
        assignments.push([tempAssignments]);
        tempAssignments = [];
        //Create table page top section
        const tableTopSection = createTableTopSection();
        //Add Top Section
        mainDiv.appendChild(tableTopSection);
        //Create table
        const mainTable = createCompleteAddedTable(internals);
        //Add Main table
        mainDiv.appendChild(mainTable);
        //Total Marks
        mainDiv.appendChild(totalMarksView(marks));
        //Remove Last Subject Set
        setDiv.remove();
      }
    } else {
      event.preventDefault();
      //Check input values are filled or not
      const inputs = document.getElementsByClassName("inputs");
      const inputsErr = document.getElementsByClassName("inputerrorsub");
      for (let i = 0; i < inputs.length; i++) {
        inputs[i].value = "";
        inputsErr[i].style.visibility = "visible";
        inputsErr[i].innerText = "Please fill all the boxes";
      }
    }
  });
}

//Create Subject Header
function createSubjectHeader(subNumber) {
  const subHead = document.createElement("h1");
  subHead.innerText = `Subject ${subNumber}`;
  subHead.setAttribute("class", "head");
  return subHead;
}

//Create Marks indicator
function createMarksIndicator(text) {
  const marksIndicator = document.createElement("h3");
  marksIndicator.innerText = text;
  marksIndicator.setAttribute("class", "marksindicator");
  return marksIndicator;
}

//Create IA input
function createIAInput(iaIndex) {
  const iaDiv = document.createElement("div");
  const iaInput = document.createElement("input");
  iaInput.setAttribute("class", "inputs");
  iaInput.setAttribute("id", `ia${iaIndex + 1}`);
  iaInput.setAttribute("type", "type");
  iaInput.setAttribute("maxlength", "2");
  iaInput.setAttribute("minlength", "2");
  iaInput.setAttribute("placeholder", `IA ${iaIndex + 1}`);
  const iaError = document.createElement("h5");
  iaError.setAttribute("id", `ia${iaIndex + 1}err`);
  iaError.setAttribute("class", "inputerrorsub");
  iaError.innerText = "Error";
  iaDiv.appendChild(iaInput);
  iaDiv.appendChild(iaError);
  iaInput.addEventListener("input", (event) => {
    event.preventDefault();
    if (
      checkIfNumber(iaInput.value) != true ||
      checkIAOver(iaInput.value) != true
    ) {
      iaInput.value = "";
      document.getElementById(`${iaInput.id}err`).style.visibility = "visible";
      document.getElementById(`${iaInput.id}err`).innerText =
        "Please enter a number between the given range";
    } else {
      document.getElementById(`${iaInput.id}err`).style.visibility = "collapse";
    }
  });
  return iaDiv;
}

//Create Assignment input
function createAssignmentInput(assign) {
  const assignDiv = document.createElement("div");
  const assignInput = document.createElement("input");
  assignInput.setAttribute("class", "inputs");
  assignInput.setAttribute("id", `assign${assign + 1}`);
  assignInput.setAttribute("type", "text");
  assignInput.setAttribute("maxlength", "2");
  assignInput.setAttribute("minlength", "2");
  assignInput.setAttribute("placeholder", `Assignment ${assign + 1}`);
  const assignError = document.createElement("h5");
  assignError.setAttribute("id", `assign${assign + 1}err`);
  assignError.setAttribute("class", "inputerrorsub");
  assignError.innerText = "Error";
  assignDiv.appendChild(assignInput);
  assignDiv.appendChild(assignError);
  assignInput.addEventListener("input", (event) => {
    event.preventDefault();
    if (
      checkIfNumber(assignInput.value) != true ||
      checkAssignOver(assignInput.value) != true
    ) {
      assignInput.value = "";
      document.getElementById(`${assignInput.id}err`).style.visibility =
        "visible";
      document.getElementById(`${assignInput.id}err`).innerText =
        "Please enter a number between the given range";
    } else {
      document.getElementById(`${assignInput.id}err`).style.visibility =
        "collapse";
    }
  });
  return assignDiv;
}

//Create Next Button
function createNextButton(buttonId, buttonText) {
  const btnSection = document.createElement("div");
  btnSection.setAttribute("class", "buttonsection");
  const btnNext = document.createElement("button");
  btnNext.setAttribute("class", "button");
  btnNext.setAttribute("type", "submit");
  btnNext.innerText = buttonText;
  btnNext.setAttribute("id", buttonId);
  btnSection.appendChild(btnNext);
  return btnSection;
}

//Create Table Top section
function createTableTopSection() {
  //Holder
  holder = document.createElement("div");
  //H1
  iaMarksHeader = document.createElement("h1");
  iaMarksHeader.innerText = "Internals and Assignment Marks";
  iaMarksHeader.setAttribute("id", "iamarksheader");
  //Semester button
  goToSemButton = document.createElement("button");
  goToSemButton.innerText = "+ Semester";
  goToSemButton.setAttribute("id", "gotosemester");
  goToSemButton.addEventListener("click", (event) => {
    event.preventDefault();
    document.getElementById("internalassignmenttotaltable").remove();
    holder.remove();
    document.getElementById("totalmarks").remove();
    mainDiv.appendChild(createSemesterMarks(numberOfSubjects));
  });

  //Append Elements
  holder.appendChild(iaMarksHeader);
  holder.appendChild(goToSemButton);

  return holder;
}

//Complete Internal and Assigment Table
function createCompleteAddedTable(internals) {
  //Table Data
  dividedInternals = getInternalsDivided(internals);
  addInternals = getFinalArrayOfMarksInternals(dividedInternals);
  addAssignments = getFinalArrayOfMarksAssignment(assignments);
  marks = getIAAssignmentMarks(addInternals, addAssignments);

  //Main Table holder
  const table = document.createElement("div");
  table.setAttribute("id", "internalassignmenttotaltable");
  table.setAttribute("class", "text-center");
  table.setAttribute("class", "sub-table");
  //Table Header
  const rowHeader = document.createElement("div");
  rowHeader.setAttribute("class", "row");
  rowHeader.setAttribute("id", "subtableheader");
  for (let i = 0; i < mainTableHeader.length; i++) {
    const col = document.createElement("div");
    col.setAttribute("class", "col");
    col.innerText = mainTableHeader[i];
    rowHeader.appendChild(col);
  }
  table.appendChild(rowHeader);

  //Table rows
  for (
    let singlesubject = 0;
    singlesubject < numberOfSubjects;
    singlesubject++
  ) {
    //Addding Row
    const row = document.createElement("div");
    row.setAttribute("class", "row");
    row.setAttribute("id", singlesubject + 1);
    table.appendChild(row);
    //Adding Subject Column
    const subjectCol = document.createElement("div");
    subjectCol.setAttribute("class", "col");
    subjectCol.innerText = singlesubject + 1;
    row.appendChild(subjectCol);
    //Adding Internal Column
    const internalCol = document.createElement("div");
    internalCol.setAttribute("class", "col");
    internalCol.innerText = addInternals[singlesubject] + "/30";
    row.appendChild(internalCol);
    //Adding Assignment Column
    const assignCol = document.createElement("div");
    assignCol.setAttribute("class", "col");
    assignCol.innerText = addAssignments[singlesubject] + "/20";
    row.appendChild(assignCol);
    //Adding Marks Column
    const markCol = document.createElement("div");
    markCol.setAttribute("class", "col");
    markCol.innerText = marks[singlesubject] + "/50";
    row.appendChild(markCol);
  }

  return table;
}

//Create to total marks view
function totalMarksView(marks) {
  //Total marks
  var totalMarks = 0;
  for (let i = 0; i < marks.length; i++) {
    totalMarks += marks[i];
  }
  const totalMarksH1 = document.createElement("h1");
  totalMarksH1.setAttribute("id", "totalmarks");
  totalMarksH1.innerText = "Total Marks: " + totalMarks;
  return totalMarksH1;
}

//Math
//Array of final internals
function getInternalsDivided(internals) {
  var temp = [];
  var internalDivided = [];
  for (
    let onesubjectindex = 0;
    onesubjectindex < internals.length;
    onesubjectindex++
  ) {
    for (
      let oneinternalindex = 0;
      oneinternalindex < internals[onesubjectindex][0].length;
      oneinternalindex++
    ) {
      let internalMark = Math.ceil(
        internals[onesubjectindex][0][oneinternalindex] / 2
      );
      temp.push(internalMark);
    }
    internalDivided.push(temp);
    temp = [];
  }
  return internalDivided;
}

//Array of final assignment and internal marks
function getFinalArrayOfMarksInternals(existingArr) {
  var temp = 0;
  var marks = [];
  for (
    let onesubjectindex = 0;
    onesubjectindex < existingArr.length;
    onesubjectindex++
  ) {
    for (
      let onemarkindex = 0;
      onemarkindex < existingArr[onesubjectindex].length;
      onemarkindex++
    ) {
      temp += parseInt(existingArr[onesubjectindex][onemarkindex]);
    }
    marks.push(temp);
    temp = 0;
  }
  return marks;
}

function getFinalArrayOfMarksAssignment(existingArr) {
  var temp = 0;
  var marks = [];
  for (
    let onesubjectindex = 0;
    onesubjectindex < existingArr.length;
    onesubjectindex++
  ) {
    for (
      let onemarkindex = 0;
      onemarkindex < existingArr[onesubjectindex][0].length;
      onemarkindex++
    ) {
      temp += parseInt(existingArr[onesubjectindex][0][onemarkindex]);
    }
    marks.push(temp);
    temp = 0;
  }
  return marks;
}

function getIAAssignmentMarks(internals, assignment) {
  var marks = [];
  var add = 0;
  for (let i = 0; i < internals.length; i++) {
    add = internals[i] + assignment[i];
    marks.push(add);
    add = 0;
  }
  return marks;
}

//Semester CGPA and SGPA
function createSemesterMarks(noOfSubjects) {
  const semDiv = document.createElement("div");
  semDiv.setAttribute("class", "semdiv");
  semDiv.appendChild(createSemHeader("Semester"));
  semDiv.appendChild(createMarksIndicator("Max Subject marks - 100"));
  semDiv.appendChild(createMarksIndicator("Max Credit score - 4"));
  semDiv.appendChild(gradeWarningText());
  for (let i = 0; i < noOfSubjects; i++) {
    semDiv.appendChild(createSemInput(i));
    semDiv.appendChild(createCreditInput(i));
  }

  //Add Calculate button
  const calculateSem = createNextButton("calculatesem", "Calculate");
  semDiv.appendChild(calculateSem);
  calculateSem.addEventListener("click", (event) => {
    event.preventDefault();
    if (checkInputFill()) {
      for (let i = 0; i < noOfSubjects; i++) {
        const singleSemInput = document.getElementById(`sem${i + 1}`);
        semMarks.push(parseInt(singleSemInput.value));
      }
      for (let i = 0; i < noOfSubjects; i++) {
        const singleCreditInput = document.getElementById(`credit${i + 1}`);
        creditMarks.push(parseInt(singleCreditInput.value));
      }
      gradePointsSet(semMarks, creditMarks);
      creditPointsSet(gradeMarks, creditMarks);
      mainDiv.appendChild(createSemHeader("Semester"));
      mainDiv.appendChild(
        createSemesterTable(
          numberOfSubjects,
          semMarks,
          creditMarks,
          gradeMarks,
          creditPoints,
          letterGrades
        )
      );
      mainDiv.appendChild(totalSemMarksView(semMarks));
      mainDiv.appendChild(sgpaView(creditMarks, creditPoints));
      semDiv.remove();
    } else {
      event.preventDefault();
      //Check input values are filled or not
      const inputs = document.getElementsByClassName("inputs");
      const inputsErr = document.getElementsByClassName("inputerrorsub");
      for (let i = 0; i < inputs.length; i++) {
        inputs[i].value = "";
        inputsErr[i].style.visibility = "visible";
        inputsErr[i].innerText = "Please fill all the boxes";
      }
    }
  });
  return semDiv;
}

//Create Subject Header
function createSemHeader(text) {
  const semHead = document.createElement("h1");
  semHead.innerText = text;
  semHead.setAttribute("class", "head");
  return semHead;
}

//Grade Warning
function gradeWarningText() {
  const gradWarning = document.createElement("h1");
  gradWarning.innerText =
    "For credit points please refer to the semester handbook given to you";
  gradWarning.setAttribute("id", "gradwarning");
  return gradWarning;
}

//Create Semester input
function createSemInput(semIndex) {
  const semDiv = document.createElement("div");
  const semInput = document.createElement("input");
  semInput.setAttribute("class", "inputs");
  semInput.setAttribute("id", `sem${semIndex + 1}`);
  semInput.setAttribute("type", "type");
  semInput.setAttribute("maxlength", "3");
  semInput.setAttribute("minlength", "2");
  semInput.setAttribute("placeholder", `Subject ${semIndex + 1}`);
  const semError = document.createElement("h5");
  semError.setAttribute("id", `sem${semIndex + 1}err`);
  semError.setAttribute("class", "inputerrorsub");
  semError.innerText = "Error";
  semDiv.appendChild(semInput);
  semDiv.appendChild(semError);
  semInput.addEventListener("input", (event) => {
    event.preventDefault();
    if (
      checkIfNumber(semInput.value) != true ||
      checkSemOver(semInput.value) != true
    ) {
      semInput.value = "";
      document.getElementById(`${semInput.id}err`).style.visibility = "visible";
      document.getElementById(`${semInput.id}err`).innerText =
        "Please enter a number between the given range";
    } else {
      document.getElementById(`${semInput.id}err`).style.visibility =
        "collapse";
    }
  });
  return semDiv;
}

//Function to check Sem over input
function checkSemOver(text) {
  if (parseInt(text) >= 1 && parseInt(text) <= 100) {
    semOver = true;
  } else {
    semOver = false;
  }
  return semOver;
}

//Create Credit input
function createCreditInput(creditIndex) {
  const creditDiv = document.createElement("div");
  const creditInput = document.createElement("input");
  creditInput.setAttribute("class", "inputs");
  creditInput.setAttribute("id", `credit${creditIndex + 1}`);
  creditInput.setAttribute("type", "type");
  creditInput.setAttribute("maxlength", "3");
  creditInput.setAttribute("minlength", "2");
  creditInput.setAttribute(
    "placeholder",
    `Credit of Subject ${creditIndex + 1}`
  );
  const creditError = document.createElement("h5");
  creditError.setAttribute("id", `credit${creditIndex + 1}err`);
  creditError.setAttribute("class", "inputerrorsub");
  creditError.innerText = "Error";
  creditDiv.appendChild(creditInput);
  creditDiv.appendChild(creditError);
  creditInput.addEventListener("input", (event) => {
    event.preventDefault();
    if (
      checkIfNumber(creditInput.value) != true ||
      checkCreditOver(creditInput.value) != true
    ) {
      creditInput.value = "";
      document.getElementById(`${creditInput.id}err`).style.visibility =
        "visible";
      document.getElementById(`${creditInput.id}err`).innerText =
        "Please enter a number between the given range";
    } else {
      document.getElementById(`${creditInput.id}err`).style.visibility =
        "collapse";
    }
  });

  return creditDiv;
}

//Grade points
function gradePointsSet(semMarks, creditMarks) {
  for (let i = 0; i < numberOfSubjects; i++) {
    if (semMarks[i] >= 90 && semMarks[i] <= 100) {
      gradeMarks.push(10);
      gradePoints.push(creditMarks[i] * 10);
      letterGrades.push("O");
    } else if (semMarks[i] >= 80 && semMarks[i] <= 89) {
      gradeMarks.push(9);
      gradePoints.push(creditMarks[i] * 9);
      letterGrades.push("A+");
    } else if (semMarks[i] >= 70 && semMarks[i] <= 79) {
      gradeMarks.push(8);
      gradePoints.push(creditMarks[i] * 8);
      letterGrades.push("A");
    } else if (semMarks[i] >= 60 && semMarks[i] <= 69) {
      gradeMarks.push(7);
      gradePoints.push(creditMarks[i] * 7);
      letterGrades.push("B");
    } else if (semMarks[i] >= 55 && semMarks[i] <= 59) {
      gradeMarks.push(6);
      gradePoints.push(creditMarks[i] * 6);
      letterGrades.push("B");
    } else if (semMarks[i] >= 50 && semMarks[i] <= 54) {
      gradeMarks.push(5.5);
      gradePoints.push(creditMarks[i] * 5.5);
      letterGrades.push("C+");
    } else if (semMarks[i] >= 40 && semMarks[i] <= 49) {
      gradeMarks.push(5);
      gradePoints.push(creditMarks[i] * 5);
      letterGrades.push("C");
    } else if (semMarks[i] >= 0 && semMarks[i] <= 39) {
      gradeMarks.push(0);
      gradePoints.push(creditMarks[i] * 0);
      letterGrades.push("F");
    }
  }
}

//Credit Points
function creditPointsSet(gradeMarks, creditMarks) {
  marks = 0;
  for (let i = 0; i < numberOfSubjects; i++) {
    creditPoints.push(gradeMarks[i] * creditMarks[i]);
  }
}

//Function to check Sem over input
function checkCreditOver(text) {
  if (parseInt(text) >= 1 && parseInt(text) <= 4) {
    creditOver = true;
  } else {
    creditOver = false;
  }
  return creditOver;
}

//Create Semester Table
function createSemesterTable(
  numberOfSubjects,
  semMarks,
  creditMarks,
  gradeMarks,
  creditPoints,
  letterGrades
) {
  //Sem Table holder
  const table = document.createElement("div");
  const rowHeader = document.createElement("div");
  rowHeader.setAttribute("class", "row");
  table.setAttribute("class", "text-center");
  table.setAttribute("class", "sub-table");
  for (let i = 0; i < semTableHeader.length; i++) {
    const col = document.createElement("div");
    col.setAttribute("class", "col");
    col.innerText = semTableHeader[i];
    rowHeader.appendChild(col);
  }
  table.appendChild(rowHeader);

  //Table rows
  for (
    let singlesubject = 0;
    singlesubject < numberOfSubjects;
    singlesubject++
  ) {
    //Addding Row
    const row = document.createElement("div");
    row.setAttribute("class", "row");
    row.setAttribute("id", singlesubject + 1);
    table.appendChild(row);
    //Adding Subject Column
    const subjectCol = document.createElement("div");
    subjectCol.setAttribute("class", "col");
    subjectCol.innerText = singlesubject + 1;
    row.appendChild(subjectCol);
    //Adding Marks Column
    const marksCol = document.createElement("div");
    marksCol.setAttribute("class", "col");
    marksCol.innerText = semMarks[singlesubject] + "/100";
    row.appendChild(marksCol);
    //Adding Credit Column
    const creditCol = document.createElement("div");
    creditCol.setAttribute("class", "col");
    creditCol.innerText = creditMarks[singlesubject];
    row.appendChild(creditCol);
    //Adding G.P Column
    const gpCol = document.createElement("div");
    gpCol.setAttribute("class", "col");
    gpCol.innerText = gradeMarks[singlesubject];
    row.appendChild(gpCol);
    //Adding C.P Column
    const cpCol = document.createElement("div");
    cpCol.setAttribute("class", "col");
    cpCol.innerText = creditPoints[singlesubject];
    row.appendChild(cpCol);
    //Adding C.P Column
    const lgCol = document.createElement("div");
    lgCol.setAttribute("class", "col");
    lgCol.innerText = letterGrades[singlesubject];
    row.appendChild(lgCol);
  }
  return table;
}

//Create to total marks view
function totalSemMarksView(marks) {
  //Total marks
  var totalSemMarks = 0;
  for (let i = 0; i < marks.length; i++) {
    totalSemMarks += marks[i];
  }
  const totalSemMarksH1 = document.createElement("h1");
  totalSemMarksH1.setAttribute("id", "totalsemmarks");
  totalSemMarksH1.innerText = "Total Marks: " + totalSemMarks;
  return totalSemMarksH1;
}

//Create to SGPA  view
function sgpaView(creditMarks, creditPoints) {
  //Total marks
  var totalCreditMarks = 0;
  var totalCrediPoints = 0;
  var sgpa = 0;
  for (let i = 0; i < creditMarks.length; i++) {
    totalCreditMarks += creditMarks[i];
  }
  for (let i = 0; i < creditPoints.length; i++) {
    totalCrediPoints += creditPoints[i];
  }
  sgpa = totalCrediPoints / totalCreditMarks;
  const totalSgpaMarksH1 = document.createElement("h1");
  totalSgpaMarksH1.setAttribute("id", "totalsgp");
  totalSgpaMarksH1.innerText = "SGPA: " + sgpa;
  return totalSgpaMarksH1;
}
