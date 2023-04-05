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

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  dataSource!: MatTableDataSource<Alumnos>;
  suscripcion!: Subscription;
  Alumnos$!: Observable<Alumnos[]>;

  //sesion$!: Observable<boolean>;
  sesionActiva$!: Observable<Boolean>;
  usuarioActivo$!: Observable<Usuario | null>;

  //dialog: any;
  constructor(
    private AlumnoListaService: AlumnoListaService,
    private dialog: MatDialog, // public dialog: MatDialog

    private router: Router,
    private sesion: SesionService,
    //private store: Store<AppState>,

    private authStore: Store<AuthState>
  ) {}

  ngOnInit(): void {
    this.sesionActiva$ = this.authStore.select(selectSesionActiva);
    //this.usuarioActivo$ = this.authStore.select(selectUsuarioActivo);
    // this.sesion$ = this.authStore.select(selectSesionActiva);

    this.dataSource = new MatTableDataSource<Alumnos>();
    this.suscripcion =
      this.AlumnoListaService.obtenerAlumnosObservable().subscribe(
        (alumn: Alumnos[]) => {
          this.dataSource.data = alumn;
        }
      );

    // this.dataSource = new MatTableDataSource<Alumnos>();
    // this.suscripcion =
    //   this.AlumnoListaService.obtenerAlumnosObservable().subscribe(
    //     (alumn: Alumnos[]) => {
    //       this.dataSource.data = alumn;
    //     }
    //   );

    // this.sesion$ = this.sesion.obtenerSesion();
    //this.AlumnoListaService.obtenerAlumnosObservable().subscribe(
    //  (Alumnos: Alumnos[]) => {
    //  this.dataSource.data = Alumnos;
    // }
    //);
  }

  title = 'pf-del-angel';

  nvo = null;
  location: any;

  formulario() {
    // this.router.navigate(['formulario', { mensaje: 'formulario' }]);

    // this.dataSource.data.push(alumn);
    // console.log(alumn);
    const dialogRef = this.dialog.open(AgregarComponent, {
      // data: alumn,
    });
  }

  nuevo(alumn: any) {
    this.nvo = alumn;
  }

  irinicio() {
    let sesion: Sesion = {
      sesionActiva: true,
      //usuarioActivo: undefined,
    };
    this.router.navigate(['inicio', { mensaje: 'inicio' }]);
  }

  salir() {
    let sesionSalir: Sesion = {
      sesionActiva: false,
      usuarioActivo: undefined,
    };
    this.sesion.salir(sesionSalir);
    this.router.navigate(['auth/login']);
  }
}
