import { createFeatureSelector, createSelector } from '@ngrx/store';
import { TODO_FEATURE_KEY, TodoState } from './todo.reducer';

// Lookup the 'Todo' feature state managed by NgRx
const getTodoState = createFeatureSelector<TodoState>(TODO_FEATURE_KEY);

const getLoaded = createSelector(
  getTodoState,
  (state: TodoState) => state.loaded
);
const getError = createSelector(
  getTodoState,
  (state: TodoState) => state.error
);

const getAllTodo = createSelector(
  getTodoState,
  getLoaded,
  (state: TodoState, isLoaded) => {
    return isLoaded ? Object.values(state.entities): [];
  }
);
const getSelectedId = createSelector(
  getTodoState,
  (state: TodoState) => state.selectedId
);
const getSelectedTodo = createSelector(
  getAllTodo,
  getSelectedId,
  (todo, id) => {
    const result = Object.values(todo).find(it => it.id === id);
    return result ? Object.assign({}, result) : undefined;
  }
);

export const todoQuery = {
  getLoaded,
  getError,
  getAllTodo,
  getSelectedTodo
};
