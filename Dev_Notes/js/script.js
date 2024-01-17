// Elementos
const notesContainer = document.querySelector("#notes-container");
const noteInput = document.querySelector("#note-content");
const addNoteBtn = document.querySelector(".add-note");
const searchInput = document.querySelector("#search-input");
const exportBtn = document.querySelector("#export-notes");

// Funções
function showNotes() {
    cleanNotes();

    // Vai mostrar as notas
    getNotes().forEach((note) => {
        // Vai pegar as notas e fazer um loop
        const noteElement = createNote(
            note.id,
            note.content,
            note.fixed
        );
        notesContainer.appendChild(noteElement);
    });
}

function cleanNotes() {
    // Vai limpar as notas
    while (notesContainer.firstChild) {
        notesContainer.firstChild.remove();
    }
}

function addNote() {
    // Porque uma array? Porque eu quero que o usuário possa adicionar mais de uma nota
    const notes = getNotes(); // Vai pegar as notas

    const noteObject = {
        id: generateId(),
        content: noteInput.value,
        fixed: false, // Ajuste aqui de finished para fixed
    };
    const noteElement = createNote(
        noteObject.id,
        noteObject.content,
        noteObject.fixed
    );

    //adionar uma classe de animação
    noteElement.classList.add("note-animation")

    // Vai fazer que minha nota apareça na tela
    notesContainer.appendChild(noteElement);

    // Vai fazer que minha nota apareça no array
    notes.push(noteObject);

    saveNotes(notes); // Vai salvar as notas

    noteInput.value = ""; // Vai fazer que o input fique vazio
}

// Função para o id não repetir
function generateId() {
    return Math.floor(Math.random() * 5000);
}

function createNote(id, content, fixed) {
    const element = document.createElement("div");

    element.classList.add("note");

    const textarea = document.createElement("textarea");

    textarea.value = content;

    textarea.placeholder = "Digite sua nota aqui";

    element.appendChild(textarea);

    //Criar data

    const date = document.createElement("p");

    date.classList.add("note-date");

    date.textContent=formatdate(new Date()); //chama a função de formatar a data

    element.appendChild(date);  

    const pinIcon = document.createElement("i");

    pinIcon.classList.add(...["bi", "bi-pin"]);

    element.appendChild(pinIcon);

    const deleteIcon = document.createElement("i");

    deleteIcon.classList.add(...["bi", "bi-x-lg"]);

    element.appendChild(deleteIcon);

    const duplicateIcon = document.createElement("i");

    duplicateIcon.classList.add(...["bi", "bi-file-earmark-plus"]);

    element.appendChild(duplicateIcon);

    // Vai fazer com que a nota fique fixa
    if (fixed) {
        element.classList.add("fixed");
    }

    function deleteNote(id, element) {
        const notes = getNotes().filter((note) => note.id !== id); // Vai pegar as notas

        saveNotes(notes); // Vai salvar as notas no Local Storage

        notesContainer.removeChild(element); // Vai remover a nota da tela

        
    }

    function copyNote(id) {
        const notes = getNotes(); // Vai pegar as notas
        const targetNote = notes.filter((note) => note.id === id)[0]; // Vai pegar a nota que eu quero

        const noteObject = { // Vai criar a nota
            id: generateId(),
            content: targetNote.content,
            fixed: false,
        };

        const noteElement = createNote(noteObject.id, noteObject.content, noteObject.fixed); // Vai criar a nota

        notesContainer.appendChild(noteElement); // Vai fazer com que a nota apareça na tela

        notes.push(noteObject); // Vai fazer com que a nota apareça no array

        saveNotes(notes); // Vai salvar as notas no Local Storage
    }

    // Eventos do elemento

    element.querySelector("textarea").addEventListener("keyup", (e) => {
        const noteContant = e.target.value; // Vai pegar o valor do input
        updateNote(id, noteContant); // Vai atualizar a nota
    });

    pinIcon.addEventListener("click", () => {
        toggleFixNote(id); // Vai fazer com que a nota fique fixa
    });

    element.querySelector(".bi-x-lg").addEventListener("click", () => {
        deleteNote(id, element); // Vai deletar a nota
    });

    element.querySelector(".bi-file-earmark-plus").addEventListener("click", () => {
        copyNote(id); // Vai copiar a nota
    });

    return element;
}

// Vai fazer com que a nota fique fixa
function toggleFixNote(id) {
    const notes = getNotes(); // Vai pegar as notas

    const targetNote = notes.find((note) => note.id === id); // Vai pegar a nota que eu quero

    targetNote.fixed = !targetNote.fixed; // Vai fazer com que a nota fique fixa

    saveNotes(notes); // Vai salvar as notas

    showNotes(); // Vai mostrar as notas
}

function updateNote(id, newContant) {
    const notes = getNotes(); // Vai pegar as notas

    const targetNote = notes.filter((note) => note.id === id)[0]; // Vai pegar a nota que eu quero

    targetNote.content = newContant; // Vai atualizar a nota

    saveNotes(notes); // Vai salvar as notas
}

// Local Storage
function getNotes() {
    const notes = JSON.parse(localStorage.getItem("notes") || "[]"); // Vai pegar as notas do local storage

    // Vai fazer com que as notas fiquem em ordem decrescente
    const orderedNotes = notes.sort((a, b) => {
        return b.id - a.id; // Vai fazer com que as notas fiquem em ordem decrescente
    });

    return orderedNotes; // Vai retornar as notas
}

// Salvar as notas
function saveNotes(notes) {
    localStorage.setItem("notes", JSON.stringify(notes)); // Vai salvar as notas no local storage
}

function searchNotes(search) {
    const searchResults = getNotes().filter((note) => {
        return note.content.includes(search); // Vai pesquisar as notas
    });

    if (search !== "") {
        cleanNotes(); // Vai limpar as notas

        searchResults.forEach((note) => {
            const noteElement = createNote(
                note.id,
                note.content,
                note.fixed
            );
            notesContainer.appendChild(noteElement);
        });

        return;
    }

    cleanNotes(); // Vai limpar as notas

    showNotes(); // Vai mostrar as notas
}

function exportData() {

    const notes = getNotes(); // Vai pegar as notas

    //separa o dado por virgula, quebra a linha e coloca o id, o conteudo e se está fixo

    const csvString = [
        ["ID", "CONTÉUDO", "Fixado"],
        ...notes.map((note) => [note.id, note.content, note.fixed]),
    ].map((e) => e.join(",")).join("\n");


    const element = document.createElement("a"); // Vai criar um elemento
    element.href = "data:text/csv;charset=utf-8," + encodeURI(csvString); // Vai criar o link

    element.target = "_blank"; // Vai abrir em outra aba

    element.download = "notes.csv"; // Vai baixar o arquivo

    element.click(); // Vai clicar no elemento
}

function formatdate(date){
    const options ={
        year:"numeric",
        month:"numeric",
        day:"numeric",
        hour:"2-digit",
    }
    return new Intl.DateTimeFormat("pt-BR",options).format(date);
}

// Eventos
addNoteBtn.addEventListener("click", () => addNote());

searchInput.addEventListener("keyup", (e) => {
    // Vai pegar o valor do input
    const search = e.target.value.toLowerCase();

    searchNotes(search); // Vai pesquisar as notas
});

noteInput.addEventListener("keyup", (e) => {
    // Vai fazer com que o usuário possa apertar o enter
    if (e.key === "Enter") {
        addNote();
    }
});

exportBtn.addEventListener("click", () => {
    exportData()
})

// Inicialização
showNotes();
