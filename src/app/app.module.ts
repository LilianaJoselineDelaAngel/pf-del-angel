import { NgModule, isDevMode } from '@angular/core';

import { AppComponent } from './app.component';
import { ListaComponent } from './Alumnos/lista/lista.component';
import { FormularioComponent } from './Alumnos/formulario/formulario.component';

import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { TablaComponent } from './components/tabla/tabla.component';
import { AlumnoListaService } from './services/alumno-lista.service';
import { MAT_DIALOG_DEFAULT_OPTIONS } from '@angular/material/dialog';
import { AppRoutingModule } from './app-routing.module';

//agregar importaciones del modulo
import { CommonModule } from '@angular/common';
import { AutenticacionModule } from './autenticacion/autenticacion.module';
import { AutenticacionRoutingModule } from './autenticacion/autenticacion-routing.module';
import { MaterialModule } from './material.module';
import { CoreModule } from './core/core.module';
import { AgregarComponent } from './Alumnos/agregar/agregar.component';
import { StoreModule } from '@ngrx/store';
// import { ROOT_REDUCERS } from './core/state/app.state';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { DetalleComponent } from './components/detalle/detalle.component';

@NgModule({
  declarations: [
    AppComponent,
    ListaComponent,
    FormularioComponent,
    TablaComponent,
    AgregarComponent,
    DetalleComponent,
  ],
  imports: [
    NgbModule,
    AppRoutingModule,
    CommonModule,
    AutenticacionModule,
    AutenticacionRoutingModule,
    MaterialModule,
    CoreModule,
    StoreModule.forRoot({}, {}),
    StoreDevtoolsModule.instrument({ maxAge: 25, logOnly: !isDevMode() }),
  ],

  exports: [MaterialModule],
  providers: [
    AlumnoListaService,
    {
      provide: MAT_DIALOG_DEFAULT_OPTIONS,
      useValue: { hasBackdrop: false, panelClass: 'mat-dialog-override' },
    },
  ],
  bootstrap: [AppComponent, AppComponent],
})
export class AppModule {}
