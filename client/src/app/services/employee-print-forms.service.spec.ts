import { TestBed } from '@angular/core/testing';

import { EmployeePrintFormsService } from './employee-print-forms.service';

describe('EmployeePrintFormsService', () => {
  let service: EmployeePrintFormsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(EmployeePrintFormsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
