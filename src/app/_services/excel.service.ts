import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { HttpHeaders } from '@angular/common/http'; 
const baseUrl = 'http://localhost:8080/api/excel';

@Injectable({
  providedIn: 'root'
})
export class ExcelService {

  constructor(private http: HttpClient) { }


  getAll(params): Observable<any> {
    return this.http.get(`${baseUrl}/tutorials`, {params});
  }

  getall(): Observable<any> {
    return this.http.get(baseUrl+'/tutorials');
  }


  upload(data): Observable<any> {
    return this.http.post(baseUrl+'/upload', data);
  }
  
  deleteAll(): Observable<any> {
    return this.http.delete(baseUrl);
  }

  
}
