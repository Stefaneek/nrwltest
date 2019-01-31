import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { TodoListComponent } from './components/todo-list/todo-list.component';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { MatTableModule } from '@angular/material/table';
import { MatIconModule } from '@angular/material/icon';
import {
  TODO_FEATURE_KEY,
  initialState as todoInitialState,
  todoReducer
} from './+state/todo.reducer';
import { TodoEffects } from './+state/todo.effects';
import { TodoFacade } from './+state/todo.facade';
import { HttpClientModule } from '@angular/common/http';
import { TodoComponent } from './components/todo/todo.component';
import { MatButtonModule } from '@angular/material/button';

@NgModule({
  imports: [
    CommonModule,
    HttpClientModule,
    MatTableModule,
    MatIconModule,
    MatButtonModule,
    RouterModule.forChild([
      { path: '', pathMatch: 'full', component: TodoComponent }
    ]),

    StoreModule.forFeature(TODO_FEATURE_KEY, todoReducer, {
      initialState: todoInitialState
    }),

    EffectsModule.forFeature([TodoEffects])
  ],
  providers: [TodoFacade],
  declarations: [TodoListComponent, TodoComponent]
})
export class SharedTodolibModule {
}
