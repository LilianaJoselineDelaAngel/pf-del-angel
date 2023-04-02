import { NgModule } from '@angular/core';
import { AgregarComponent } from './agregar/agregar.component';
import { CommonModule } from '@angular/common';
import { DetalleComponent } from '../components/detalle/detalle.component';
import { ListaComponent } from './lista/lista.component';
import { FormularioComponent } from './formulario/formulario.component';
import { AlumnoListaService } from '../services/alumno-lista.service';

import { MaterialModule } from '../material.module';
import { TablaComponent } from '../components/tabla/tabla.component';
import { InicioComponent } from '../components/inicio/inicio.component';

import { ReactiveFormsModule } from '@angular/forms';
import { StoreModule } from '@ngrx/store';
import { alumnosStateFeatureKey, reducer } from './alumnos-state.reducer';
// import { EffectsModule } from '@ngrx/effects';
// import { AlumnosStateEffects } from '../alumnos/alumnos-state.effects';
//import { cursoStateFeatureKey, reducer } from './curso-state.reducer';

@NgModule({
  declarations: [
    // AgregarComponent,
    // DetalleComponent,
    // ListaComponent,
    // FormularioComponent,
    // TablaComponent,
    // InicioComponent,
  ],
  imports: [
    CommonModule,
    MaterialModule,
    ReactiveFormsModule,
    //EffectsModule.forFeature([AlumnosStateEffects]),
    StoreModule.forFeature(alumnosStateFeatureKey, reducer),
  ],
  providers: [AlumnoListaService],
})
export class CursosModule {}
