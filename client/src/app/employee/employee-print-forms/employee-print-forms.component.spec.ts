import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EmployeePrintFormsComponent } from './employee-print-forms.component';

describe('EmployeePrintFormsComponent', () => {
  let component: EmployeePrintFormsComponent;
  let fixture: ComponentFixture<EmployeePrintFormsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EmployeePrintFormsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EmployeePrintFormsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
