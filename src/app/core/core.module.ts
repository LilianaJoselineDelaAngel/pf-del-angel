import { NgModule } from '@angular/core';
import { SharedModule } from '../shared/shared.module';

import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';

import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { PaginaNoEncontradaComponent } from '../components/pagina-no-encontrada/pagina-no-encontrada.component';
import { InicioComponent } from '../components/inicio/inicio.component';

@NgModule({
  declarations: [PaginaNoEncontradaComponent, InicioComponent],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    ReactiveFormsModule,
    FormsModule,
    HttpClientModule,
    SharedModule,
    RouterModule,
    CommonModule,
    HttpClientModule,
  ],
  exports: [
    PaginaNoEncontradaComponent,
    InicioComponent,
    HttpClientModule,
    ReactiveFormsModule,
    FormsModule,

    BrowserModule,
    BrowserAnimationsModule,
    SharedModule,
    RouterModule,
    CommonModule,
  ],
  providers: [],
})
export class CoreModule {}
