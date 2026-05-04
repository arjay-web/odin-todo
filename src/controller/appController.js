import Todo from "../model/todo.js";
import Project from "../model/project.js"


const projects = []
let acticveProject = null;


export function createProject(name){
    const project = new Project(name);
    projects.push(project)

    acticveProject = project;
}

export function getProject(){
    return projects;
}

export function addTodo(title, description, dueDate, priority){
    const newTodo = new Todo(title, description, dueDate, priority);

    if(!acticveProject) return;
    acticveProject.addTodo(newTodo)
}

