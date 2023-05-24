import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ForbiddenUrlComponent } from './forbidden-url.component';

describe('ForbiddenUrlComponent', () => {
  let component: ForbiddenUrlComponent;
  let fixture: ComponentFixture<ForbiddenUrlComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ForbiddenUrlComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ForbiddenUrlComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
