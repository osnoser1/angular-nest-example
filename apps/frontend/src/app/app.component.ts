import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Observable } from 'rxjs';

import { Todo } from '@angular-nest/data';

@Component({
  selector: 'angular-nest-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  todos: Observable<Todo[]>;

  constructor(http: HttpClient) {
    this.todos = http.get<Todo[]>('/api/todos');
  }
}
