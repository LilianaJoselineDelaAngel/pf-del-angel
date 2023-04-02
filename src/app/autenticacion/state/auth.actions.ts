import { createAction, props } from '@ngrx/store';
import { Sesion } from '../../models/sesion';

export const cargarSesion = createAction(
  '[Auth] Sesion cargada',
  props<{ sesion: Sesion }>()
);
// export function cargarAuths(
//   cargarAuths: any,
//   arg1: (
//     state:  import('./auth.reducer').AuthState
//   ) => import('./auth.reducer').AuthState
// ): import('@ngrx/store').ReducerTypes<
//   import('./auth.reducer').AuthState,
//   readonly import('@ngrx/store').ActionCreator[]
// > {
//   throw new Error('Function not implemented.');
// }
