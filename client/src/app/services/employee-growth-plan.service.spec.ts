import { TestBed } from '@angular/core/testing';

import { EmployeeGrowthPlanService } from './employee-growth-plan.service';

describe('EmployeeGrowthPlanService', () => {
  let service: EmployeeGrowthPlanService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(EmployeeGrowthPlanService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
