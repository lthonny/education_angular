import {Component, OnInit} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {delay} from "rxjs/operators";
import {Todo, TodosService} from "./service/todos.service.ts.service";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  todos: Todo[] = [];
  loading: boolean = false;
  todoTitle: string = '';
  error: string = '';

  constructor(private todosService: TodosService) {}

  ngOnInit() {
    this.fetchTodos()
  }

  addTodo() {
    if (!this.todoTitle.trim()) {
      return;
    }

    this.todosService.addTodo({
      title: this.todoTitle,
      completed: false
    }).subscribe(todo => {
      this.todos.push(todo)
      this.todoTitle = '';
    })
  }


  fetchTodos() {
    this.loading = true;
    this.todosService.fetchTodos()
      .subscribe(todos => {
        this.todos = todos;
        this.loading = false;
      }, error => {
        // console.log(error.message);
        this.error = error.message;
      })
  }

  // почему id не работает с type<number>
  removeTodo(id: any) {
    this.todosService.removeTodo(id)
      .subscribe((res) => {
        this.todos = this.todos.filter(t => t.id !== id);
      })
  }

  // TS2532: Object is possibly 'undefined'.
  completeTodo(id: any) {
    this.todosService.completeTodo(id).subscribe(todo => {
      // this.todos.find(t => t.id === todo.id).completed = true;
      // type status?
      const status: any = this.todos.find(t => t.id === todo.id);
      status.completed = true;
    })
  }
}
