import { TodoAction, TodoActionTypes } from './todo.actions';
import { createEntityAdapter, EntityAdapter, EntityState } from '@ngrx/entity';

export const TODO_FEATURE_KEY = 'todo';

/**
 * Interface for the 'Todo' data used in
 *  - TodoState, and
 *  - todoReducer
 *
 *  Note: replace if already defined in another module
 */

/* tslint:disable:no-empty-interface */
export interface Entity {}

export interface Todo {
  "userId",
  "id",
  "title",
  "completed"
}

export interface TodoState extends EntityState<Todo>{
  selectedId?: string | number; // which Todo record has been selected
  loaded: boolean; // has the Todo list been loaded
  error?: any; // last none error (if any)
}

export const adapter: EntityAdapter<Todo> = createEntityAdapter<Todo>();

export interface TodoPartialState {
  readonly [TODO_FEATURE_KEY]: TodoState;
}

export const initialState: TodoState = adapter.getInitialState( {
  loaded: false
});

export function todoReducer(
  state: TodoState = initialState,
  action: TodoAction
): TodoState {
  switch (action.type) {
    case TodoActionTypes.TodoLoaded: {
      state = adapter.addAll(action.payload, {
        ...state,
        loaded: true
      });
      break;
    }

    case TodoActionTypes.TodoEdited : {
      state = adapter.updateOne({
        id: action.payload.id,
        changes: action.payload.todo
      }, {
        ...state,
        selectedId: action.payload.id
      });
      break;
    }

    case TodoActionTypes.TodoRemoved : {
      state = adapter.removeOne(
        action.payload.id,
        state
      )
    }
  }
  return state;
}
