import Todo from "../model/todo.js";
import Project from "../model/project.js"


const projects = []
let activeProject = null;

export function createProject(name) {
    const project = new Project(name);
    projects.push(project)

    activeProject = project;
}

export function getProjects() {
    return projects;
}

export function deleteProject(id) {
    const projects = getProjects();
    const index = projects.findIndex(item => item.id === id);

    if (index === -1) return
    projects.splice(index, 1)
}

export function addTodo(title, description, dueDate, priority) {
    const newTodo = new Todo(title, description, dueDate, priority);
    const project = getActiveProject()

    project.addTodo(newTodo);
}

export function setActiveProject(project) {
    activeProject = project;
}

export function getActiveProject() {
    return activeProject;
}

export function getTasks() {
    const project = getActiveProject()

    if (!project) return []

    return project.todos
}

export function editTodo(id, newData) {
    const project = getActiveProject();
    if (!project) return;

    let exisitingData = project.todos.find(t => t.id === id)

    if (!exisitingData) return;

    Object.assign(exisitingData, newData)
}

export function deleteTodo(id) {
    const project = getActiveProject();
    project.deleteTodo(id)
}