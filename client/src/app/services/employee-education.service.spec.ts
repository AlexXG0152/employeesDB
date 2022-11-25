import { TestBed } from '@angular/core/testing';

import { EmployeeEducationService } from './employee-education.service';

describe('EmployeeEducationService', () => {
  let service: EmployeeEducationService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(EmployeeEducationService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
