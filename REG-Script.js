const revealDpInputCheckbox = document.getElementById("add-decimals-checkbox");
const userDpInput = document.getElementById("decimal-places-input");
let chosenDecimals = 0;

//so the user decimal place input element is displayed once the user choses to include decimals
revealDpInputCheckbox.addEventListener('change', displayUserDpInput);

function displayUserDpInput()
{
  if(revealDpInputCheckbox.checked){
    userDpInput.style.display = "inline-block";
  }
  else{
    userDpInput.style.display = "none";
  }
}

const userMinValue = document.getElementById("user-min-value");
let minValue = 0;
const userMaxValue = document.getElementById("user-max-value");
let maxValue = 0;


const chosenOperators = document.getElementsByName("chosen-operators");

const selectedNumOfNums = document.getElementById("number-of-numbers");
let numOfNums = 0;


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
  else if(revealDpInputCheckbox.checked && userDpInput.value == "")
  {
    allConditionsMet = false;
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
  
  //gets user's chosen max and min values
    minValue = Number(userMinValue.value);
    maxValue = Number(userMaxValue.value);
    
    console.log("min= " + minValue,"max= " + maxValue);
  
  //gets user's chosen number of decimals
  if(revealDpInputCheckbox.checked && userDpInput.value !=""){
    chosenDecimals = userDpInput.value;
    console.log("dp value= " + chosenDecimals);
  }
  else if(!revealDpInputCheckbox.checked){
    chosenDecimals = 0;
    console.log("dp value= " + chosenDecimals);
  }
  
  //gets number of numbers to generate
    numOfNums = selectedNumOfNums.value;
    console.log(numOfNums)
  
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
      
      while (numOfNums > 1)
      {
        equationText.textContent += operators[getRandomInt(operators.length - 1, 0)] + getRandomInt(maxValue, minValue);
        
        numOfNums -= 1;
      }
    }
    
    numOfNums = selectedNumOfNums.value;
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