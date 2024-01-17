                                                                         // Seleceção de Elementos

const generatePasswordButton = document.querySelector("#generate-password");
const generatedPasswordElement = document.querySelector("#generated-password");
const passwordStrengthElement = document.querySelector("#password-strength");

const registerButton = document.querySelector("#register-button");
const successMessage = document.querySelector("#success-message");

const confirmPasswordInput = document.querySelector("#confirmpassword");




const passwordInput = document.querySelector("#password");

// Novas funcionalidades
const openCloseGeneratorButton = document.querySelector(
  "#open-generate-password"
);
const generatePasswordContainer = document.querySelector("#generate-options");
const lengthInput = document.querySelector("#length");
const lettersInput = document.querySelector("#letters");
const numbersInput = document.querySelector("#numbers");
const symbolsInput = document.querySelector("#symbols");
const copyPasswordButton = document.querySelector("#copy-password");
                                                                        

                                                                         // Funções
//Letras, Números e Símbolos

// Letras
const getLetterLowerCase = ()=>{
    // Aqui estamos criando um função que o numero gerado para aleatoria vai transformar em uma letra 
    // Dica: o Random do Math da numero quebrado com isso, utliza-se o Floor
    // também precisamos somar com 97, por a partir desse numero começa as letras,conforme a tabela
    return(String.fromCharCode(Math.floor(Math.random() * 26) + 97));
}

const getLetterUperCase = ()=>{
    // Aqui estamos criando um função que o numero gerado para aleatoria vai transformar em uma letra 
    // Dica: o Random do Math da numero quebrado com isso, utliza-se o Floor
    // também precisamos somar com 65, por a partir desse numero começa as letras,conforme a tabela
    return(String.fromCharCode(Math.floor(Math.random() * 26) + 65));
}
console.log(getLetterLowerCase())
console.log(getLetterUperCase())

// Numeros

const getNumber = () => {
    return Math.floor(Math.random() * 10).toString();
}
console.log(getNumber())

// Simbolos

const getSymbol = () =>{
    const symbols = "(){}[]^~><&¨%#@!+-*/,;."
    return symbols[Math.floor(Math.random() * symbols.length)];
}

// Gerador

const generatePassword = (getLetterLowerCase, getLetterUpperCase, getNumber, getSymbol) => {
  //antiga let = 10
  let password = "";

  // mapear que o usuario quer
  const passwordLength = +lengthInput.value;

  // faz uma array vazio,onde na mdedia que o usuario escolher vai ser acresentado
  // versão sem ele escolher
  //const generators =[getLetterLowerCase,getLetterUperCase,getNumber,getSymbol]
  const generators = [];

  // Verifica se o usuário quer letras minúsculas ou maiúsculas
  if (lettersInput.checked) {
      generators.push(getLetterLowerCase, getLetterUpperCase);
  }

  // Verifica se o usuário quer números
  if (numbersInput.checked) {
      generators.push(getNumber);
  }

  // Verifica se o usuário quer símbolos
  if (symbolsInput.checked) {
      generators.push(getSymbol);
  }

  console.log(generators.length);

  // Se nenhum critério for selecionado, retorna
  if (generators.length === 0) {
    //Oculta o indicador de força da sennha se nenhum critério for selecionado
    passwordStrengthElement.style.display = "none";
      return;
  }

  // Adicione uma função para calcular a força da senha
  const calculatePasswordStrength = (password) => {
      const lengthCriteria = password.length >= 8;
      const uppercaseCriteria = /[A-Z]/.test(password);
      const numberCriteria = /\d/.test(password);
      const symbolCriteria = /[!@#$%^&*(),.?":{}|<>]/.test(password);

      if (lengthCriteria && uppercaseCriteria && numberCriteria && symbolCriteria) {
          return "Forte";
      } else if (lengthCriteria && (uppercaseCriteria || numberCriteria || symbolCriteria)) {
          return "Média";
      } else {
          return "Fraca";
      }
  };

  // Gera a senha
  for (let i = 0; i < passwordLength; i = i + generators.length) {
      generators.forEach(() => {
          const randomValue = generators[Math.floor(Math.random() * generators.length)]();
          password += randomValue;
      });
  }

  password = password.slice(0, passwordLength);

  // Atualize o elemento de força da senha
  const passwordStrength = calculatePasswordStrength(password);
  passwordStrengthElement.innerText = `Força da Senha: ${passwordStrength}`;

  // Exiba o indicador de força da senha apenas quando houver algo preenchido
  passwordStrengthElement.style.display = "block";

  // Exiba a senha gerada
  generatedPasswordElement.style.display = "block";
  generatedPasswordElement.querySelector("h4").innerText = password;

  const checkPasswordStrength = () => {
    const password = passwordInput.value;

    if (password.trim() === "") {
        // Oculta o indicador de força da senha se nenhum critério for selecionado
        passwordStrengthElement.style.display = "none";
    } else {
        // Adiciona uma função para calcular a força da senha
        const passwordStrength = calculatePasswordStrength(password);
    }
    passwordStrengthElement.innerText = `Força da Senha: ${passwordStrength}`;

    // Exibe o indicador de força da senha apenas quando houver algo preenchido
    passwordStrengthElement.style.display = "block";
};

};


                                                                         // Eventos
                                                                         

generatePasswordButton.addEventListener("click", () => {
generatePassword(
    getLetterLowerCase,
    getLetterUperCase,
    getNumber,
    getSymbol
);
});                                                                    

openCloseGeneratorButton.addEventListener("click", () => {
    generatePasswordContainer.classList.toggle("hide");
});

copyPasswordButton.addEventListener("click", (e) => {
    e.preventDefault();
  
    // pegar a senha do texto 
    const password = generatedPasswordElement.querySelector("h4").innerText;
  
    // colocar agora no ctrl+c
    navigator.clipboard.writeText(password).then(() => {
      copyPasswordButton.innerText = "Senha copiada com sucesso!";
  
    //   voltar o texto original
      setTimeout(() => {
        copyPasswordButton.innerText = "Copiar";
      }, 1000);
    });
  });

registerButton.addEventListener("click",(e) =>{
  e.preventDefault();

  const nameInput = document.querySelector("#name");
  const emailInput = document.querySelector("#email");
  const passwordInput = document.querySelector("#password");
  const confirmPasswordInput = document.querySelector("#confirm-password");

  if (nameInput.value === "" || emailInput.value === "" || passwordInput.value === "" || confirmPasswordInput.value === ""){
    alert("Preencha todos os campos");
    return;
  }else{
    // alert("Cadastro realizado com sucesso!");
    sucessMessage.style.display = "block";
  }
})