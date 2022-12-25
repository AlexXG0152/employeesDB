import { Component, OnInit } from '@angular/core';
import { HttpEventType, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { UploadFilesService } from '../../services/upload-files.service';
import { FormGroup, FormControl } from '@angular/forms';
import { Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { StorageService } from '../../services/storage.service';

@Component({
  selector: 'app-upload-files',
  templateUrl: './upload-files.component.html',
  styleUrls: ['./upload-files.component.scss'],
})
export class UploadFilesComponent implements OnInit {
  constructor(
    private uploadService: UploadFilesService,
    private route: ActivatedRoute,
    private storageService: StorageService
  ) {}

  private roles: string[] = [];
  isLoggedIn = false;
  showAdminBoard = false;
  showModeratorBoard = false;
  username?: string;

  selectedFiles?: FileList;
  currentFile?: File;
  progress = 0;
  message = '';
  date?: Date;
  employeeID?: string;
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

  checkDate(): boolean {
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

  submit(): void {}

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
    this.isLoggedIn = this.storageService.isLoggedIn();
    if (this.isLoggedIn) {
      const user = this.storageService.getUser();
      this.roles = user.roles;
      this.showAdminBoard = this.roles.includes('ROLE_ADMIN');
      this.showModeratorBoard = this.roles.includes('ROLE_MODERATOR');
      this.username = user.username;
    }

    this.route.params.subscribe((params) => {
      this.employeeID = params['id'];
    });
    this.fileInfo = this.uploadService.getEmployeeFiles(this.employeeID!);
  }
}
