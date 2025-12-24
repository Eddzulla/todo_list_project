export default class projectClass {
    constructor(title){
        this.title = title;
        this.todos = [];
    }
    addTodo(todo){
        this.todos.push(todo);
    }
    getTodos(){
        return this.todos;

    }
    getTodo(todoId){
        return this.todos.find((item) => item.id === todoId);
    }
    
    deleteTodo(todoId){
        this.todos = this.todos.filter((item) => item.id !== todoId);
    }


}