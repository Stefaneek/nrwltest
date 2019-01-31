import * as fromTodoActions from './todo.actions'
import { Todo } from '@nrwltestapp/shared/todolib';

describe('Todo Actions', () => {
  describe('Load Todo Actions', () => {
    describe('LoadTodo', () => {
      it('should create an action', () => {
        const action = new fromTodoActions.LoadTodo();

        expect({...action}).toEqual({
          type: fromTodoActions.TodoActionTypes.LoadTodo
        })
      })
    });

    describe('Todo Loaded', () => {
      it('should create an action', () => {
        const action = new fromTodoActions.TodoLoaded([]);

        expect({...action}).toEqual({
          type: fromTodoActions.TodoActionTypes.TodoLoaded,
          payload: []
        })
      })
    });


  });

  describe('Remove Todo Actions', () => {
    describe('RemoveTodo', () => {
      it('should create RemoveTodo action', () => {
        const action = new fromTodoActions.RemoveTodo({
          todo: {} as Todo,
          id: '1'
        });

        expect({...action}).toEqual({
          type: fromTodoActions.TodoActionTypes.RemoveTodo,
          payload: {
            todo: {} as Todo,
            id: '1'
          }
        })
      })
    });

    describe('Todo Removed', () => {
      it('should create TodoRemoved action', () => {
        const action = new fromTodoActions.TodoRemoved({
          todo: {} as Todo,
          id: '1'
        });

        expect({...action}).toEqual({
          type: fromTodoActions.TodoActionTypes.TodoRemoved,
          payload: {
            todo: {} as Todo,
            id: '1'
          }
        })
      })
    });
  });
})
