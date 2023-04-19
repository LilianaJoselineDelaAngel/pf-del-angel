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

import { Observable, Subscription } from 'rxjs';

@Component({
  selector: 'app-formulario',
  templateUrl: './formulario.component.html',
  styleUrls: ['./formulario.component.css'],
})
export class FormularioComponent {
  Alumnos$!: Observable<Alumnos[]>;
  dataSource!: MatTableDataSource<Alumnos>;
  formulario!: FormGroup;
  suscripcion!: Subscription;
  constructor(
    public dialogRef: MatDialogRef<FormularioComponent>,
    private AlumnoListaService: AlumnoListaService,
    private router: Router,
    private proferes: ProfesorService,

    @Inject(MAT_DIALOG_DATA) public data: Alumnos
  ) {
    let controles: any = {
      nombre: new FormControl(data.nombre, [
        Validators.required,
        Validators.pattern('^[a-zA-Z]+$'),
      ]),
      apellidos: new FormControl(data.apellidos, [
        Validators.required,
        Validators.pattern('^[a-zA-Z]+$'),
      ]),
      curso: new FormControl(data.curso, []),
      tareas: new FormControl(data.tareas, []),
    };
    this.formulario = new FormGroup(controles);
  }

  ngOnInit(): void {
    this.Alumnos$ = this.AlumnoListaService.obtenerAlumnosObservable();

    this.dataSource = new MatTableDataSource<Alumnos>();
    this.AlumnoListaService.obtenerAlumnosObservable().subscribe(
      (Alumnos: Alumnos[]) => {
        this.dataSource.data = Alumnos;
      }
    );
  }
  enviar(alumn: any) {
    let alumno: Alumnos = {
      id: alumn.id,
      nombre: this.formulario.value.nombre,
      apellidos: this.formulario.value.apellidos,
      curso: this.formulario.value.curso,
      tareas: this.formulario.value.tareas,
      esperadas: 10,
      asistencia: true,
    };

    this.AlumnoListaService.editar(alumno).subscribe((alumn: Alumnos) => {
      this.Alumnos$ = this.AlumnoListaService.obtenerAlumnosObservable();
      alert(`se actualizo: ${alumno.nombre}`);
      this.router.navigate(['vistas/tabla']);
      this.router.navigate(['vistas/lista']);
    });
  }
}
