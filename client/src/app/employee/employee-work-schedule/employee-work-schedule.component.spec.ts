import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EmployeeWorkScheduleComponent } from './employee-work-schedule.component';

describe('EmployeeWorkScheduleComponent', () => {
  let component: EmployeeWorkScheduleComponent;
  let fixture: ComponentFixture<EmployeeWorkScheduleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EmployeeWorkScheduleComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EmployeeWorkScheduleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
