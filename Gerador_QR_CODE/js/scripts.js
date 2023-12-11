const container = document.querySelector(".container");
const qrCodeBtn = document.querySelector("#qr-form button");

const qrCodeInput = container.querySelector("#qr-form input");
const qrCodeImg = container.querySelector("#qr-code img");



// Gerar código
function generateQrCode() {
  let qrCodeInputValue = qrCodeInput.value;

  if (!qrCodeInputValue) return null;

  qrCodeBtn.innerText = "Gerando código...";

  const qrCodeImageUrl = `https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=${qrCodeInputValue}`;
  qrCodeImg.src = qrCodeImageUrl;

  container.classList.add("active");
  qrCodeBtn.innerText = "Código!";
  document.getElementById("downloadBtn").style.display = "inline-block";

  return qrCodeImageUrl;
}


qrCodeBtn.addEventListener("click", () => {
  generateQrCode();
});

qrCodeInput.addEventListener("keydown", (e) => {
  if (e.code === "Enter") {
    generateQrCode();
  }
});

// Limpar área do código
qrCodeInput.addEventListener("keyup", () => {
  if (!qrCodeInput.value) {
    container.classList.remove("active");
    qrCodeBtn.innerText = "Gerar QR Code";
  }
});

function downloadQRCode() {
  const qrCodeImageUrl = generateQrCode();

  if (qrCodeImageUrl) {
    const downloadLink = document.createElement("a");
    downloadLink.href = qrCodeImageUrl;
    downloadLink.download = "qrcode.png";

    document.body.appendChild(downloadLink);
    downloadLink.click();
    document.body.removeChild(downloadLink);
  }
}
function openFileInput() {
  const fileInput = document.getElementById("qr-input");
  fileInput.click();
}

// Função para ler o QR Code a partir de uma imagem
function readQRCode() {
  const input = document.getElementById("qr-input");
  const file = input.files[0];
  const uploadedImage = document.getElementById("uploaded-image");

  if (file) {
      const reader = new FileReader();

      reader.onload = function (e) {
          const imageData = e.target.result;
          uploadedImage.style.display = "block";
          uploadedImage.src = imageData;

          // Restante do seu código para processar o QR Code...
      };

      reader.readAsDataURL(file);
  } else {
      alert("Selecione uma imagem para ler o QR Code.");
  }
}

