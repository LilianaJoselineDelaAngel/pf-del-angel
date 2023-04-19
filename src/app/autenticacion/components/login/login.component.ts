import { ThisReceiver } from '@angular/compiler';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { Usuario } from '../../../models/usuario';
import { LoginService } from '../../services/login.service';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { AuthState } from '../../state/auth.reducer';
import { AlumnoState } from 'src/app/Alumnos/alumnos-state.reducer';
import { Sesion } from 'src/app/models/sesion';
import { cargarSesion } from '../../state/auth.actions';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit, OnDestroy {
  formulario!: FormGroup;
  suscripcion!: Subscription;

  constructor(
    private loginService: LoginService,
    private router: Router,
    private authStore: Store<AuthState>
  ) {}
  ngOnInit(): void {
    this.formulario = new FormGroup({
      usuario: new FormControl('Administrador'),
      contrasena: new FormControl('Adm246'),
      esAdmin: new FormControl(true),
    });
    console.log('authStore', this.authStore);
  }

  ngOnDestroy(): void {
    this.suscripcion.unsubscribe();
  }

  login() {
    let usuario: Usuario = {
      usuario: this.formulario.value.usuario,
      contrasena: this.formulario.value.contrasena,
      esAdmin: this.formulario.value.esAdmin,
    };
    this.suscripcion = this.loginService
      .login(usuario)
      .subscribe((sesion: Sesion) => {
        this.authStore.dispatch(cargarSesion({ sesion: sesion }));
        this.router.navigate(['inicio']);
      });
  }
}
