import Modal from './modal.js'

const modal = Modal();

const checkButtons = document.querySelectorAll(".actions a.check");
const deleteButtons = document.querySelectorAll(".actions a.delete")

const modalTitle = document.querySelector(".modal h2");
const modalDescritpion = document.querySelector(".modal p");
const modalButton = document.querySelector(".modal button");




checkButtons.forEach(function(button) {
    if (button == null) {
        return;
    }

    button.addEventListener('click', handleClick);

});

deleteButtons.forEach(function(button) {
    if (button == null) {
        return;
    }

    button.addEventListener('click', event => handleClick(event, false));
});

function handleClick(event, check = true) {

    event.preventDefault();

    const slug = check ? "check" : "delete";
     // pegar valor do data-id no html
    const roomId = document.querySelector("#room-id").dataset.id; 
    const questionId = event.target.dataset.id;

    const formData = document.querySelector(".modal form");
    formData.setAttribute("action", `/question/${roomId}/${questionId}/${slug}`);
    formData.addEventListener("submit", event => event);
    

    modalTitle.innerHTML = check ? "Marcar como lida" : "Exluir Pergunta";

    const commonTextDesc = check ? "marcar como lida" : "excluir";
    modalDescritpion.innerHTML = `Tem certeza que deseja ${commonTextDesc} essa pergunta?`;
    modalButton.innerHTML = check ? "Sim, marcar" : "Sim, excluir";


    check ? modalButton.classList.remove("red")
     : modalButton.classList.add("red");

    modal.open(); 
}

