import { async, TestBed } from '@angular/core/testing';
import { SharedTodolibModule } from './shared-todolib.module';

describe('SharedTodolibModule', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [SharedTodolibModule]
    }).compileComponents();
  }));

  it('should create', () => {
    expect(SharedTodolibModule).toBeDefined();
  });
});
