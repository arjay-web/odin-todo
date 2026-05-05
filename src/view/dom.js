import { addTodo, createProject, getProject, setActiveProject } from "../controller/appController.js";
import { closeModal, initModal } from "./modal.js";

// ======================
// DOM ELEMENTS
// ======================
const projectModal = document.querySelector('#projectModal');
const createProjectBtn = document.querySelector('#createProjectBtn');
const closeModalBtn = document.querySelector('#closeModal');
const projectForm = document.querySelector('#projectForm');
const projectNameInput = document.querySelector('#projectName');
const projectList = document.querySelector('#projectList');
const createTaskBtn = document.querySelector('#createTaskBtn');
const closeTaskModal = document.querySelector('#closeTaskModal');
const todoModal = document.querySelector('#todoModal')
console.log(createProjectBtn)
// ======================
// INIT
// ======================
initModal({
    openBtn: createProjectBtn,
    closeBtn: closeModalBtn,
    modal: projectModal,
})

initModal({
    openBtn: createTaskBtn,
    closeBtn: closeTaskModal,
    modal: todoModal,
})
projectForm.addEventListener('submit', handleProjectSubmit)

function handleProjectSubmit(e) {
    e.preventDefault()

    const name = projectNameInput.value.trim();

    if (!name) return;

    createProject(name);

    renderProject()

    closeModal(modal);
    projectForm.reset()
}

function renderProject() {
    const projects = getProject();

    projectList.innerHTML = '';

    projects.forEach((project, index) => {
        const projectItem = document.createElement('div');
        projectItem.textContent = project.name;
        projectItem.dataset.index = index;

        projectList.append(projectItem);
    })
}

projectList.addEventListener('click', handleProjectClick)
function handleProjectClick(e) {
    const item = e.target.closest('[data-index]')
    if (!item) return;

    const index = item.dataset.index;
    const projects = getProject();

    const project = projects[index];

    setActiveProject(project)
}

/*
const todoForm = document.querySelector('#todoForm');
const title = document.querySelector('#title');
const desc = document.querySelector('#description');
const dueDate = document.querySelector('#dueDate');
const priority = document.querySelector('#priority');

const projectContainer = document.querySelector('#projectContainer')


*/
/*


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