const inputSlider = document.querySelector("[datalength-slider]");
console.log(inputSlider)
const lengthDisplay = document.querySelector("[data-lengthNumber]");

const passwordDisplay = document.querySelector("[datapassword-display]");

// passwordDisplay.value = "Password"
const copyBtn = document.querySelector("[data-copy]");
const copyMsg = document.querySelector("[datacopy-msg]");
const upperCaseCheck = document.querySelector("#uppercase");
const lowerCaseCheck = document.querySelector("#lowercase");
const numberCheck = document.querySelector("#number");
const symbolsCheck = document.querySelector("#symbols");
const indicator = document.querySelector("[data-indicator]");
const generateBtn = document.querySelector(".Generate-button");
const allCheckBox = document.querySelectorAll("input[type = checkbox]");
const symbol = '`~!@#$%^&*(){}[]:;"<,>.?/|\ ' ;


let password = "";
let passwordLength = 10;
let checkboxCount = 0;

handleSlider();

// set paswordlength

function handleSlider(){
    inputSlider.value = passwordLength;
    lengthDisplay.innerText = passwordLength;
}

function setIndicator(color){
    indicator.style.backgroundColor = color;
    // shadow;
}

function getRndInteger(min ,max){
    return Math.floor(Math.random() * (max - min)) + min ;
}

function generateRandomNumber(){
    return getRndInteger(0,9);
}

function generateLowerCase(){
    return String.fromCharCode(getRndInteger(97,123));
}

function generateUpperCase(){
    return String.fromCharCode(getRndInteger(65,91));
}
function generateSymbol(){
    const randNum = getRndInteger(0,symbol.length);
    return symbol.charAt(randNum);
}

function clalculateStrength(){
    let hasUpper = false;
    let hasLower = false;
    let hasNum = false;
    let hasSym = false;

    if(upperCaseCheck.checked)  hasUpper = true;
    if(lowerCaseCheck.checked) hasLower = true;
    if(numberCheck.checked) hasNum = true;
    if(symbolsCheck.checked) hasSym = true;

    if(hasLower && hasUpper && (hasNum || hasSym )&& passwordLength >= 8){
        setIndicator('#0f0');
    }

    else if((hasLower || hasUpper)&& (hasNum || hasSym) && passwordLength >= 6){
        setIndicator('0ff0');
    }

    else{
        setIndicator('#f00');
    }

}

async function copyContent(){
    try{
        await navigator.clipboard.writeText(passwordDisplay.value);
        copyMsg.innerText = "copied";
    }
    catch(e){
        copyMsg.innerText = "failed";
    }

    copyMsg.classList.add("active");

    setTimeout(() =>{
        copyMsg.classList.remove("active");
    },2000);
}

function suffelpasword(array){
    for(let i = array.length-1;i > 0;i--){
        const j = Math.floor(Math.random() * (i+1));
        const temp = array[i];
        array[i] = array[j];
        array[j] = temp;
    }

    let str = "";
    array.forEach((el) => (str += el ));

    return str;
}

function handleCheckBoxChange(){
    checkboxCount = 0;
    allCheckBox.forEach((checkbox) =>{
        if(checkbox.checked){
            checkboxCount++;
        }
    });

    if(passwordLength < checkboxCount){
        passwordLength = checkboxCount;
        handleSlider();
    }
}

allCheckBox.forEach((checkbox) => checkbox.addEventListener('change' ,handleCheckBoxChange));
    

inputSlider.addEventListener('input', (e) =>{
    passwordLength = e.target.value;
    handleSlider();
})
 
copyBtn.addEventListener('click' , ()=>{
    if(passwordDisplay.value){
        copyContent();
    }
});

generateBtn.addEventListener('click',() =>{
    if(checkboxCount == 0){
        return;
    }

    if(passwordLength < checkboxCount){
        passwordLength = checkboxCount;
        handleSlider();
    }

    password = "";
    
    // if(upperCaseCheck.checked){
    //     password += generateUpperCase()
    // }

    // if(lowerCaseCheck.checked){
    //     password += generateLowerCase()
    // }

    // if(numberCheck.checked){
    //     password += generateRandomNumber()
    // }

    // if(symbolsCheck.checked){
    //     password += generateSymbol()
    // }

    funcArr = [];

    if(upperCaseCheck.checked){
        funcArr.push(generateUpperCase);
    }

    if(lowerCaseCheck.checked){
        funcArr.push(generateLowerCase);
    }

    if(numberCheck.checked){
        funcArr.push(generateRandomNumber);
    }

    if(symbolsCheck.checked){
        funcArr.push(generateSymbol);
    }

    for(let i = 0; i < funcArr.length;i++){
        password += funcArr[i]();
    }

    for(let i = 0; i < passwordLength - funcArr.length;i++){
        let randIndex = getRndInteger(0,funcArr.length);

        console.log(randIndex + " " + funcArr[randIndex]());

        password += funcArr[randIndex]();
    }

    password = suffelpasword(Array.from(password));

    passwordDisplay.value = password;
    clalculateStrength();

})


