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
import { AppState } from './core/state/app.state';
import { Store } from '@ngrx/store';
import { alumnosCargados, cargarAlumnos } from './core/state/alumnos.action';
import { selectorAlumnosCargados } from './core/state/alumnos.selectors';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  dataSource!: MatTableDataSource<Alumnos>;
  suscripcion!: Subscription;
  sesion$!: Observable<Sesion>;
  Alumnos$!: Observable<Alumnos[]>;

  //dialog: any;
  constructor(
    private AlumnoListaService: AlumnoListaService,
    private dialog: MatDialog, // public dialog: MatDialog

    private router: Router,
    private sesion: SesionService,
    private store: Store<AppState>
  ) {}

  ngOnInit(): void {
    this.store.dispatch(cargarAlumnos());
    this.AlumnoListaService.obtenerAlumnosObservable().subscribe(
      (alumnos: Alumnos[]) => {
        this.store.dispatch(alumnosCargados({ alumnos: alumnos }));
      }
    );

    this.dataSource = new MatTableDataSource<Alumnos>();
    this.suscripcion =
      this.AlumnoListaService.obtenerAlumnosObservable().subscribe(
        (alumn: Alumnos[]) => {
          this.dataSource.data = alumn;
        }
      );

    this.sesion$ = this.sesion.obtenerSesion();
    //this.AlumnoListaService.obtenerAlumnosObservable().subscribe(
    //  (Alumnos: Alumnos[]) => {
    //  this.dataSource.data = Alumnos;
    // }
    //);
  }

  title = '1PF-Del-Angel';

  nvo = null;
  location: any;

  nuevo(alumn: any) {
    this.nvo = alumn;
  }

  vacio = {
    nombre: '',
    apellidos: '',
    curso: '',
    tareas: 0,
    esperadas: 10,
    asistencia: true,
  };

  formulario(alumn: any) {
    this.router.navigate(['formulario', { mensaje: 'formulario' }]);

    this.dataSource.data.push(alumn);
    console.log(alumn);
    const dialogRef = this.dialog.open(AgregarComponent, {
      data: alumn,
    });
    // this.tabla.renderRows();

    //limpia los campos para el registro siguiente
    this.vacio = {
      nombre: '',
      apellidos: '',
      curso: '',
      tareas: 0,
      esperadas: 10,
      asistencia: true,
    };
  }

  irinicio() {
    console.log('inicio');
    this.router.navigate(['inicio', { mensaje: 'inicio' }]);
  }
  tabla() {
    console.log('tabla');
    this.router.navigate(['tabla']);
  }
  salir() {
    let sesionSalir: Sesion = {
      sesionActiva: false,
    };
    this.sesion.salir(sesionSalir);
    this.router.navigate(['auth/login']);
  }
}
