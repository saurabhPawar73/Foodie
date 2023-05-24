import { TestBed } from '@angular/core/testing';

import { DishResolverService } from './dish-resolver.service';

describe('DishResolverService', () => {
  let service: DishResolverService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DishResolverService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
