import { ActionReducerMap } from '@ngrx/store';
import { AlumnoState } from '../../models/alumnos.state';
import { alumnosReducer } from './alumnos.reducers';

export interface AppState {
  alumnos: AlumnoState;
}
export const ROOT_REDUCERS: ActionReducerMap<AppState> = {
  alumnos: alumnosReducer,
};
