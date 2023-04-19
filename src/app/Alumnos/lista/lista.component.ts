import { Component, ViewChild, Inject } from '@angular/core';
import { Alumnos } from '../../models/alumnos';
import { MatTable, MatTableDataSource } from '@angular/material/table';
import { AlumnoListaService } from '../../services/alumno-lista.service';
import { FormularioComponent } from '../../Alumnos/formulario/formulario.component';
import {
  MatDialog,
  MAT_DIALOG_DATA,
  MatDialogRef,
} from '@angular/material/dialog';
import { Observable, Subscription } from 'rxjs';
import { Sesion } from 'src/app/models/sesion';
import { SesionService } from '../../core/services/sesion.service';
import { Router } from '@angular/router';
import { Curso } from '../../models/cursos';
import { Store } from '@ngrx/store';
import {
  selectAlumnosCargados,
  selectCargandoAlumnos,
} from '../alumnos-state.selectors';
import { alumnosCargados, cargarAlumnosStates } from '../alumnos-state.actions';
import { AlumnoState } from '../alumnos-state.reducer';

@Component({
  selector: 'app-lista',
  templateUrl: './lista.component.html',
  styleUrls: ['./lista.component.css'],
})
export class ListaComponent {
  Alumnos!: Alumnos;
  Alumnos$!: Observable<Alumnos[]>;

  sesion$!: Observable<Sesion>;
  cargando$!: Observable<boolean>;

  suscripcion!: Subscription;
  dataSource!: MatTableDataSource<Alumnos>;

  constructor(
    private AlumnoListaService: AlumnoListaService,
    public dialog: MatDialog, // public dialog: MatDialog
    private sesion: SesionService, //sesion
    private router: Router,
    private store: Store<AlumnoState>
  ) {}

  ngOnInit(): void {
    this.dataSource = new MatTableDataSource<Alumnos>();
    // this.cargando$ = this.store.select(selectCargandoAlumnos);
    // console.log('cargando', this.cargando$);
    // this.store.dispatch(cargarAlumnosStates());

    // this.AlumnoListaService.obtenerAlumnosObservable().subscribe(
    //   (alumnos: Alumnos[]) => {
    //     this.store.dispatch(alumnosCargados({ alumnos: alumnos }));
    //   }
    // );

    // this.Alumnos$ = this.store.select(selectAlumnosCargados);
    this.Alumnos$ = this.AlumnoListaService.obtenerAlumnosObservable();
    // //estado de la sesion
    // this.sesion.obtenerSesion().subscribe((sesion: Sesion) => {
    //   console.log('Estado de la sesion', sesion);
    //   if (!sesion.sesionActiva) {
    //     this.router.navigate(['auth/login']); //manda al login
    //   }
    //   this.sesion$ = this.sesion.obtenerSesion();
    // });

    this.suscripcion =
      this.AlumnoListaService.obtenerAlumnosObservable().subscribe(
        (alumn: Alumnos[]) => {
          this.dataSource.data = alumn;
        }
      );
  }

  eliminarAlumno(alumn: Alumnos) {
    this.AlumnoListaService.eliminar(alumn).subscribe((alumn: Alumnos) => {
      alert(`${alumn.nombre} eliminado`);
      this.Alumnos$ = this.AlumnoListaService.obtenerAlumnosObservable();
    });
  }

  editarAlumno(alumn: any) {
    console.log('lista comp', alumn);
    const dialogRef = this.dialog.open(FormularioComponent, {
      data: alumn,
    });
    this.Alumnos$ = this.AlumnoListaService.obtenerAlumnosObservable();
  }
}
