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
    private router: Router
  ) {}

  ngOnInit(): void {
    this.Alumnos$ = this.AlumnoListaService.obtenerAlumnosObservable();
    //estado de la sesion
    this.sesion.obtenerSesion().subscribe((sesion: Sesion) => {
      console.log('Estado de la sesion', sesion);
      if (!sesion.sesionActiva) {
        this.router.navigate(['auth/login']); //manda al login
      }

      this.sesion$ = this.sesion.obtenerSesion();
    });
    //this.dataSource = new MatTableDataSource<Alumnos>();
    //this.AlumnoListaService.obtenerAlumnosObservable().subscribe(
    //  (Alumnos: Alumnos[]) => {
    //    this.dataSource.data = Alumnos;
    //  }
    // );
  }
  //@ViewChild(MatTable) tabla!: MatTable<Alumnos>;
  // ngOnDestroy(): void {
  //   this.suscripcion.unsubscribe();
  // }
  //seleccionado = null;
  editarAlumno(alumn: any) {
    console.log('lista comp', alumn);
    const dialogRef = this.dialog.open(FormularioComponent, {
      data: alumn,
    });
  }

  eliminarAlumno(alumn: any) {
    this.AlumnoListaService.eliminar(alumn);
  }
}
