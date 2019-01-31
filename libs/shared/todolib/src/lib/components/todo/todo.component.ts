import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { EditTodo, RemoveTodo, Todo, TodoFacade, TodoState } from '@nrwltestapp/shared/todolib';
import { Store } from '@ngrx/store';

@Component({
  selector: 'nrwltestapp-todo',
  templateUrl: './todo.component.html',
  styleUrls: ['./todo.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TodoComponent implements OnInit {
  todo$ = this.todoFacade.allTodo$;

  constructor(private todoFacade: TodoFacade, private store: Store<TodoState>) {
  }

  ngOnInit() {
  }

  editToDo() {
    this.store.dispatch(new EditTodo({
      'userId': 1,
      'id': 1,
      'title': 'Mateusz',
      'completed': false
    }));
  }

  remove(todo: Todo) {
    this.store.dispatch(new RemoveTodo({
      todo,
      id: todo.id
    }));
  }

}
