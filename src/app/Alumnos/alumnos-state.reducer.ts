import { createFeature, createReducer, on } from '@ngrx/store';
import * as AlumnosStateActions from './alumnos-state.actions';
import { Alumnos } from '../models/alumnos';

export const alumnosStateFeatureKey = 'alumnosState';

export interface AlumnoState {
  cargando: false;
  alumnos: Alumnos[];
}

export const initialState: AlumnoState = {
  cargando: false,
  alumnos: [],
};

export const reducer = createReducer(
  initialState,
  on(AlumnosStateActions.cargarAlumnosStates, (state) => {
    return {
      ...state,
      cargando: false,
    };
  }),
  on(AlumnosStateActions.alumnosCargados, (state, { alumnos }) => {
    return {
      ...state,
      cargando: false,
      alumnos,
    };
    // const nuevoEstado: AlumnoState = {
    //   cargando: false,
    //   alumnos: alumnos,
    // };
    // return nuevoEstado;
  })
);

export const alumnosStateFeature = createFeature({
  name: alumnosStateFeatureKey,
  reducer,
});
