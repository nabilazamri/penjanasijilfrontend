import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { relativeTimeThreshold } from 'moment';

const baseUrl = 'http://localhost:8080/api/penerima';

@Injectable({
  providedIn: 'root'
})
export class PenerimaService {

  constructor(private http: HttpClient) { }

  getAll(userId, params): Observable<any> {
    return this.http.get(`${baseUrl}/${userId}`, {params});
  }

  getall(userId): Observable<any> {
    return this.http.get(`${baseUrl}/${userId}`);
  }

  geteverything(params): Observable<any> {
    return this.http.get(baseUrl, {params})
  }

  get(userId, id): Observable<any> {
    return this.http.get(`${baseUrl}/${userId}/${id}`);
  }

  create(data): Observable<any> {
    return this.http.post(baseUrl, data);
  }

  update(id, data): Observable<any> {
    return this.http.put(`${baseUrl}/${id}`, data);
  }

  delete(id): Observable<any> {
    return this.http.delete(`${baseUrl}/${id}`);
  }

  deleteAll(): Observable<any> {
    return this.http.delete(baseUrl);
  }

  findByTitle(nama): Observable<any> {
    return this.http.get(`${baseUrl}?nama=${nama}`);
  }
}
