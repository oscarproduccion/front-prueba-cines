import { Component, OnInit, VERSION, ViewChild } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { CiudadService } from '../service/ciudad-service';
import { Ciudad } from '../ciudad.model';
import { MatSnackBar } from "@angular/material/snack-bar";

@Component({
  selector: 'app-agregar-ciudad',
  templateUrl: './agregarciudad.component.html',
  styleUrls: ['./agregarciudad.component.css']
})
export class AgregarCiudadComponent implements OnInit {
  public nombre!: string;
  public addCusForm!: FormGroup;
  wasFormChanged = false;

  constructor(
    private fb: FormBuilder,
    public dialog: MatDialog,
    private snackBar: MatSnackBar,
    private ciudadService: CiudadService
  ) { }

  public ngOnInit(): void {
    this.addCusForm = this.fb.group({
      id: null,
      nombre: [this.nombre, [Validators.required, Validators.pattern('[a-zA-Z]+([a-zA-Z ]+)*')]],
      //lastname: [this.lname, [Validators.required, Validators.pattern('[a-zA-Z]+([a-zA-Z ]+)*')]],
      //email: [null, [Validators.required, Validators.email]],
    });
  }

  closeDialog(): void {
    this.dialog.closeAll();

  }

  formChanged() {
    this.wasFormChanged = true;
  }

  agregarCiudad() {
    let ciudad: Ciudad = new Ciudad();
    ciudad.nombre = this.addCusForm.value.nombre;
    ciudad.usuarioCrea = String(sessionStorage.getItem("email"))
    this.ciudadService.agregarCiudad(ciudad)
      .subscribe((ciudad: Ciudad) => {
        this.snackBar.open("Registro agregado");
        this.dialog.closeAll();
      },
        (error: any) => {
          this.snackBar.open("Ocurrió un error creando el registro");
        }
      );

  }

}