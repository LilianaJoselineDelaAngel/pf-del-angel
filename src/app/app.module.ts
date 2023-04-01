import { NgModule } from '@angular/core';

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

@NgModule({
  declarations: [
    AppComponent,
    ListaComponent,
    FormularioComponent,
    TablaComponent,
    AgregarComponent,
  ],
  imports: [
    NgbModule,
    AppRoutingModule,
    CommonModule,
    AutenticacionModule,
    AutenticacionRoutingModule,
    MaterialModule,
    CoreModule,
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
