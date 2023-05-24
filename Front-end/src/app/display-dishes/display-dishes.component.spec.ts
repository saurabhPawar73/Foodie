import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DisplayDishesComponent } from './display-dishes.component';

describe('DisplayDishesComponent', () => {
  let component: DisplayDishesComponent;
  let fixture: ComponentFixture<DisplayDishesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DisplayDishesComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DisplayDishesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
