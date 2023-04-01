import { Profesor } from './profesores';

export interface Curso {
  id: string;
  nombre: string;
  comision: string;
  profesor: Profesor;
  inscripcionAbierta: string;
  fechaInicio: Date;
  fechaFin: Date;
}
