import {
  Component,
  EventEmitter,
  Input,
  Output,
  ViewChild,
  Inject,
} from '@angular/core';
import { Alumnos } from '../../models/alumnos';
import { MatTable, MatTableDataSource } from '@angular/material/table';
import { AlumnoListaService } from '../../services/alumno-lista.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import {
  MatDialog,
  MatDialogRef,
  MAT_DIALOG_DATA,
} from '@angular/material/dialog';
import { Router } from '@angular/router';
import { ProfesorService } from 'src/app/core/services/profesor.service';

import { Subscription } from 'rxjs';

@Component({
  selector: 'app-agregar',
  templateUrl: './agregar.component.html',
  styleUrls: ['./agregar.component.scss'],
})
export class AgregarComponent {
  dataSource!: MatTableDataSource<Alumnos>;
  formulario!: FormGroup;
  suscripcion!: Subscription;

  constructor(
    public dialogRef: MatDialogRef<AgregarComponent>,
    private AlumnoListaService: AlumnoListaService,

    private router: Router,
    private proferes: ProfesorService
  ) {}

  ngOnInit(): void {
    this.formulario = new FormGroup({
      nombre: new FormControl('', [Validators.required]),
      apellido: new FormControl('', [Validators.required]),
      curso: new FormControl('', [Validators.required]),
      tareas: new FormControl('', [Validators.required]),
      Asistencia: new FormControl(true),
    });

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

  agregar() {
    let alumn: Alumnos = {
      id: '',
      nombre: this.formulario.value.nombre,
      apellidos: this.formulario.value.apellidos,
      curso: this.formulario.value.curso,
      tareas: this.formulario.value.tareas,
      esperadas: 10,
      asistencia: true,
    };
    this.AlumnoListaService.agregar(alumn).subscribe((alumn: Alumnos) => {
      alert(`se agrego ${alumn.nombre}`);
      this.router.navigate(['vistas/lista']);
    });
  }
}
