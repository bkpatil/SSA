import { Injectable } from '@angular/core';
import { Todo } from './todo';
import { DataService } from './services/data.service';
@Injectable()
export class TodoDataService {

  // Placeholder for last id so we can simulate
  // automatic incrementing of ids
  lastId: number = 0;

  // Placeholder for todos
  todos: Todo[] = [];

  constructor(private dataService: DataService) {
  }

  ngOnInit() {

  }

  // Simulate POST /todos
  addTodo(todo: Todo): TodoDataService {
    if (!todo.id) {
      todo.id = ++this.lastId;
    }
    this.todos.push(todo);
    return this;
  }
  getTodos() {
    this.dataService.getData('library/getToDoListByUserName', { "userName": this.dataService.user.userName }).subscribe(results => {
      if (!results || results.code === -1) {
        this.todos = [];
        return;
      }
      this.todos = results.data;
      return this.todos;
    });
  }
  // Simulate DELETE /todos/:id
  deleteTodoById(id: number): TodoDataService {
    this.todos = this.todos
      .filter(todo => todo.id !== id);
    return this;
  }

  // Simulate PUT /todos/:id
  updateTodoById(id: number, values: Object = {}): Todo {
    let todo = this.getTodoById(id);
    if (!todo) {
      return null;
    }
    (<any>Object).assign(todo, values);
    return todo;
  }

  // Simulate GET /todos
  getAllTodos() {
   
  }

  // Simulate GET /todos/:id
  getTodoById(id: number): Todo {
    return this.todos
      .filter(todo => todo.id === id)
      .pop();
  }

  // Toggle todo complete
  toggleTodoComplete(todo: Todo) {
    let updatedTodo = this.updateTodoById(todo.id, {
      isActive: !todo.isActive
    });
    return updatedTodo;
  }

}