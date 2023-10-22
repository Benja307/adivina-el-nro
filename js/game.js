let randomNumber = Math.floor(Math.random() * 1000) + 1;
const body = document.querySelector("body");
const intro = document.querySelector(".intro");
const guesses = document.querySelector(".guesses");//seleccionamos el campo de intentos anteriores
const lastResult = document.querySelector(".lastResult");//Seleccionamos el campo de último resultado
const lowOrHi = document.querySelector(".lowOrHi");//Seleccionamos el campo de "pista"
const guessSubmit = document.querySelector(".guessSubmit");//Seleccionamos el botón submit
const guessField = document.querySelector(".guessField");//seleccionamos el input
const theme = document.querySelector(".bi");
let guessCount = 1;//inicializamos el contador de intentos en 1
let resetButton;
theme.addEventListener("click",()=>{
    if(body.style.background === "black"){
        themes("white","black");
    }
    else{
        themes("black","white");
    }
})
guessField.focus();//coloca automáticamente el cursor en el campo de texto <input> tan pronto como se cargue la página.
function checkGuess(){
        let userGuess = Number(guessField.value);//guardamos el valor ingresado en el input
        if(guessCount === 1){
            guesses.textContent = "Intentos anteriores: ";
        }
        guesses.textContent += userGuess + " ";//vá concatenando los valores ingresados por el usuario con un espacio de por medio.
        if(userGuess === randomNumber){
            guessField.placeholder = `¡Felicidades!`;
            guessField.style.boxShadow = "5px 5px 10px green";
            lastResult.textContent = `¡Lo adivinaste en ${guessCount}/10 pasos!`;
            lowOrHi.textContent = "";
            setGameOver();
        }
        else if(guessCount === 10){
                guessField.placeholder = `¡¡¡Fin del juego!!!`;
                lastResult.textContent = `El valor correcto era: ${randomNumber}`;
                lowOrHi.textContent = "";
                setGameOver();
            }
            else{
                guessField.placeholder = "¡Incorrecto!";
                guessField.style.boxShadow = "5px 5px 10px red";
                if(userGuess < randomNumber){
                    lowOrHi.textContent = "¡El número es muy bajo!";
                }
                else if(userGuess > randomNumber){
                        lowOrHi.textContent = "¡El número es muy grande!";
                    }
            }
        guessCount++;
        guessField.value = "";
        guessField.focus();
};

guessSubmit.addEventListener("click", checkGuess);

function setGameOver(){
    guessField.disabled = true;//deshabilita el input
    guessSubmit.disabled = true;//deshabilita el botón de submit
    resetButton = document.createElement("button");//crear nuevo elemento de botón
    resetButton.textContent = "Iniciar nuevo juego";//Agrega el texto de contenido al botón
    if(body.style.background === "black"){
        resetButton.classList.add("reset-bl");
        resetButton.classList.remove("reset-wh");
    }else{
        resetButton.classList.add("reset-wh");
        resetButton.classList.remove("reset-bl");
    }
    document.body.append(resetButton);//Agrega el botón al documento html
    resetButton.addEventListener("click", resetGame);
}
        
function resetGame() {
    guessCount = 1;//reinicio el contador de intentos
    const resetParas = document.querySelectorAll(".resultParas p");//crea una variable que contiene una lista de todos los elementos p dentro del bloque .resultParas
    for(let i = 0; i < resetParas.length; i++){
        resetParas[i].textContent = "";//recorremos la lista de elementos p y restablecemos el contenido de todos los parrafos
    } 
    resetButton.parentNode.removeChild(resetButton);//eliminamos el botón de reinicio de nuestro documento html
    guessField.disabled = false;
    guessSubmit.disabled = false;
    guessField.value = "";//vaciamos el input
    guessField.focus();//ponemos el foco en el input
    guessField.placeholder = "Ingrese un valor";
    guessField.style.boxShadow = "";
    randomNumber = Math.floor(Math.random() * 1000) + 1;//generamos un nuevo número al azar
}

function themes(color1,color2){
    theme.style.color = color2;
    body.style.background = color1;
    intro.style.color = color2;
    guesses.style.color = color2;
    lastResult.style.color = color2;
    lowOrHi.style.color = color2;
    guessField.style.background = color1;
    guessField.style.color = color2;
    guessSubmit.style.background = color1;
    guessSubmit.style.border = `1px solid ${color2}`;
    guessSubmit.style.color = color2;
    guessSubmit.addEventListener("mouseover",()=>{
        guessSubmit.style.boxShadow = `5px 5px 10px ${color2}`
    });
    guessSubmit.addEventListener("mouseout",()=>{
        guessSubmit.style.boxShadow = "";
    })
    if(color1 === "white"){
        resetButton.classList.add("reset-wh");
        resetButton.classList.remove("reset-bl");
    }else{
        resetButton.classList.remove("reset-wh");
        resetButton.classList.add("reset-bl");
    }
}
