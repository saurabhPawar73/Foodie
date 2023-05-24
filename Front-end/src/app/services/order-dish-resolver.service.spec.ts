import { TestBed } from '@angular/core/testing';

import { OrderDishResolverService } from './order-dish-resolver.service';

describe('OrderDishResolverService', () => {
  let service: OrderDishResolverService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(OrderDishResolverService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
