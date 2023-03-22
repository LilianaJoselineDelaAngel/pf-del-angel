import { NgModule } from '@angular/core';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { ListaComponent } from './Alumnos/lista/lista.component';
import { FormularioComponent } from './Alumnos/formulario/formulario.component';

import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { TablaComponent } from './components/tabla/tabla.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AlumnoListaService } from './services/alumno-lista.service';
import { MAT_DIALOG_DEFAULT_OPTIONS } from '@angular/material/dialog';
import { InicioComponent } from './components/inicio/inicio.component';
import { RouterModule } from '@angular/router';
import { PaginaNoEncontradaComponent } from './components/pagina-no-encontrada/pagina-no-encontrada.component';
import { AppRoutingModule } from './app-routing.module';

//agregar importaciones del modulo
import { CommonModule } from '@angular/common';
import { AutenticacionModule } from './autenticacion/autenticacion.module';
import { AutenticacionRoutingModule } from './autenticacion/autenticacion-routing.module';
import { MaterialModule } from './material.module';

@NgModule({
  declarations: [
    AppComponent,
    ListaComponent,
    FormularioComponent,
    TablaComponent, //no es necesarioi hacer referencia
    InicioComponent,
    PaginaNoEncontradaComponent,
  ],
  imports: [
    BrowserModule,
    ReactiveFormsModule, //formularios reactivos
    FormsModule, //formularios de plantillas
    NgbModule,
    BrowserAnimationsModule,
    RouterModule,
    AppRoutingModule, // CLI adds AppRoutingModule to the AppModule's imports array
    CommonModule,
    AutenticacionModule,
    AutenticacionRoutingModule,
    ReactiveFormsModule,
    MaterialModule,
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
