// Seleção de elementos
const selecaoVoz = document.querySelector("#selecao-voz");
const entradaTexto = document.querySelector("#entrada-de-texto");
const botaoOuvir = document.querySelector("#ouvir-btn");
const botoaBaixarTexto = document.querySelector("#baixar-texto-btn");
const uploadArquivo = document.querySelector("#upload-arquivo");
const velocidadeFala = document.querySelector("#velocidade-fala");
const toggleTheme = document.querySelector("#toggle-theme");
const themeIcon = document.querySelector("#theme-icon");

// Iniciar a API de vozes
const fala = new SpeechSynthesisUtterance();

let vozesDisponiveis = [];

// Preencher o select
const atualizarValores = () => {
  vozesDisponiveis = window.speechSynthesis.getVoices();

  fala.voice = vozesDisponiveis[0]; // aqui vamos definir a voz padrão para o navegador

  console.log(vozesDisponiveis);

  vozesDisponiveis.forEach((voz, index) => {
    const opcao = document.createElement("option");
    opcao.value = index;
    opcao.textContent = voz.name;
    selecaoVoz.appendChild(opcao);
  });
};

window.speechSynthesis.onvoiceschanged = atualizarValores; // aqui vamos chamar a função para atualizar as vozes disponíveis

// Executar o texto como voz
selecaoVoz.addEventListener("change", () => {
  fala.voice = vozesDisponiveis[selecaoVoz.value];
});

velocidadeFala.addEventListener("input", () => {
  fala.rate = velocidadeFala.value;
});

botaoOuvir.addEventListener("click", () => {
  fala.text = entradaTexto.value;
  fala.rate = velocidadeFala.value;

  window.speechSynthesis.speak(fala);
});

// Baixar texto em arquivo
botoaBaixarTexto.addEventListener("click", () => {
  const texto = entradaTexto.value;

  const blob = new Blob([texto], { type: "text/plain" });

  const url = URL.createObjectURL(blob); // aqui vamos criar um link para o arquivo

  const a = document.createElement("a");

  a.href = url;

  a.download = "texto.txt";

  a.click();

  URL.revokeObjectURL(url);
});

// Evento para selecionar arquivo
uploadArquivo.addEventListener("change", (event) => {
  const arquivo = event.target.files[0];

  if (arquivo) {
    const extensao = arquivo.name.split('.').pop().toLowerCase();

    if (extensao === 'txt') {
      // Se for um arquivo de texto (.txt)
      const leitor = new FileReader();

      leitor.onload = (e) => {
        entradaTexto.value = e.target.result;
      };

      leitor.readAsText(arquivo);
    } else if (extensao === 'pdf') {
      // Se for um arquivo PDF (.pdf)
      const leitor = new FileReader();

      leitor.onload = async (e) => {
        const arrayBuffer = e.target.result;

        // Carregar o PDF usando PDF.js
        const loadingTask = pdfjsLib.getDocument({ data: arrayBuffer });
        try {
          const pdf = await loadingTask.promise;
          console.log("Número de páginas:", pdf.numPages);
          
          // Exemplo: Carregar a primeira página
          const page = await pdf.getPage(1);
          const viewport = page.getViewport({ scale: 1.5 });

          // Preparar canvas para renderizar a página
          const canvas = document.createElement('canvas');
          const context = canvas.getContext('2d');
          canvas.height = viewport.height;
          canvas.width = viewport.width;

          // Renderizar página no canvas
          const renderTask = page.render({
            canvasContext: context,
            viewport: viewport
          });
          await renderTask.promise;

          // Exibir o canvas com a página renderizada (exemplo)
          const pdfContainer = document.querySelector("#pdf-container");
          pdfContainer.appendChild(canvas);

        } catch (error) {
          console.error('Erro ao carregar o PDF:', error);
        }
      };

      leitor.readAsArrayBuffer(arquivo);
    } else if (extensao === 'mp3') {
      // Se for um arquivo MP3 (.mp3)
      const leitor = new FileReader();

      leitor.onload = (e) => {
        // Aqui você pode implementar o processamento do MP3
        // Por exemplo, reproduzindo o áudio ou extraindo informações
        console.log("Arquivo MP3 carregado:", e.target.result);
      };

      leitor.readAsDataURL(arquivo);
    } else {
      alert("Formato de arquivo não suportado. Selecione um arquivo .txt, .pdf ou .mp3.");
      uploadArquivo.value = ''; // Limpar a seleção do arquivo
    }
  }
});

// Alternar entre modo claro e escuro
toggleTheme.addEventListener("click", () => {
  document.body.classList.toggle("dark-mode");

  if (document.body.classList.contains("dark-mode")) {
    themeIcon.textContent = "🌙"; // ícone de lua
  } else {
    themeIcon.textContent = "☀️"; // ícone de sol
  }
});
