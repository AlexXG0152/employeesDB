import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EmployeeEducationComponent } from './employee-education.component';

describe('EmployeeEducationComponent', () => {
  let component: EmployeeEducationComponent;
  let fixture: ComponentFixture<EmployeeEducationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EmployeeEducationComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EmployeeEducationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
