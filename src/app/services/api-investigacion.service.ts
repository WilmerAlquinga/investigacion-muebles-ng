import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Mueble } from '../models/mueble';

const url = `http://localhost:9090/prj_investigacion/webresources/model.mueble`;

@Injectable({
  providedIn: 'root'
})
export class ApiInvestigacionService {

  constructor(private http: HttpClient) { }

  getAll(): Observable<Mueble[]> {
    return this.http.get<Mueble[]>(url);
  }

  create(mueble: Mueble): Observable<any> {
    return this.http.post<any>(url, mueble);
  }

  update(mueble: Mueble): Observable<any> {
    return this.http.put<any>(`${url}/${mueble.codigo}`, mueble);
  }

  delete(id: string): Observable<any> {
    return this.http.delete<any>(url + '/' + id);
  }
}
