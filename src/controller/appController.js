import Todo from "../model/todo.js";
import Project from "../model/project.js"


const projects = []
let activeProject = null;


export function createProject(name){
    const project = new Project(name);
    projects.push(project)

    activeProject = project;
}

export function getProject(){
    return projects;
}

export function addTodo(title, description, dueDate, priority){
    const newTodo = new Todo(title, description, dueDate, priority);
    const project = getActiveProject()

    project.addTodo(newTodo);
}

export function setActiveProject(project){
    activeProject = project;
}

export function getActiveProject(){
    return activeProject;
}