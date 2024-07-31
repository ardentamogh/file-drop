import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { ToastrService } from 'ngx-toastr';

@Injectable({
  providedIn: 'root'
})
export class BackEndService {
  private baseUrl = environment.API_END;

  constructor(private http: HttpClient,private toastr: ToastrService) { }

  uploadPdf(pdf: File): Observable<any> {
    const formData: FormData = new FormData();
    formData.append('pdf', pdf, pdf.name);

    return this.http.post(`${this.baseUrl}/upload`, formData);
  }

  getPdfs(): Observable<any> {
    return this.http.get(`${this.baseUrl}/pdfs`);
  }

  downloadPdf(id: string): Observable<Blob> {
    return this.http.get(`${this.baseUrl}/pdf/${id}`, { responseType: 'blob' });
  }
  getStatus(): Observable<any>{
    return this.http.get(`${this.baseUrl}/status_check`);
  }

  showToast(message:string,title:string,type?:string){
    if(type == 'error'){
      this.toastr.error(message,title);
    }
    else{
      this.toastr.success(message,title);
    }
  }
}
