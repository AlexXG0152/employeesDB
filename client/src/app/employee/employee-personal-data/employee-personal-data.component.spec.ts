import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EmployeePersonalDataComponent } from './employee-personal-data.component';

describe('EmployeePersonalDataComponent', () => {
  let component: EmployeePersonalDataComponent;
  let fixture: ComponentFixture<EmployeePersonalDataComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EmployeePersonalDataComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EmployeePersonalDataComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
