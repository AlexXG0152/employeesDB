import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EmployeeGrowthPlanComponent } from './employee-growth-plan.component';

describe('EmployeeGrowthPlanComponent', () => {
  let component: EmployeeGrowthPlanComponent;
  let fixture: ComponentFixture<EmployeeGrowthPlanComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EmployeeGrowthPlanComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EmployeeGrowthPlanComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
