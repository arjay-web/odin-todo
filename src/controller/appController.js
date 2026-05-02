import Todo from "../model/todo.js";
import Project from "../model/project.js"
export const newProject = new Project('Study');




export function addTodo(title, description, dueDate, priority){
    const newTodo = new Todo(title, description, dueDate, priority);
    newProject.addTodo(newTodo)

}