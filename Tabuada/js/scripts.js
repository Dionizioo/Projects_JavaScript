// Seleção de elementos
const multiplicationForm = document.querySelector("#multiplication-form");
const numberInput = document.querySelector("#number");
const multiplicationInput = document.querySelector("#multiplicator");

const calculatorForm = document.querySelector("#calculator-form");
const num1Input = document.querySelector("#num1");
const num2Input = document.querySelector("#num2");
const operationSelect = document.querySelector("#operation");
const calculatorResult = document.querySelector("#calculator-result");



const multiplicationTable = document.querySelector("#multiplication-operations");
const multiplicationTitle = document.querySelector("#multiplication-title span");

// Funções
const createTable = (number, multiplicatorNumber) => {
    multiplicationTable.innerHTML = "";
  
    for (let i = 1; i <= multiplicatorNumber; i++) {
      const result = number * i;
  
      const template = `<div class="row">
                          <div class="operation">${number}x${i}=</div>
                          <div class="result">${result}</div>
                        </div>`;
  
      const parser = new DOMParser();
      const htmlTemplate = parser.parseFromString(template, "text/html");
  
      const row = htmlTemplate.body.firstChild; // Pega o primeiro filho do corpo do template
  
      multiplicationTable.appendChild(row);
    }
    multiplicationTitle.innerHTML = number;
};

function calculate() {
  const num1 = +num1Input.value;
  const num2 = +num2Input.value;
  const operation = operationSelect.value;

  let result;

  switch (operation) {
      case "add":
          result = num1 + num2;
          break;
      case "subtract":
          result = num1 - num2;
          break;
      case "multiply":
          result = num1 * num2;
          break;
      case "divide":
          result = num1 / num2;
          break;
      default:
          result = "Operação inválida";
  }

  calculatorResult.innerHTML = `Resultado: ${result}`;
}
  
  
// Eventos
multiplicationForm.addEventListener("submit", (e) => {
  e.preventDefault();

  const multiplicationNumber = +numberInput.value;

  const multiplicatorNumber = +multiplicationInput.value;

  if (!multiplicationNumber || !multiplicatorNumber) return;

  createTable(multiplicationNumber, multiplicatorNumber);
});
