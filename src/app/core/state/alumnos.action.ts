import { createAction, props } from '@ngrx/store';
import { Alumnos } from '../../models/alumnos';

export const cargarAlumnos = createAction('[lista Alumnos] Cargar alumnos');
export const alumnosCargados = createAction(
  '[Lista Alumnos] Alumnos cargados',
  props<{ alumnos: Alumnos[] }>()
);
