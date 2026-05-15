import Project from "../model/project.js"
import Todo from "../model/todo.js";

export function saveProjects(projects) {
    localStorage.setItem('projects', JSON.stringify(projects))
}

export function loadProjects() {
    const data = localStorage.getItem('projects')
    if (!data) return [];

    const parseData = JSON.parse(data);

    const restoredProjects = parseData.map(project => {
        const restoredProject = new Project(project.name)
        restoredProject.id = project.id;
        restoredProject.todos = project.todos.map(todo => {
            const restoredTodo = new Todo(
                todo.title,
                todo.description,
                todo.dueDate,
                todo.priority,
            )
            restoredTodo.id = todo.id;
            restoredTodo.completed = todo.completed;

            return restoredTodo
        })
        return restoredProject;
    })
    return restoredProjects
}