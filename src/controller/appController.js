import Todo from "../model/todo.js";
import Project from "../model/project.js"


const projects = []
let activeProject = null;

createProject('Study');

addTodo('JS', 'Framework', '12-31-2000', 'high')
export function createProject(name) {
    const project = new Project(name);
    projects.push(project)

    activeProject = project;
}

export function getProjects() {
    return projects;
}


export function addTodo(title, description, dueDate, priority) {
    const newTodo = new Todo(title, description, dueDate, priority);
    const project = getActiveProject()

    project.addTodo(newTodo);
    console.log(project)
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
const newData = { title: 'python', description: 'machine learning', dueDate: '12-31-2000', priority: 'low' }
editTodo(0, newData)
export function editTodo(index, newData) {
    const project = getActiveProject();
    if (!project) return;

    project.todos[index] = {
        ...project.todos[index],
        ...newData
    }
}