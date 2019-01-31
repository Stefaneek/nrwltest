import { TodoEdited, TodoLoaded, TodoRemoved } from './todo.actions';
import { TodoState, Entity, initialState, todoReducer } from './todo.reducer';

describe('Todo Reducer', () => {
  let createTodo;
  beforeEach(() => {
    createTodo = (id: string, userId='', title='', completed=true , name = ''): Entity => ({
      id,
      name: name || `name-${id}`
    });
  });

  describe('valid Todo actions ', () => {
    it('should return set the list of known Todo', () => {
      const todos = [createTodo('PRODUCT-AAA'), createTodo('PRODUCT-zzz')];
      const action = new TodoLoaded(todos);
      const result: TodoState = todoReducer(initialState, action);
      const selId: string = 'PRODUCT-zzz';

      expect(result.loaded).toBe(true);
      expect(result.ids.length).toBe(2);
      expect(selId).toBe('PRODUCT-zzz');
    });
  })

  describe('Remove Todo actions ', () => {
    it('should return set the list of known Todo without removed', () => {
      const todos = [createTodo('PRODUCT-AAA'), createTodo('PRODUCT-zzz')];
      const loadAction = new TodoLoaded(todos);
      const loadedState: TodoState = todoReducer(initialState, loadAction);
      const action = new TodoRemoved(todos[0]);
      const result: TodoState = todoReducer(loadedState, action);

      expect(result.ids.length).toBe(1);
      expect(result.ids[0]).toBe(todos[1].id);
    });
  });

  describe('Edit Todo actions ', () => {
    it('should return edited set the list of known Todo', () => {
      const todos = [createTodo('PRODUCT-AAA'), createTodo('PRODUCT-zzz')];
      const loadAction = new TodoLoaded(todos);
      const loadedState: TodoState = todoReducer(initialState, loadAction);
      const editedTodo = todos[1];
      editedTodo.title = 'STEFAN';
      const action = new TodoEdited({todo: editedTodo, id: editedTodo.id});
      const result: TodoState = todoReducer(loadedState, action);

      expect(result.ids.length).toBe(2);
      expect(result.entities['PRODUCT-zzz'].title).toBe('STEFAN');
    });
  });

  describe('unknown action', () => {
    it('should return the initial state', () => {
      const action = {} as any;
      const result = todoReducer(initialState, action);

      expect(result).toBe(initialState);
    });
  });
});
