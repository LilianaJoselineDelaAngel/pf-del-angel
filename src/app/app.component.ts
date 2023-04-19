import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
//import { FormularioComponent } from './Alumnos/formulario/formulario.component';
import { AlumnoListaService } from './services/alumno-lista.service';
import {
  MatDialog,
  MAT_DIALOG_DATA,
  MatDialogRef,
} from '@angular/material/dialog';
import { MatTable, MatTableDataSource } from '@angular/material/table';
import { Observable, Subscription } from 'rxjs';
import { Alumnos } from './models/alumnos';
import { Sesion } from './models/sesion';
import { SesionService } from './core/services/sesion.service';
import { AgregarComponent } from './Alumnos/agregar/agregar.component';
import { Store } from '@ngrx/store';
import {
  selectSesionActiva,
  selectSesionState,
  selectUsuarioActivo,
} from './autenticacion/state/auth.selectors';
import { AuthState } from './autenticacion/state/auth.reducer';
import { Usuario } from './models/usuario';
import { AlumnoState } from './Alumnos/alumnos-state.reducer';
import { cargarSesion, cerrarSesion } from './autenticacion/state/auth.actions';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  title = 'pf-del-angel';
  sesionActiva$!: Observable<Boolean>;
  usuarioActivo$!: Observable<Usuario | undefined>;

  dataSource!: MatTableDataSource<Alumnos>;
  suscripcion!: Subscription;
  Alumnos$!: Observable<Alumnos[]>;

  constructor(
    private AlumnoListaService: AlumnoListaService,
    private dialog: MatDialog,
    private router: Router,
    private sesion: SesionService,
    private authStore: Store<AuthState>,
    private store: Store<AlumnoState>
  ) {}

  ngOnInit(): void {
    this.sesionActiva$ = this.authStore.select(selectSesionActiva);
    this.usuarioActivo$ = this.authStore.select(selectUsuarioActivo);

    this.dataSource = new MatTableDataSource<Alumnos>();
    this.suscripcion =
      this.AlumnoListaService.obtenerAlumnosObservable().subscribe(
        (alumn: Alumnos[]) => {
          this.dataSource.data = alumn;
        }
      );
  }

  salir() {
    let sesionSalir: Sesion = {
      sesionActiva: false,
      usuarioActivo: undefined,
    };
    this.sesion.salir(sesionSalir);
    this.authStore.dispatch(cerrarSesion());
    this.router.navigate(['auth/login']);
    window.location.reload();
  }

  formulario() {
    const dialogRef = this.dialog.open(AgregarComponent, {});
  }

  irinicio() {
    this.router.navigate(['inicio', { mensaje: 'inicio' }]);
  }
}
