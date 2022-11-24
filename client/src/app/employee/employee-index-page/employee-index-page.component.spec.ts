import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EployeeIndexPageComponent } from './employee-index-page.component';

describe('EployeeIndexPageComponent', () => {
  let component: EployeeIndexPageComponent;
  let fixture: ComponentFixture<EployeeIndexPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EployeeIndexPageComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EployeeIndexPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
