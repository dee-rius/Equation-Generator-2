const inputFields = document.getElementsByTagName("input");

for(inputField of inputFields)
{
  inputField.addEventListener("change", checkIfHasNumbers);
}

//As text can also be entered, checks if the user has entered text and tells them only numbers are acceptable
function checkIfHasNumbers()
{
  if(this.type == "text")
  {
    if(isNaN(this.value))
    {
      alert("Please enter only numbers");
    }
  }
  
}

const revealDpInputCheckbox = document.getElementById("add-decimals-checkbox");
const userDpInput = document.getElementById("decimal-places-input");
let chosenDecimals = 0;

userDpInput.addEventListener('change', checkValue);

//checks if value of input element exceeds max or is below the min
function checkValue()
{
  if(Number(userDpInput.value) > 100 || Number(userDpInput.value < 1))
  {
    alert("Number of decimal places should be between 1 and 100");
  }
} 

//so the user decimal place input element is displayed once the user choses to include decimals
revealDpInputCheckbox.addEventListener('change', displayUserDpInput);

function displayUserDpInput()
{
  if(revealDpInputCheckbox.checked){
    userDpInput.style.display = "inline-block";
    userDpInput.classList.remove("dP-input-exit");
    userDpInput.classList.add("dP-input-enter");
  }
  else{
    userDpInput.classList.remove("dP-input-enter");
    userDpInput.classList.add("dP-input-exit");
    setTimeout(hideUserDpInput, 45);
  }
}

function hideUserDpInput() {
  userDpInput.style.display = "none";
}

const userMinValue = document.getElementById("user-min-value");
let minValue = 0;
const userMaxValue = document.getElementById("user-max-value");
let maxValue = 0;

userMaxValue.addEventListener('change', compareValues);
userMinValue.addEventListener('change', compareValues);

//compares the values of the inputted min and max values
function compareValues()
{
  if(userMinValue.value != "" && userMaxValue.value != "" && Number(userMaxValue.value) < Number(userMinValue.value ))
  {
    alert("The max must be greater or equal to the min, else, the values will be swapped");
  }
}


const chosenOperators = document.getElementsByName("chosen-operators");

const selectedNumOfNums = document.getElementById("number-of-numbers");
let numOfNums = 0;

selectedNumOfNums.addEventListener("change", noDecimals)

function noDecimals() {
  selectedNumOfNums.value = Number(selectedNumOfNums.value).toFixed(0);
}

const settingsConfirmButton = document.getElementById("settings-confirm-button");

settingsConfirmButton.addEventListener('click', settingsComplete);

const requiredInputFields = [userMaxValue, userMinValue, selectedNumOfNums];

let allConditionsMet =  false;

function settingsComplete() 
{   
  let filledInFields = 0;
  let checkedCheckboxes = 0;
  let conditionsMet = 0;
  allConditionsMet = false;
  
  //checks if all required input fields are filled in
  for(requiredField of requiredInputFields)
  {
    if(requiredField.value != "")
    {
      filledInFields += 1;
    }
  }
  if(filledInFields == 3)
  {
    conditionsMet += 1;
  }
  
  //checks if at least one operator is chosen
  for(chosenOperator of chosenOperators)
  {
    if(chosenOperator.checked)
    {
      checkedCheckboxes += 1;
    }
  }
  if(checkedCheckboxes > 0)
  {
    conditionsMet += 1;
  }
  
  if(conditionsMet == 2)
  {
    allConditionsMet = true;
  }
  else
  {
    allConditionsMet = false;
  }
  
  if(allConditionsMet == true)
  {
    getSettingValues();
  }
  else
  {
    alert("Please fill in all required input fields and selected at least one operator");
  }
}

function getSettingValues()
{
  //checks if value exceeds the max or is below the min
  if(userDpInput.value > 100)
  {
    userDpInput.value = 100;
  }
  //Surprisingly, it also changes to one if there has been no inputted dp value, which is ni
  else if(userDpInput.value < 1)
  {
    userDpInput.value = 1;
  }
  
  //gets user's chosen number of decimals
  if(revealDpInputCheckbox.checked){
    chosenDecimals = Number(userDpInput.value);
    console.log("dp value= " + chosenDecimals);
  }
  else if(!revealDpInputCheckbox.checked){
    chosenDecimals = 0;
    console.log("dp value= " + chosenDecimals);
  }
  
  //checks if the user min value is bigger than the user max value and swaps them around
  if(Number(userMinValue.value) > Number(userMaxValue.value))
  {
    let swapValue = userMinValue.value;
    userMinValue.value = userMaxValue.value;
    userMaxValue.value = swapValue;
  }
  
  //makes sure the chosen min and max values have the same decimal places as the user's decimal places input
  if(revealDpInputCheckbox.checked)
  {
    userMinValue.value = Number(userMinValue.value).toFixed(chosenDecimals);
    userMaxValue.value = Number(userMaxValue.value).toFixed(chosenDecimals);
  }
  else
  {
    userMinValue.value = Number(userMinValue.value).toFixed(0);
    userMaxValue.value = Number(userMaxValue.value).toFixed(0);
  }
  
  //gets user's chosen max and min values
    minValue = Number(userMinValue.value);
    maxValue = Number(userMaxValue.value);
    
    console.log("min= " + minValue,"max= " + maxValue);
  
  
  //gets number of numbers to generate
    numOfNums = selectedNumOfNums.value;
    console.log(numOfNums);
}

const generateEquationButton = document.getElementById("generate-equation-button");
const equationText = document.getElementById("equation-text");

generateEquationButton.addEventListener("click", generateEquation);

function generateEquation()
{
  let operators = [];
  
  
  if(allConditionsMet == true)
  {
    
    //loops through list of operators and adds the ones selected to a list
    for(chosenOperator of chosenOperators)
  {
    if(chosenOperator.checked)
    {
      operators.splice(operators.length, 0, chosenOperator.value);
    }
  }
    
    //checks if no decimals have been selected nd generates an equation with no decimals
    if(!revealDpInputCheckbox.checked)
    {
      equationText.textContent = getRandomInt(maxValue, minValue);
      console.log(equationText.textContent);
      
      while(numOfNums > 1)
      {
        equationText.textContent += operators[getRandomInt(operators.length - 1, 0)] + getRandomInt(maxValue, minValue);
        
        numOfNums -= 1;
      }
    }
    else if(revealDpInputCheckbox.checked)
  {
    equationText.textContent = getRandomFloat(maxValue, minValue).toFixed(chosenDecimals);
      console.log(equationText.textContent);
      
    while(numOfNums > 1)
    {
        equationText.textContent += operators[getRandomInt(operators.length - 1, 0)] + getRandomFloat(maxValue, minValue).toFixed(chosenDecimals);
        
        numOfNums -= 1;
    }
  }
    
    numOfNums = selectedNumOfNums.value;
  }
  else{
    alert("Please fill in all customisation menu input fields and click 'Confirm'.")
  }
}

function getRandomInt(max, min)
{
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function getRandomFloat(max, min)
{
  return Math.random() * (max - min + 1) + min;
}

const answerSection = document.getElementById("answer-section");
const answerInput = document.getElementById("answer-input");
const checkAnsButton = document.getElementById("check-answer-button");
const feedbackText = document.getElementById("feedback-text");

let isCorrect = false;

let correctAns = 0;

generateEquationButton.addEventListener('click', resetSection)

function resetSection()
{
  answerInput.value = "";
  answerSection.style.backgroundColor = "black";
  feedbackText.innerHTML = "";
  revealedAns = false;
  isCorrect = false;
}

checkAnsButton.addEventListener('click', checkAnswer);

function checkAnswer()
{
  let userAns = answerInput.value;
  correctAns = eval(equationText.textContent).toFixed(chosenDecimals);
  console.log("correct answer = " + correctAns);
  
  if(allConditionsMet == true && equationText.value != "")
  {
    if(Number(userAns).toFixed(chosenDecimals) == Number((correctAns)).toFixed(chosenDecimals))
    {
      if(revealedAns == false)
      {
        answerSection.style.backgroundColor = "rgb(50,120,50)";
        feedbackText.innerHTML = "Correct!";
        isCorrect = true;
      }
      else{
        answerSection.style.backgroundColor = "rgb(50,120,50)";
        feedbackText.innerHTML = "Correct, but you got help.";
        isCorrect = true;
      }
    }
    else if(answerInput.value == "")
    {
      feedbackText.innerHTML = "Nothing to check...";
    }
    else{
      answerSection.style.backgroundColor = "rgb(200,50,50)";
      
      feedbackText.innerHTML = "wrong..."
    }
  }
  else if(equationText.innerHTML == "")
  {
    alert("Please generate an equation first");
  }
  else
  {
   alert("Please complete customisation");
  }
}

const revealAnsButton = document.getElementById("reveal-answer-button");
let revealedAns = false;

revealAnsButton.addEventListener('click', revealAns);

function revealAns()
{
  correctAns = Number(eval(equationText.textContent)).toFixed(chosenDecimals);
  
  if(equationText.innerHTML != "")
  {
    if(isCorrect == false)
    {
      answerInput.value = correctAns;
      revealedAns = true;
    }
  }
  else{
    alert("Please generate an equation first");
  }
}

//Time for some polishing
const menuRevealText = document.getElementById("menu-reveal-text");
const theMenu = document.getElementById("menu");
const theMenuHolder = document.getElementById("menu-holder");

menuRevealText.addEventListener('click', showMenu);

function showMenu()
{
  menuRevealText.innerHTML = "Customisation Menu";
  theMenu.style.display = "flex";
  theMenuHolder.classList.remove("menu-exit");
}

settingsConfirmButton.addEventListener("click", menuExitAnim);

function menuExitAnim()
{
  if(allConditionsMet == true)
  {
    menuRevealText.textContent = "Click to open customisation menu";
    theMenuHolder.classList.add("menu-exit");
    setTimeout(hideMenu, 140);
  }
}

function hideMenu()
{
  theMenu.style.display = "none";
}
