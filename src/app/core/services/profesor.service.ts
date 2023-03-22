import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Profesor } from 'src/app/models/profesores';
import { env } from 'src/environment/environment';

@Injectable({
  providedIn: 'root',
})
export class ProfesorService {
  constructor(private htttp: HttpClient) {}
  obtenerProfesores(): Observable<Profesor[]> {
    return this.htttp.get<Profesor[]>(`${env.apiURL}/profesores`);
  }
}
