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
import { AppState } from 'src/app/core/state/app.state';
import { Store } from '@ngrx/store';
import {
  alumnosCargados,
  cargarAlumnos,
} from 'src/app/core/state/alumnos.action';
import { selectorAlumnosCargados } from 'src/app/core/state/alumnos.selectors';

@Component({
  selector: 'app-lista',
  templateUrl: './lista.component.html',
  styleUrls: ['./lista.component.css'],
})
export class ListaComponent {
  Alumnos!: Alumnos;
  Alumnos$!: Observable<Alumnos[]>;
  sesion$!: Observable<Sesion>;

  // suscripcion!: Subscription;
  //dataSource!: MatTableDataSource<Alumnos>;
  constructor(
    private AlumnoListaService: AlumnoListaService,
    public dialog: MatDialog, // public dialog: MatDialog
    private sesion: SesionService, //sesion
    private router: Router,
    private store: Store<AppState>
  ) {}

  ngOnInit(): void {
    this.Alumnos$ = this.store.select(selectorAlumnosCargados);
    // this.Alumnos$ = this.AlumnoListaService.obtenerAlumnosObservable();
    //estado de la sesion
    this.sesion.obtenerSesion().subscribe((sesion: Sesion) => {
      console.log('Estado de la sesion', sesion);
      if (!sesion.sesionActiva) {
        this.router.navigate(['auth/login']); //manda al login
      }
      this.sesion$ = this.sesion.obtenerSesion();
    });
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
