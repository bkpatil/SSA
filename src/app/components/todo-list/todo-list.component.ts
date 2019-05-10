import { Component, OnInit } from '@angular/core';
import { TodoDataService } from '../../todo-data.service';
import { Todo } from '../../todo';
import { DataService } from './../../services/data.service';

@Component({
  selector: 'todo-list',
  templateUrl: './todo-list.component.html',
  styleUrls: ['./todo-list.component.scss']
})
export class TodoListComponent implements OnInit {

  newTodo: Todo = new Todo();
  todos: any;
  constructor(private todoDataService: TodoDataService, private dataService: DataService) {
  }

  addTodo() {
    var todo = this.newTodo;
    this.todos.push(todo);
    let temp = {
      "message": todo.message,
      "userName": this.dataService.user.userName,
      "businessId": this.dataService.user.businessId,
      id: todo.id
    }
    this.dataService.getData('library/addToDoList', temp).subscribe(results => {
      if (!results || results.code === -1) {
        return;
      }
      this.getTodos();
    });
    this.newTodo = new Todo();
    this.todoDataService.addTodo(this.newTodo);
  }

  toggleTodoComplete(todo) {
    todo.isActive = todo.isActive === "1" ? "0" : "1";
    this.dataService.getData('library/updateToDoList', todo).subscribe(results => {
      if (!results || results.code === -1) {
        return;
      }
    });
    //this.todoDataService.toggleTodoComplete(todo);
  }

  removeTodo(todo) {
    //this.todoDataService.deleteTodoById(todo.id);
    this.dataService.deleteData('library/deleteTodo/'+todo.id).subscribe(results => {
      if (!results || results.code === -1) {
        return;
      }
      this.getTodos();
    });
    
  }

  // get todos() {
  //   return  this.todoDataService.getAllTodos();
  // }
  getTodos() {
    this.dataService.getData('library/getToDoListByUserName', { "userName": this.dataService.user.userName }).subscribe(results => {
      if (!results || results.code === -1) {
        this.todos = [];
        return;
      }
      this.todos = results.data;
    });
  }
  ngOnInit() {
    this.getTodos();
    //  return  this.todoDataService.getAllTodos();
  }

}
