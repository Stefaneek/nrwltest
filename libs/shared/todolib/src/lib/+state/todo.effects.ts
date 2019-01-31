import { Injectable } from '@angular/core';
import { Effect, Actions } from '@ngrx/effects';
import { DataPersistence } from '@nrwl/nx';

import { TodoPartialState } from './todo.reducer';
import {
  LoadTodo,
  TodoLoaded,
  TodoLoadError,
  TodoActionTypes, EditTodo, TodoEdited, RemoveTodo, TodoRemoved
} from './todo.actions';
import {TodoServiceService} from "../services/todo-service.service";
import {map} from "rxjs/operators";

@Injectable()
export class TodoEffects {

  @Effect() loadTodo$ = this.dataPersistence.fetch(TodoActionTypes.LoadTodo, {
    run: (action: LoadTodo, state: TodoPartialState) => {
      return this.todoService.getToDoList().pipe(
        map(data => new TodoLoaded(data))
      )
    },

    onError: (action: LoadTodo, error) => {
      console.error('Error', error);
      return new TodoLoadError(error);
    }
  });

  @Effect() editTodo$ = this.dataPersistence.fetch(TodoActionTypes.EditTodo, {
    run:(action: EditTodo, state: TodoPartialState) => {
      return new TodoEdited({todo: action.payload, id: action.payload['id']});
    },

    onError: (action: EditTodo, error) => {
      return new TodoLoadError(error);
    }
  });

  @Effect() removeTodo$ = this.dataPersistence.pessimisticUpdate(TodoActionTypes.RemoveTodo, {
    run:(action: RemoveTodo, state: TodoPartialState) => {
        return new TodoRemoved({todo: action.payload.todo, id: action.payload.todo.id})
    },
    onError: (action: RemoveTodo, error) => {
      return new TodoLoadError(error);
    }
  })

  constructor(
    private actions$: Actions,
    private dataPersistence: DataPersistence<TodoPartialState>,
    private todoService: TodoServiceService
  ) {}
}
