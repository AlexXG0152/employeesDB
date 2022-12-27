import { Component, OnDestroy, OnInit } from '@angular/core';
import { EmployeePrintFormsService } from '../../services/employee-print-forms.service';
import { EmployeePersonalDataService } from '../../services/employee-personal-data.service';
import { IEmployee } from '../../interfaces/employee';
import { ActivatedRoute, Router } from '@angular/router';
import { IEmployeeCertificate } from '../../interfaces/employeeCertificate';
import { Subscription } from 'rxjs/internal/Subscription';

@Component({
  selector: 'app-employee-print-forms',
  templateUrl: './employee-print-forms.component.html',
  styleUrls: ['./employee-print-forms.component.scss'],
})
export class EmployeePrintFormsComponent implements OnInit, OnDestroy {
  constructor(
    private certificateService: EmployeePrintFormsService,
    private employeePersonalDataService: EmployeePersonalDataService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  link?: string;
  user?: IEmployee;
  getUserData$?: Subscription;

  ngOnInit(): void {
    this.route.params.subscribe(() => {
      this.user!.employeeID = this.router.url.split('/')[2];
    });
    this.getUserData();
  }

  getUserData() {
    this.getUserData$ = this.employeePersonalDataService.getOnePassedResult().subscribe((data) => {
      this.user = data;
    });
  }

  createCertificateFromWorkPlace() {
    const employeeData: IEmployeeCertificate = {
      department: 'template department',
      occupation: 'template occupation',
      personalData: {
        firstName: this.user?.firstName,
        lastName: this.user?.lastName,
        since: this.user?.employmentDate,
      },
      date: new Date().toLocaleDateString(),
    };

    this.certificateService.createCertificateFromWorkPlace(this.user!.employeeID, employeeData).subscribe(
      (filename) => {
        this.link = filename;
        this.downloadFile();
      }
    );
  }

  downloadFile() {
    this.certificateService.download(
      this.user!.employeeID,
      this.link!.split('/').at(-1)!
    ).subscribe((file) => {
      this.downloadBlob(
        file,
        this.link!.split('/').at(-1)!,
        'application/vnd.openxmlformats-officedocument.wordprocessingml.document'
      );
    });
  }

  downloadURL(data: string, fileName: string) {
    const a = document.createElement('a');
    a.href = data;
    a.download = fileName;
    document.body.appendChild(a);
    a.click();
    a.remove();
  }

  downloadBlob(data: BlobPart, fileName: string, mimeType: string) {
    const blob = new Blob([data], {
      type: mimeType,
    });
    const url = window.URL.createObjectURL(blob);
    this.downloadURL(url, fileName);
    setTimeout(() => {
      window.URL.revokeObjectURL(url);
    }, 1000);
  }

  ngOnDestroy(): void {
    this.getUserData$?.unsubscribe();
  }
}

//https://www.npmjs.com/package/docx-templates
