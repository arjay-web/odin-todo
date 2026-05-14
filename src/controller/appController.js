import Todo from "../model/todo.js";
import Project from "../model/project.js"
import { saveProjects, loadProjects } from "./storage.js";

let projects = loadProjects() || []
let activeProject = null;

export function createProject(name) {
    const project = new Project(name);
    projects.push(project)

    activeProject = project;
    saveProjects(projects)
}

export function getProjects() {
    return projects;
}

export function setProjects(newProjects) {
    projects = newProjects;
}

export function deleteProject(id) {
    const projects = getProjects();
    const updatedProjects = projects.filter(p => p.id !== id);

    setProjects(updatedProjects)
    saveProjects(projects)
}

export function addTodo(title, description, dueDate, priority) {
    const newTodo = new Todo(title, description, dueDate, priority);
    const project = getActiveProject()

    project.addTodo(newTodo);
    saveProjects(projects)
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
    saveProjects(projects)
}

export function deleteTodo(id) {
    const project = getActiveProject();
    project.deleteTodo(id)
    saveProjects(projects)
}

export function toggleStatus(id) {
    const project = getActiveProject()
    const todo = project.todos.find(t => t.id === id)
    if (!todo) return
    todo.toggleStatus()
    saveProjects(projects)
}

export function intializeApp() {
    if (projects.length === 0) {
        createProject('Inbox')
    }
    activeProject = projects[0]
}

