import { TestBed } from '@angular/core/testing';

import { EmployeeFamilyService } from './employee-family.service';

describe('EmployeeFamilyService', () => {
  let service: EmployeeFamilyService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(EmployeeFamilyService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
