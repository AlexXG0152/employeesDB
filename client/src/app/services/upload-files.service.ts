import { HttpClient, HttpEvent, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class UploadFilesService {

  constructor(private http: HttpClient) {}

  private baseUrl = environment.BASE_URL;

  upload(data: any, file: File): Observable<HttpEvent<any>> {
    const formData: FormData = new FormData();
    formData.append('data', JSON.stringify(data));
    formData.append('file', file);

    const req = new HttpRequest('POST', `${this.baseUrl}/upload`, formData, {
      reportProgress: true,
      responseType: 'json',
    });

    return this.http.request(req);
  }

  getAllFiles(): Observable<any> {
    return this.http.get(`${this.baseUrl}/files`);
  }

  getEmployeeFiles(id: string): Observable<any> {
    return this.http.get(`${this.baseUrl}/files/id/${id}`);
  }
}
