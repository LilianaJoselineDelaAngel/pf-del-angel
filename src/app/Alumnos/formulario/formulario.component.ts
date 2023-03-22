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
//import { ListaComponent } from '../lista/lista.component';

@Component({
  selector: 'app-formulario',
  templateUrl: './formulario.component.html',
  styleUrls: ['./formulario.component.css'],
})
export class FormularioComponent {
  dataSource!: MatTableDataSource<Alumnos>;
  constructor(
    public dialogRef: MatDialogRef<FormularioComponent>,
    private AlumnoListaService: AlumnoListaService,
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
    this.dataSource = new MatTableDataSource<Alumnos>();
    this.AlumnoListaService.obtenerAlumnosObservable().subscribe(
      (Alumnos: Alumnos[]) => {
        this.dataSource.data = Alumnos;
      }
    );
  }

  formulario: FormGroup;
  Mensaje: string = '';

  //@Input() lista: any;
  //@Output() closeModal = new EventEmitter();

  // onCloseModal(): void {
  //   this.closeModal.emit();
  // }

  enviar(alumn: any) {
    this.AlumnoListaService.editar(alumn, this.formulario.controls);

    //console.log('enviar', alumn);
    //console.log(this.dataSource.data);
    ///console.log(this.formulario);

    // //this.dataSource.data.nombre = this.formulario.controls['nombre'].value;
    // //this.dataSource.data.apellidos =
    // // this.formulario.controls['apellidos'].value;
    // // this.dataSource.data.curso = this.formulario.controls['curso'].value;
    // //this.dataSource.data.tareas = this.formulario.controls['tareas'].value;
    // let Nombre = this.formulario.controls['nombre'].value;
    // let apellidos = this.formulario.controls['apellidos'].value;
    // let curso = this.formulario.controls['curso'].value;
    // let tareas = this.formulario.controls['tareas'].value;

    // var Aux = this.dataSource.data;
    // console.log(this.dataSource.data);
    // Aux.forEach(function (currentValue, index, arr) {
    //   if (Aux[index] == alumn) {
    //     Aux[index].nombre = Nombre;
    //     Aux[index].apellidos = apellidos;
    //     Aux[index].curso = curso;
    //     Aux[index].tareas = tareas;
    //   }
    // });
    // this.dataSource.data = Aux;
    // //  this.tabla.renderRows();
    // this.formulario.reset({
    //   nombre: '',
    //   apellidos: '',
    //   curso: '',
    //   tareas: '',
    // });
  }

  nuevo() {
    this.dataSource.data.push({
      nombre: this.formulario.controls['nombre'].value,
      apellidos: this.formulario.controls['apellidos'].value,
      curso: this.formulario.controls['curso'].value,
      tareas: this.formulario.controls['tareas'].value,
      esperadas: 10,
      asistencia: true,
    });
    console.log(this.dataSource.data);
    // this.tabla.renderRows();
  }
}
