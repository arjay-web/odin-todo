import { addTodo } from "../controller/appController.js";
console.log('dom loaded')
const todoForm = document.querySelector('#todoForm');
const title = document.querySelector('#title');
const desc = document.querySelector('#description');
const dueDate = document.querySelector('#dueDate');
const priority = document.querySelector('#priority');

todoForm.addEventListener('submit', (e) =>{
    e.preventDefault();
   
    console.log(
        title.value,
        desc.value,
        dueDate.value,
        priority.value
    );
    addTodo(
        title.value,
        desc.value,
        dueDate.value,
        priority.value
    );
})

