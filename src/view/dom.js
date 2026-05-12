import { intializeApp, addTodo, createProject, deleteProject, getProjects, setActiveProject, getTasks, getActiveProject, editTodo, deleteTodo, } from "../controller/appController.js";
import { openModal, closeModal, initModal } from "./modal.js";

// ======================
// PROJECT MODAL ELEMENTS
// ======================
const projectModal = document.querySelector('#projectModal');
const createProjectBtn = document.querySelector('#createProjectBtn');
const closeModalBtn = document.querySelector('#closeModal');

const projectForm = document.querySelector('#projectForm');
const projectNameInput = document.querySelector('#projectName');

// ======================
// TODO MODAL ELEMENTS
// ======================
const todoModal = document.querySelector('#todoModal');
const closeTaskModal = document.querySelector('#closeTaskModal');

const todoForm = document.querySelector('#todoForm');

const title = document.querySelector('#taskTitle');
const desc = document.querySelector('#desc');
const dueDate = document.querySelector('#dueDate');
const priority = document.querySelector('#priority');

// ======================
// TODO MODAL ELEMENTS
// ======================
const renderTitle = document.querySelector('.renderTitle');
const renderStatus = document.querySelector('.renderStatus');
const renderDate = document.querySelector('.renderDate');
const renderPriority = document.querySelector('.renderPriority');
const taskDescription = document.querySelector('.taskDescription')

// ======================
// PROJECT DISPLAY ELEMENTS
// ======================
const projectList = document.querySelector('#projectList');


// ======================
// TASK DISPLAY ELEMENTS
// ======================
const main = document.querySelector('.main');

// ======================
// DETAIL MODAL ELEMENTS
// ======================
const taskDetailModal = document.querySelector('#taskDetailModal');
const closeDetail = document.querySelector('.closeDetail');

// ======================
// INIT
// ======================

initModal({
    openBtn: createProjectBtn,
    closeBtn: closeModalBtn,
    modal: projectModal,
})

closeTaskModal.addEventListener('click', () => {
    delete todoForm.dataset.editId;
    todoForm.reset();
})

closeDetail.addEventListener('click', () => {
    closeModal(taskDetailModal);
});

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

    projects.forEach((project) => {
        const projectItemContainer = document.createElement('div');
        projectItemContainer.classList.add('projectItemContainer');

        const projectItem = document.createElement('div');
        projectItem.textContent = project.name;

        projectItemContainer.dataset.id = project.id

        const deleteProjectBtn = document.createElement('button');
        deleteProjectBtn.classList.add('deleteProjectBtn')
        deleteProjectBtn.textContent = 'Delete'

        projectItemContainer.append(projectItem, deleteProjectBtn);

        projectList.append(projectItemContainer);
    })

    renderTasks()
}

projectList.addEventListener('click', handleProjectClick);

function handleProjectClick(e) {

    // DELETE PROJECT
    if (e.target.classList.contains('deleteProjectBtn')) {

        const item = e.target.closest('[data-id]');
        if (!item) return;

        const id = item.dataset.id;
        const activeProject = getActiveProject();

        deleteProject(id);

        renderProject();

        if (activeProject?.id === id) {
            main.innerHTML = ''
        }
        return;
    }

    // SELECT PROJECT
    const item = e.target.closest('.projectItemContainer');

    if (!item) return;

    const id = item.dataset.id;

    const projects = getProjects();

    const project = projects.find(p => p.id === id);

    if (!project) return;

    setActiveProject(project);

    renderTasks();
}

todoForm.addEventListener('submit', (e) => {
    e.preventDefault();

    const editId = todoForm.dataset.editId

    if (editId !== undefined) {
        editTodo(editId, {
            title: title.value,
            description: desc.value,
            dueDate: dueDate.value,
            priority: priority.value
        })
        delete todoForm.dataset.editId
    } else {
        addTodo(
            title.value,
            desc.value,
            dueDate.value,
            priority.value
        );
    }
    renderTasks()
    todoForm.reset()
    closeModal(todoModal)
})

function renderTasks() {
    main.innerHTML = ''

    const activeProjectTitle = document.createElement('h2');
    activeProjectTitle.textContent = getActiveProject().name
    activeProjectTitle.classList.add('activeProjectTitle')

    const projectSubtitle = document.createElement('p');
    projectSubtitle.textContent = 'Manage your tasks and stay on track.';
    projectSubtitle.classList.add('projectSubtitle')

    const openTaskModal = document.createElement('button');
    openTaskModal.textContent = 'Create Task';
    openTaskModal.classList.add('openTaskModal');

    const projectContent = document.createElement('div');
    projectContent.classList.add('projectContent')

    const tasks = getTasks();

    initModal({
        openBtn: openTaskModal,
        closeBtn: closeTaskModal,
        modal: todoModal,
    })

    tasks.forEach((task) => {
        const taskContainer = document.createElement('div');
        taskContainer.classList.add('taskContainer');
        taskContainer.dataset.id = task.id;

        const divTitle = document.createElement('div');
        divTitle.classList.add('divTitle')
        divTitle.textContent = task.title

        const taskCheckbox = document.createElement('input');
        taskCheckbox.classList.add('taskCheckbox')
        taskCheckbox.type = 'checkbox';
        taskCheckbox.checked = task.completed;

        const divPriority = document.createElement('div');
        divPriority.textContent = task.priority;

        const divDueDate = document.createElement('div');
        divDueDate.textContent = task.dueDate;

        const editBtn = document.createElement('button');
        editBtn.classList.add('taskEditBtn');
        editBtn.textContent = 'Edit';

        const deleteBtn = document.createElement('button');
        deleteBtn.classList.add('taskDeleteBtn');
        deleteBtn.textContent = 'Delete';

        const taskLeft = document.createElement('div');
        taskLeft.classList.add('taskLeft');
        taskLeft.append(taskCheckbox, divTitle);

        const taskRight = document.createElement('div');
        taskRight.classList.add('taskRight');
        taskRight.append(divDueDate, divPriority, editBtn, deleteBtn)

        taskContainer.append(taskLeft, taskRight)

        projectContent.append(taskContainer)
    })
    main.append(activeProjectTitle, projectSubtitle, openTaskModal, projectContent)
}

main.addEventListener('click', (e) => {
    const taskContainer = e.target.closest('.taskContainer');
    if (!taskContainer) return;

    const id = taskContainer.dataset.id;
    const project = getActiveProject();
    const task = project.todos.find(task => task.id === id);

    if (!task) return;

    // EDIT TASK
    if (e.target.classList.contains('taskEditBtn')) {
        todoForm.dataset.editId = id;

        title.value = task.title;
        desc.value = task.description;
        dueDate.value = task.dueDate;
        priority.value = task.priority;

        openModal(todoModal);
        return;
    }

    // DELETE TASK
    if (e.target.classList.contains('taskDeleteBtn')) {
        deleteTodo(id);
        renderTasks();
        return;
    }
    // CHECK TASK
    if (e.target.classList.contains('taskCheckbox')) {
        task.toggleStatus()

        renderTasks()
        return;
    }

    // TASK DETAILS (click anywhere else in container)
    renderTitle.textContent = task.title;
    renderStatus.textContent = task.completed ? 'Done' : 'In Progress'
    renderDate.textContent = task.dueDate;
    renderPriority.textContent = task.priority;
    taskDescription.textContent = task.description;

    openModal(taskDetailModal);
});

intializeApp()
renderProject()
renderTasks()