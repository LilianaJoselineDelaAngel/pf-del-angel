import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ReactiveFormsModule } from '@angular/forms';
import { PaginaNoEncontradaComponent } from '../components/pagina-no-encontrada/pagina-no-encontrada.component';
import { InicioComponent } from '../components/inicio/inicio.component';
import { HttpClientModule } from '@angular/common/http';

@NgModule({
  declarations: [PaginaNoEncontradaComponent, InicioComponent],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    ReactiveFormsModule, //formularios reactivos
    HttpClientModule,
  ],
  exports: [PaginaNoEncontradaComponent, InicioComponent, HttpClientModule],
  providers: [],
})
export class CoreModule {}
