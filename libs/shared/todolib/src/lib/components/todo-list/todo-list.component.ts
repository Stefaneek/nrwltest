import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';
import { Todo } from '@nrwltestapp/shared/todolib';


@Component({
  selector: 'nrwltestapp-todo-list',
  templateUrl: './todo-list.component.html',
  styleUrls: ['./todo-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TodoListComponent {
  @Input()
  todoArray: Todo[];
  @Output()
  editTodo: EventEmitter<Todo> = new EventEmitter<Todo>();
  @Output()
  removeTodo: EventEmitter<Todo> = new EventEmitter<Todo>();

  displayedColumns: string[] = ['position', 'name', 'weight', 'symbol'];

  constructor() {}

  editToDo() {
    this.editTodo.emit();
  }

  remove(todo: Todo) {
    this.removeTodo.emit(todo);
  }
}
