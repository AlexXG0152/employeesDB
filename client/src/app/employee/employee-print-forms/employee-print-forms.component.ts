import { Component, OnInit } from '@angular/core';
import { EmployeePrintFormsService } from 'src/app/services/employee-print-forms.service';

@Component({
  selector: 'app-employee-print-forms',
  templateUrl: './employee-print-forms.component.html',
  styleUrls: ['./employee-print-forms.component.scss'],
})
export class EmployeePrintFormsComponent implements OnInit {
  constructor(private Certificate: EmployeePrintFormsService) {}

  getCertificateFromWorkPlace() {
    this.Certificate.createCertificateFromWorkPlace().subscribe(()=>{})
  }

  ngOnInit(): void {}
}
