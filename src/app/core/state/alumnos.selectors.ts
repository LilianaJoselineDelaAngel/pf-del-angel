import { AlumnoState } from 'src/app/models/alumnos.state';
import { AppState } from './app.state';
import { state } from '@angular/animations';
import { createSelector } from '@ngrx/store';

export const selectorAlumnos = (state: AppState) => {
  return state.alumnos;
};

export const selectorCargandoAlumnos = createSelector(
  selectorAlumnos,
  (state: AlumnoState) => {
    return state.cargando;
  }
);

export const selectorAlumnosCargados = createSelector(
  selectorAlumnos,
  (state: AlumnoState) => {
    return state.cargando;
  }
);
