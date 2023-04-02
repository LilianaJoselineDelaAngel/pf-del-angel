import { createAction, props } from '@ngrx/store';
import { Alumnos } from '../models/alumnos';

export const cargarAlumnosStates = createAction(
  '[AlumnosState] Cargar AlumnosStates'
);

export const alumnosCargados = createAction(
  '[AlumnosState] Alumnos cargados',
  props<{ alumnos: Alumnos[] }>()
);
