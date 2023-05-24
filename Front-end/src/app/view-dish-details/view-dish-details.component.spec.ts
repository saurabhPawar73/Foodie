import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewDishDetailsComponent } from './view-dish-details.component';

describe('ViewDishDetailsComponent', () => {
  let component: ViewDishDetailsComponent;
  let fixture: ComponentFixture<ViewDishDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ViewDishDetailsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ViewDishDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
