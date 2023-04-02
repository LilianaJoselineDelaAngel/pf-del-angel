import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { MaterialModule } from '../material.module';

@NgModule({
  declarations: [],
  imports: [CommonModule, ReactiveFormsModule, MaterialModule],
  exports: [CommonModule, ReactiveFormsModule, MaterialModule],
})
export class SharedModule {
  // static forFeature(arg0: {}):
  //   | any[]
  //   | import('@angular/core').Type<any>
  //   | import('@angular/core').ModuleWithProviders<{}> {
  //   throw new Error('Method not implemented.');
  // }
}
