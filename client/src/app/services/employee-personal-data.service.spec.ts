import { TestBed } from '@angular/core/testing';

import { EmployeePersonalDataService } from './employee-personal-data.service';

describe('DataService', () => {
  let service: EmployeePersonalDataService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(EmployeePersonalDataService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
