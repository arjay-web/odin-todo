import { addTodo, createProject } from "../controller/appController.js";

const projectForm = document.querySelector('#projectForm');
const projectName = document.querySelector('#projectName')

const todoForm = document.querySelector('#todoForm');
const title = document.querySelector('#title');
const desc = document.querySelector('#description');
const dueDate = document.querySelector('#dueDate');
const priority = document.querySelector('#priority');

const projectContainer = document.querySelector('#projectContainer')


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

