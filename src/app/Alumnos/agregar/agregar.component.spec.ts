import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AgregarComponent } from './agregar.component';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';

describe('AgregarComponent', () => {
  let component: AgregarComponent;
  let fixture: ComponentFixture<AgregarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AgregarComponent],
      providers: [
        { provide: MatDialog, usevalue: {} },
        { provide: MatDialogRef, usevalue: {} },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(AgregarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
