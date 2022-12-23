import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EmployeeIndexPageComponent } from './employee-index-page.component';

describe('EployeeIndexPageComponent', () => {
  let component: EmployeeIndexPageComponent;
  let fixture: ComponentFixture<EmployeeIndexPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EmployeeIndexPageComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EmployeeIndexPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
