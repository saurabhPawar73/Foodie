import { TestBed } from '@angular/core/testing';

import { ForuserGuard } from './foruser.guard';

describe('ForuserGuard', () => {
  let guard: ForuserGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(ForuserGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
