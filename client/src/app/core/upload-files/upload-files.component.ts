import { Component, OnInit } from '@angular/core';
import { HttpEventType, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { UploadFilesService } from 'src/app/services/upload-files.service';
import { isNgTemplate } from '@angular/compiler';

@Component({
  selector: 'app-upload-files',
  templateUrl: './upload-files.component.html',
  styleUrls: ['./upload-files.component.scss'],
})
export class UploadFilesComponent implements OnInit {
  constructor(private uploadService: UploadFilesService) {}

  selectedFiles?: FileList;
  currentFile?: File;
  progress = 0;
  message = '';

  fileInfo?: Observable<any>;

  selectFile(event: any): void {
    this.selectedFiles = event.target.files;
  }

  upload(): void {
    this.progress = 0;

    if (this.selectedFiles) {
      Array.from(this.selectedFiles).forEach((file) => {
        if (file) {
          this.currentFile = file;

          this.uploadService.upload(this.currentFile).subscribe({
            next: (event: any) => {
              if (event.type === HttpEventType.UploadProgress) {
                this.progress = Math.round((100 * event.loaded) / event.total);
              } else if (event instanceof HttpResponse) {
                this.message = event.body.message;
                this.fileInfo = this.uploadService.getFiles();
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
            },
          });
        }
      });
    }
  }

  ngOnInit(): void {
    this.fileInfo = this.uploadService.getFiles();
  }
}
