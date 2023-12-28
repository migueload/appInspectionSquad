import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ServiceService {

  //urlApi="http://localhost/inspection/api/";
  urlApi="https://www.inspectionsquad.com/api/";

  urlApiReport="https://www.inspectionsquad.com/report/index.php";


  constructor(private http: HttpClient) { }

  getInspectionstAll(): Observable<any> {
    return this.http.get<any>(this.urlApi+"Inspections/getAll");
  }

  getAsignmentAll(): Observable<any> {
    return this.http.get<any>(this.urlApi+"Assignment/getAll");
  }

  getAssigmentById(id: any): Observable<any> {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
      })
    };
    return this.http.post<any>(this.urlApi+"Assignment/getById", id, httpOptions);
  }

  getLogin(datosLogin: any): Observable<any> {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
      })
    };
    return this.http.post<any>(this.urlApi+"Usuarios/login", datosLogin, httpOptions);
  }

  //**Observations ***/

  getObservationSection(id: any): Observable<any> {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
      })
    };
    return this.http.post<any>(this.urlApi+"Observation/getByIdFather", id, httpOptions);
  }

  getObservation(id: any): Observable<any> {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
      })
    };
    return this.http.post<any>(this.urlApi+"Observation/getObservation", id, httpOptions);
  }

  getObservationChild(id: any): Observable<any> {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
      })
    };
    return this.http.post<any>(this.urlApi+"Observation/getObservationChild", id, httpOptions);
  }


  //**Save Assing */
  saveAssing(datosAssing: any): Observable<any> {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
      })
    };
    return this.http.post<any>(this.urlApi+"Assignment/save", datosAssing, httpOptions);
  }

  delAssing(datosAssing: any): Observable<any> {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
      })
    };
    return this.http.post<any>(this.urlApi+"Assignment/delete", datosAssing, httpOptions);
  }

  //********************* */

  //**Inspecciones */
  saveInspection(datosInspection: any): Observable<any> {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
      })
    };
    return this.http.post<any>(this.urlApi+"Inspections/save", datosInspection, httpOptions);
  }

  saveInspectionDetails(datosInspectionDetails: any): Observable<any> {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
      })
    };
    return this.http.post<any>(this.urlApi+"Inspections/saveDetails", datosInspectionDetails, httpOptions);
  }

  getInspectionsByStatusAndId(status: any): Observable<any> {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
      })
    };
    return this.http.post<any>(this.urlApi+"Inspections/getInspectionsByStatusAndId", status, httpOptions);
  }

  getInspectionsByStatus(status: any): Observable<any> {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
      })
    };
    return this.http.post<any>(this.urlApi+"Inspections/getInspectionsByStatus", status, httpOptions);
  }

  //**Inspectors */
  getInspectors(): Observable<any> {
    return this.http.get<any>(this.urlApi+"Inspectors/getAll");
  }

  delInspector(id: any): Observable<any> {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
      })
    };
    return this.http.post<any>(this.urlApi+"Inspectors/delete", id, httpOptions);
  }

  saveInspector(datosInspector: any): Observable<any> {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
      })
    };
    return this.http.post<any>(this.urlApi+"Inspectors/save", datosInspector, httpOptions);
  }

  //**Details Inspections */
  getInspectionById(datos: any): Observable<any> {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
      })
    };
    return this.http.post<any>(this.urlApi+"Inspections/getInspectionById", datos, httpOptions);
  }

  getDetailsInspection(datos: any): Observable<any> {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
      })
    };
    return this.http.post<any>(this.urlApi+"Inspections/getDetailsInspection", datos, httpOptions);
  }

  setUpdateStatus(datos: any): Observable<any> {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
      })
    };
    return this.http.post<any>(this.urlApi+"Inspections/setUpdateStatus", datos, httpOptions);
  }

  saveImage(datos: any): Observable<any> {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
      })
    };
    return this.http.post<any>(this.urlApi+"Inspections/saveImage", datos, httpOptions);
  }

  getPhotos(datos: any): Observable<any> {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
      })
    };
    return this.http.post<any>(this.urlApi+"Inspections/getPhotos", datos, httpOptions);
  }

  delPhoto(datos: any): Observable<any> {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
      })
    };
    return this.http.post<any>(this.urlApi+"Inspections/delImage", datos, httpOptions);
  }


  //**Generate Report */
  generateReport(id: any): Observable<any> {
    return this.http.get<any>(this.urlApiReport+"?id="+id);
  }


}
