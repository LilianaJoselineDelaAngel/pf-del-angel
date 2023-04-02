import { createFeatureSelector, createSelector } from '@ngrx/store';
import * as fromAuth from './auth.reducer';
import { state } from '@angular/animations';

export const selectAuthState = createFeatureSelector<fromAuth.AuthState>(
  fromAuth.authFeatureKey
);

export const selectUsuarioState = createSelector(
  selectAuthState,
  (state) => state.sesion.sesionActiva
);

export const selectUsuarioActivo = createSelector(
  selectAuthState,
  (state) => state.sesion
);
