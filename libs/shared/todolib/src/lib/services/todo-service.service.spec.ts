import { TestBed } from '@angular/core/testing';

import { TodoServiceService } from './todo-service.service';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

describe('TodoServiceService', () => {
  let httpMock: HttpTestingController;



  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
    })

    httpMock = TestBed.get(HttpTestingController);
  });

  it('should be created', () => {
    const service: TodoServiceService = TestBed.get(TodoServiceService);
    expect(service).toBeTruthy();
  });
});
