import { createReducer, on } from '@ngrx/store';
import { AlumnoState } from '../../models/alumnos.state';
import { alumnosCargados, cargarAlumnos } from './alumnos.action';
import { state } from '@angular/animations';
import { Curso } from '../../models/cursos';

const estadoInicial: AlumnoState = {
  cargando: false,
  alumnos: [],
};

export const alumnosReducer = createReducer(
  estadoInicial,
  on(cargarAlumnos, (state) => {
    const nuevoEstado: AlumnoState = {
      cargando: true,
      alumnos: state.alumnos,
    };
    return nuevoEstado;
  }),
  on(alumnosCargados, (state, { alumnos }) => {
    const nuevoEstado: AlumnoState = {
      cargando: true,
      alumnos: alumnos,
    };
    return nuevoEstado;
  })
);
