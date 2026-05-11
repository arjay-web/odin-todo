export default class Project {
    constructor(name) {
        this.id = crypto.randomUUID();
        this.name = name.charAt(0).toUpperCase() + name.slice(1);
        this.todos = [];
    }

    addTodo(todo) {
        this.todos.push(todo)
    }

    deleteTodo(id) {
        const index = this.todos.findIndex(item => item.id === id)

        if (index === -1) return

        this.todos.splice(index, 1)
    }
}