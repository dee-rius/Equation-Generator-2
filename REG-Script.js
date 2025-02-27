const revealDpInputCheckbox = document.getElementById("add-decimals-checkbox");
const userDpInput = document.getElementById("decimal-places-input");
let chosenDecimals = 0;

//so the user decimal place input element is displayed once the user choses to include decimals
revealDpInputCheckbox.addEventListener('change', displayUserDpInput);

function displayUserDpInput(){
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


let operators = [];
const chosenOperators = document.getElementsByName("chosen-operators");

const selectedNumOfNums = document.getElementById("number-of-numbers");
let numOfNums = 0;


const settingsConfirmButton = document.getElementById("settings-confirm-button");

settingsConfirmButton.addEventListener('click', getSettingValues);

function getSettingValues(){
  
  //gets user's chosen max and min values
  if(userMinValue.value != "" && userMinValue.value != "")
  {
    minValue = userMinValue.value;
    maxValue = userMaxValue.value;
    
    console.log("min= " + minValue,"max= " + maxValue);
  }
  
  //gets user's chosen number of decimals
  if(revealDpInputCheckbox.checked && userDpInput.value !=""){
    chosenDecimals = userDpInput.value;
    console.log("dp value= " + chosenDecimals);
  }
  else if(!revealDpInputCheckbox.checked){
    chosenDecimals = 0;
    console.log("dp value= " + chosenDecimals);
  }
  
  //gets values for chosen operators
    for(chosenOperator of chosenOperators)
   {
    if(chosenOperator.checked)
    {
      operators.splice(operators.length, 0, chosenOperator.value);
      console.log("Operator value= " + chosenOperator.value)
    }
  }
  
  //gets number of numbers to generate
  if(selectedNumOfNums.value != ""){
    numOfNums = selectedNumOfNums.value;
    console.log(numOfNums)
  }
  
}