import { addTodo, createProject, getProjects, setActiveProject, getTasks } from "../controller/appController.js";
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
const closeTaskModal = document.querySelector('#closeTaskModal');
const todoModal = document.querySelector('#todoModal');
const openTaskModal = document.querySelector('.openTaskModal');
const todoForm = document.querySelector('#todoForm');
const title = document.querySelector('#taskTitle');
const desc = document.querySelector('#desc');
const dueDate = document.querySelector('#dueDate');
const priority = document.querySelector('#priority');
const projectContent = document.querySelector('.projectContent');

// ======================
// INIT
// ======================
initModal({
    openBtn: openTaskModal,
    closeBtn: closeTaskModal,
    modal: todoModal,
})
initModal({
    openBtn: createProjectBtn,
    closeBtn: closeModalBtn,
    modal: projectModal,
})


projectForm.addEventListener('submit', handleProjectSubmit)

function handleProjectSubmit(e) {
    e.preventDefault()

    const name = projectNameInput.value.trim();

    if (!name) return;

    createProject(name);

    renderProject()

    closeModal(projectModal);
    projectForm.reset()
}

function renderProject() {
    const projects = getProjects();

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
    const projects = getProjects();

    const project = projects[index];

    setActiveProject(project)
}

todoForm.addEventListener('submit', (e) => {
    e.preventDefault();

    addTodo(
        title.value,
        desc.value,
        dueDate.value,
        priority.value
    );

    renderTasks()
    todoForm.reset()
    closeModal(todoModal)
})

function renderTasks() {
    projectContent.innerHTML = "";
    const tasks = getTasks();

    tasks.forEach((task) => {
        const divTask = document.createElement('div');
        divTask.classList.add('taskContainer');

        const title = task.title;
        const divTitle = document.createElement('div');
        divTitle.append(title)

        const priority = task.priority;
        const divPriority = document.createElement('div');
        divPriority.append(priority)

        const dueDate = task.dueDate;
        const divDueDate = document.createElement('div');
        divDueDate.append(dueDate);

        divTask.append(divTitle, divDueDate, divPriority)

        projectContent.append(divTask)
    })
}