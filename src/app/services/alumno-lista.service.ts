import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, map, Observable, of, from } from 'rxjs';
import { Alumnos } from '../models/alumnos';
import { env } from 'src/environment/environment';
import { DataSource } from '@angular/cdk/collections';
import { MatTableDataSource } from '@angular/material/table';

@Injectable({
  providedIn: 'root',
})
export class AlumnoListaService {
  private lumnos$!: BehaviorSubject<Alumnos[]>;

  constructor(private http: HttpClient) {}

  obtenerAlumnosObservable(): Observable<Alumnos[]> {
    return this.http.get<Alumnos[]>(`${env.apiURL}/alumnos`);
  }
  agregar(alumn: Alumnos): Observable<Alumnos> {
    return this.http.post<Alumnos>(`${env.apiURL}/alumnos`, alumn);
  }
  eliminar(alumn: Alumnos): Observable<Alumnos> {
    return this.http.delete<Alumnos>(`${env.apiURL}/alumnos/${alumn.id}`);
  }
  editar(alumn: Alumnos): Observable<Alumnos> {
    return this.http.put<Alumnos>(`${env.apiURL}/alumnos/${alumn.id}`, alumn);
  }
}
