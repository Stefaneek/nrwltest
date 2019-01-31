import { TestBed, async } from '@angular/core/testing';
import Spy = jasmine.Spy;
import SpyObj = jasmine.SpyObj
import { Observable } from 'rxjs';

import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { provideMockActions } from '@ngrx/effects/testing';

import { NxModule } from '@nrwl/nx';
import { DataPersistence } from '@nrwl/nx';
import { hot } from '@nrwl/nx/testing';

import { TodoEffects } from './todo.effects';
import {EditTodo, LoadTodo, TodoEdited, TodoLoaded} from './todo.actions';
import { TodoServiceService } from '../services/todo-service.service';
import { getClassMethodsNames } from '../utils/get-class-methods-names';
import Mock = jest.Mock;

describe('TodoEffects', () => {
  let actions: Observable<any>;
  let effects: TodoEffects;
  let todoService: SpyObj<TodoServiceService>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        NxModule.forRoot(),
        StoreModule.forRoot({}),
        EffectsModule.forRoot([])
      ],
      providers: [
        TodoEffects,
        DataPersistence,
        provideMockActions(() => actions),
        {
          provide: TodoServiceService,
          useValue: this.createSpyObj('todoService', getClassMethodsNames(TodoServiceService))
        }
      ]
    });

    effects = TestBed.get(TodoEffects);
    todoService = TestBed.get(TodoServiceService);
  });

  describe('editTodo$', () => {
    it('should edit todo list', () => {
      actions = hot('-a-|', {
        a: new EditTodo({
          "userId": 1,
          "id": 1,
          "title": "Mateusz",
          "completed": false
        })
      });
      expect(effects.editTodo$).toBeObservable(
        hot('-a-|', {
          a: new TodoEdited({
            todo: {
              "userId": 1,
              "id": 1,
              "title": "Mateusz",
              "completed": false
            }, id: 1
          })
        })
      )
    });
  });

  describe('loadTodo$', () => {
    it('should load todo list', () => {
      actions = hot('-a-|', {
        a: new LoadTodo()
      });
      expect(effects.loadTodo$).toBeObservable(
        hot('-a-|', {
          a: new TodoLoaded([])
        })
      )
    });
  })
});

export const createSpyObj = (baseName, methodNames): { [key: string]: Mock<any> } => {
  const obj: any = {};

  for (let i = 0; i < methodNames.length; i++) {
    obj[methodNames[i]] = jest.fn();
  }

  return obj;
};
