const storageOptions = document.querySelectorAll(".storage-option");
const prices = document.querySelectorAll(".storage-option .price");

storageOptions.forEach((option, index) => {
    option.addEventListener("click", () => {
        // Remove a classe 'selected' de todas as opções
        storageOptions.forEach((opt) => {
            opt.classList.remove("selected");
        });

        // Adiciona a classe 'selected' à opção clicada
        option.classList.add("selected");

        // Obtém o preço correspondente e exibe no console
        const selectedPrice = prices[index].textContent;
        console.log("Preço Selecionado:", selectedPrice);
    });
});


const imageButtons = document.querySelectorAll("#image-picker li");
const productImage = document.querySelector("#product-image");

imageButtons.forEach((button, index) => {
    button.addEventListener("click", () => {
        // Remove a classe 'selected' de todas as cores
        imageButtons.forEach((btn) => {
            btn.querySelector(".color").classList.remove("selected");
        });

        // Adiciona a classe 'selected' à cor clicada
        button.querySelector(".color").classList.add("selected");

        // Muda a imagem principal de acordo com a cor selecionada
        productImage.classList.add("changing");
        productImage.setAttribute("src", `img/iphone_${button.getAttribute("id")}.jpg`);

        // Remove a classe 'changing' após 200ms (efeito de transição)
        setTimeout(() => {
            productImage.classList.remove("changing");
        }, 200);
    });
});

