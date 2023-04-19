import { TestBed } from '@angular/core/testing';
import { AppComponent } from './app.component';
import { ListaComponent } from './Alumnos/lista/lista.component';
import { FormularioComponent } from './Alumnos/formulario/formulario.component';
import { TablaComponent } from './components/tabla/tabla.component';
import { LoginComponent } from './autenticacion/components/login/login.component';
import { AutenticacionInicioComponent } from './autenticacion/components/autenticacion-inicio/autenticacion-inicio.component';
import { ProfesorService } from './core/services/profesor.service';
import { MaterialModule } from './material.module';
import { MatDialog } from '@angular/material/dialog';
import { RouterModule } from '@angular/router';
import { AppRoutingModule } from './app-routing.module';

describe('AppComponent', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [
        AppComponent,
        ListaComponent,
        FormularioComponent,
        TablaComponent,
        LoginComponent,
        AutenticacionInicioComponent,
        AppComponent,
      ],
      providers: [ProfesorService, { provide: MatDialog, usevalue: {} }],

      imports: [MaterialModule, RouterModule, AppRoutingModule],
    }).compileComponents();
  });

  it('should create the app', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });

  it(`should have as title 'pf-del-angel'`, () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    expect(app.title).toEqual('pf-del-angel');
  });

  it('should render title', () => {
    const fixture = TestBed.createComponent(AppComponent);
    fixture.detectChanges();
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.querySelector('.content span')?.textContent).toContain(
      'pf-del-angel app is running!'
    );
  });
});
