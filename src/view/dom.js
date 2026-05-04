import { addTodo, createProject } from "../controller/appController.js";
import { initModal } from "./modal.js";

// get DOM elements for modal
const modal = document.querySelector('#modalProject');
const createProjectBtn = document.querySelector('#createProjectBtn');
const closeModalBtn = document.querySelector('#closeModal');

// connect modal system

initModal({
    openBtn: createProjectBtn,
    closeBtn: closeModalBtn,
    modal: modal,
})



/*
const projectForm = document.querySelector('#projectForm');
const projectName = document.querySelector('#projectName')

const todoForm = document.querySelector('#todoForm');
const title = document.querySelector('#title');
const desc = document.querySelector('#description');
const dueDate = document.querySelector('#dueDate');
const priority = document.querySelector('#priority');

const projectContainer = document.querySelector('#projectContainer')

*/

/*
projectForm.addEventListener('submit', (e)=>{
    e.preventDefault();

    createProject(projectName.value)
})


todoForm.addEventListener('submit', (e) =>{
    e.preventDefault();

    addTodo(
        title.value,
        desc.value,
        dueDate.value,
        priority.value
    );
})
*/
