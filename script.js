let displayValue = null;
let secondOperator = null;
let operation = null;
let operationBackup = null;
let result = null;
let wasScreenCleared = true;
let wasEqualPressed = false;
let writeOperator;
let wasNumEntered = false;
let wasUsed = false;





const numberButtons = document.querySelectorAll(".num");
const displayLowerScreen = document.querySelector(".bottom");
const displayUpperScreen = document.querySelector(".upper");
const operatorButtons = document.querySelectorAll(".operator");
const equalBtn = document.querySelector(".equalsBtn");
const clearBtn = document.querySelector(".clear");
const dot = document.querySelector(".dot");







numberButtons.forEach(button=> button.addEventListener("click", displayNumbers));

operatorButtons.forEach(button => button.addEventListener('click',(e)=> {

    //when an operator is pressed the number on the screen is saved on displayValue, we are going to use it as our first operand.
    //if the screen was clearead it means that the first value has  already been saved 
    if(!wasScreenCleared) displayValue = +displayLowerScreen.textContent;
    
    writeOperator = e.target.value;
    operation = e.target.value;
    
    if(operationBackup === null) operationBackup = operation;
    //if (wasEqualPressed) operationBackup = operation;
    evaluate(operationBackup);
    //evaluate(operation)
}));



equalBtn.addEventListener("click", ()=>{
    if(displayValue === null) return;
    secondOperator = +displayLowerScreen.textContent;
    result = operate(operationBackup, displayValue, secondOperator);
    printResult(operationBackup);
    //operation = operationBackup;
    displayValue = result;
    secondOperator = null;
    wasScreenCleared = false;
    wasEqualPressed = true;
    

})


clearBtn.addEventListener('click', clear);

displayLowerScreen.textContent = 0;


function evaluate(operation){
    
   
    //if the screen was cleared it's because an operator was pressed so we don't store the number on the screen in "displayValue", 
    //because displayValue (our first operand) is stored, instead the number on the screen is stored in secondOperator.
    if (wasScreenCleared) secondOperator = +displayLowerScreen.textContent;
   
    result = operate(operation, displayValue, secondOperator);
    printResult(operation);
    //operation = null;
    displayValue = +displayLowerScreen.textContent;
    //result = displayValue;
    
    secondOperator = null;
    wasScreenCleared = false;

}


function printResult(operation){
    console.log(displayValue, secondOperator);
    if(operation =="÷" && secondOperator == 0) {
        alert("Error, you can't divide by 0");
        clear();
        return;
    }
    result = +result.toFixed(10);
    
   
    if(displayValue!==null && secondOperator!==null){
        console.log(secondOperator);
        
        displayUpperScreen.textContent = `${displayValue} ${operationBackup} ${secondOperator} =`;
        displayLowerScreen.textContent = result;
    } else if(secondOperator===null){
        
        displayUpperScreen.textContent = `${displayValue} ${writeOperator} `;

    } else{
       
        displayUpperScreen.textContent = `${secondOperator} ${operation}`;
    }
    
}



function clear(){
    displayLowerScreen.textContent ="0";
    displayUpperScreen.textContent="";
    displayValue = null;
    secondOperator = null;
    
    operation = null;
    operationBackup = null;
    result = null;
    wasScreenCleared = false;
    wasUsed = false;
    
}

function clearScreen(){
    wasScreenCleared = true;
    displayLowerScreen.textContent ="";
    displayUpperScreen.textContent="";
    
}

dot.addEventListener("click", (e)=>{
    
    if(displayLowerScreen.textContent.includes(".")) return;
    displayLowerScreen.textContent += e.target.value; 
    wasUsed = true;
})

function displayNumbers(e){
    
    
    //to handle the initial 0 value on screen.
    if (!wasUsed) displayLowerScreen.textContent = "";
    wasUsed = true;
    
    if(!wasScreenCleared){

        


        clearScreen();
        
        wasScreenCleared = true;
        displayLowerScreen.textContent += e.target.value;
        operationBackup = operation;
       
        
        
    } else{
        
       
        displayLowerScreen.textContent += e.target.value;
        
    }

}



function add(a, b){
    return a+b;
}
function substract(a,b){
    return a - b;
}
function multiply(a,b){
    return a * b;
}
function divide(a,b){
    return a / b;

}

function operate(operator, num1, num2){
    
    if(operator==="+") return add(num1,num2);
    if (operator==="-") return substract(num1,num2);
    if(operator==="x") return multiply(num1,num2);
    if(operator==="÷") return divide(num1,num2);

}