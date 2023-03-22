import { Injectable } from '@angular/core';
import { Usuario } from '../../models/usuario';
import { SesionService } from '../../core/services/sesion.service';
import { Sesion } from '../../models/sesion';

@Injectable({
  providedIn: 'root',
})
export class LoginService {
  constructor(private sesion: SesionService) {}

  login(usuario: Usuario) {
    //informacion en memoria
    //localStorage.setItem('sesionActiva', JSON.stringify(usuario));

    let sesion: Sesion = {
      sesionActiva: true,
      usuarioActivo: usuario,
    };
    this.sesion.crearSesion(sesion);
  }
}
