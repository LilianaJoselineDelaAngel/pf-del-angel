import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AutenticacionRoutingModule } from './autenticacion-routing.module';
import { AutenticacionInicioComponent } from './components/autenticacion-inicio/autenticacion-inicio.component';
import { LoginComponent } from './components/login/login.component';
import { SharedModule } from '../shared/shared.module';
import { authFeatureKey, authReducer } from './state/auth.reducer';
import { StoreModule } from '@ngrx/store';

@NgModule({
  declarations: [AutenticacionInicioComponent, LoginComponent],
  imports: [
    CommonModule,
    AutenticacionRoutingModule,
    SharedModule,
    StoreModule.forFeature(authFeatureKey, authReducer),
  ],
})
export class AutenticacionModule {}
