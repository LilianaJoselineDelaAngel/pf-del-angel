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
import { selectUsuarioActivo } from 'src/app/autenticacion/state/auth.selectors';
import { Usuario } from 'src/app/models/usuario';

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
  usuarioActivo$!: Observable<Usuario | undefined>;

  constructor(
    private AlumnoListaService: AlumnoListaService,
    public dialog: MatDialog, // public dialog: MatDialog
    private sesion: SesionService, //sesion
    private router: Router,
    private store: Store<AlumnoState>
  ) {}

  ngOnInit(): void {
    this.dataSource = new MatTableDataSource<Alumnos>();
    this.Alumnos$ = this.AlumnoListaService.obtenerAlumnosObservable();
    this.usuarioActivo$ = this.store.select(selectUsuarioActivo);

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
    const dialogRef = this.dialog.open(FormularioComponent, {
      data: alumn,
    });
    this.Alumnos$ = this.AlumnoListaService.obtenerAlumnosObservable();
  }
}
