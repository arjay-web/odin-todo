import Todo from "../model/todo.js";
import Project from "../model/project.js"


export const newProject = new Project('Study');


const newTodo = new Todo('OOP Principles', 'SOLID', '5/5/2026', 'Urgent')
newProject.addTodo(newTodo);