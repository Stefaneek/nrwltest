import {Action} from '@ngrx/store';
import {Todo} from './todo.reducer';

export enum TodoActionTypes {
  LoadTodo = '[Todo] Load Todo',
  TodoLoaded = '[Todo] Todo Loaded',
  TodoLoadError = '[Todo] Todo Load Error',
  EditTodo = '[Todo] Edit Todo',
  TodoEdited = '[Todo] Todo Edited',
  RemoveTodo = '[Todo] Remove Todo',
  TodoRemoved = '[Todo] Todo Removed'
}

export class LoadTodo implements Action {
  readonly type = TodoActionTypes.LoadTodo;
}

export class TodoLoadError implements Action {
  readonly type = TodoActionTypes.TodoLoadError;

  constructor(public payload: any) {
  }
}

export class TodoLoaded implements Action {
  readonly type = TodoActionTypes.TodoLoaded;

    constructor(public payload: Todo[]) {
  }
}

export class EditTodo implements Action {
  readonly type = TodoActionTypes.EditTodo;

  constructor(public payload: Todo) {
  }
}

export class TodoEdited implements Action {
  readonly type = TodoActionTypes.TodoEdited;

  constructor(public payload: {
    todo: Todo,
    id: number
  }) {}
}

export class RemoveTodo implements Action {
  readonly type = TodoActionTypes.RemoveTodo

  constructor(public payload: {
    todo: Todo,
    id: string
  }) {}
}


export class TodoRemoved implements Action {
  readonly type = TodoActionTypes.TodoRemoved

  constructor(public payload: {
    todo: Todo,
    id: string
  }) {}
}

export type TodoAction = LoadTodo | TodoLoaded | TodoLoadError | EditTodo | TodoEdited | RemoveTodo | TodoRemoved;

export const fromTodoActions = {
  LoadTodo,
  TodoLoaded,
  TodoLoadError,
  EditTodo,
  TodoEdited,
  RemoveTodo,
  TodoRemoved
};
