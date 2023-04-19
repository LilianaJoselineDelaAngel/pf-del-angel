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

@Component({
  selector: 'app-tabla',
  templateUrl: './tabla.component.html',
  styleUrls: ['./tabla.component.css'],
})
export class TablaComponent {
  Alumnos!: Alumnos;
  Alumnos$!: Observable<Alumnos[]>;
  sesion$!: Observable<Sesion>;

  dataSource!: MatTableDataSource<Alumnos>;
  suscripcion!: Subscription;
  constructor(
    private AlumnoListaService: AlumnoListaService,
    private dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.dataSource = new MatTableDataSource<Alumnos>();
    this.suscripcion =
      this.AlumnoListaService.obtenerAlumnosObservable().subscribe(
        (alumn: Alumnos[]) => {
          this.dataSource.data = alumn;
        }
      );
  }
  ngOnDestroy(): void {
    this.suscripcion.unsubscribe();
  }
  @ViewChild(MatTable) tabla!: MatTable<Alumnos>;

  columnas: string[] = ['Acciones', 'nombre', 'curso', 'tareas', 'asistencia'];

  eliminar(alumn: Alumnos) {
    this.AlumnoListaService.eliminar(alumn).subscribe((alumn: Alumnos) => {
      alert(`${alumn.nombre} eliminado`);
      this.Alumnos$ = this.AlumnoListaService.obtenerAlumnosObservable();
    });
    this.tabla.renderRows();
  }

  editar(alumn: Alumnos) {
    const dialogRef = this.dialog.open(FormularioComponent, {
      data: alumn,
    });
    this.tabla.renderRows();
  }
}
