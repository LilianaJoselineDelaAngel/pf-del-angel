import { Alumnos } from './alumnos';

export interface AlumnoState {
  cargando: boolean;
  alumnos: Alumnos[];
}
