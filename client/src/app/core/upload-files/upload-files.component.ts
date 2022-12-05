import { Component, OnInit } from '@angular/core';
import { HttpEventType, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { UploadFilesService } from 'src/app/services/upload-files.service';
import { EmployeePersonalDataService } from 'src/app/services/employee-personal-data.service';
import { FormGroup, FormControl } from '@angular/forms';
import { Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-upload-files',
  templateUrl: './upload-files.component.html',
  styleUrls: ['./upload-files.component.scss'],
})
export class UploadFilesComponent implements OnInit {
  constructor(
    private uploadService: UploadFilesService,
    private EmployeePersonalDataService: EmployeePersonalDataService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  selectedFiles?: FileList;
  currentFile?: File;
  progress = 0;
  message = '';
  date?: Date;
  employeeID?: string;
  employeePersonalData?: any;
  fileInfo?: Observable<any>;

  uploadCommentForm = new FormGroup({
    documentDate: new FormControl('', [Validators.required]),
    comment: new FormControl('', [
      Validators.required,
      Validators.minLength(3),
    ]),
    file: new FormControl('', [Validators.required]),
    employeeID: new FormControl(''),
  });

  checkDate() {
    const pattern =
      /^(19|20)\d\d-((0[1-9]|1[012])-(0[1-9]|[12]\d)|(0[13-9]|1[012])-30|(0[13578]|1[02])-31)/;
    const date = this.uploadCommentForm.value.documentDate;
    if (date && typeof date === 'string') {
      let match = pattern.test(date);
      if (match) {
        return true;
      }
    }
    return false;
  }

  selectFile(event: any): void {
    this.selectedFiles = event.target.files;
  }

  submit() {}

  upload(): void {
    this.progress = 0;
    this.uploadCommentForm.patchValue({ employeeID: this.employeeID });

    if (this.selectedFiles) {
      Array.from(this.selectedFiles).forEach((file) => {
        if (file) {
          this.currentFile = file;
          delete this.uploadCommentForm.value.file;

          this.uploadService
            .upload(this.uploadCommentForm.value, this.currentFile)
            .subscribe({
              next: (event: any) => {
                if (event.type === HttpEventType.UploadProgress) {
                  this.progress = Math.round(
                    (100 * event.loaded) / event.total
                  );
                } else if (event instanceof HttpResponse) {
                  this.message = event.body.message;
                  this.fileInfo = this.uploadService.getEmployeeFiles(
                    this.employeeID!
                  );
                }
              },
              error: (err: any) => {
                console.error(err);
                this.progress = 0;

                if (err.error && err.error.message) {
                  this.message = err.error.message;
                } else {
                  this.message = 'Could not upload the file!';
                }

                this.currentFile = undefined;
              },
              complete: () => {
                this.selectedFiles = undefined;
                this.uploadCommentForm.reset();
                this.progress = 0;
              },
            });
        }
      });
    }
  }

  ngOnInit(): void {
    this.route.params.subscribe(() => {
      this.employeeID = this.router.url.split('/')[2];
    });
    this.fileInfo = this.uploadService.getEmployeeFiles(this.employeeID!);
    this.fileInfo.subscribe(() => {})
  }
}
