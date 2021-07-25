import { Component, OnInit, VERSION, ViewChild } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { SucursalService } from '../service/sucursal-service';
import { Sucursal } from '../sucursal.model';
import { MatSnackBar } from "@angular/material/snack-bar";
import { Ciudad } from '../ciudad.model';
import { CiudadService } from '../service/ciudad-service';

@Component({
  selector: 'app-agregar-sucursal',
  templateUrl: './agregarsucursal.component.html',
  styleUrls: ['./agregarsucursal.component.css']
})
export class AgregarSucursalComponent implements OnInit {
  public nombre!: string;
  public direccion!: string;
  public ciudad!: number;
  public ciudades:Ciudad[]=[];
  public addCusForm!: FormGroup;
  wasFormChanged = false;

  constructor(
    private fb: FormBuilder,
    public dialog: MatDialog,
    private snackBar: MatSnackBar,
    private sucursalService: SucursalService,
    private ciudadService: CiudadService
  ) { }

  public ngOnInit(): void {
    this.addCusForm = this.fb.group({
      id: null,
      nombre: [this.nombre, [Validators.required, Validators.pattern('[a-zA-Z]+([a-zA-Z ]+)*')]],
      direccion: [this.nombre, [Validators.required, Validators.pattern('[a-zA-Z]+([a-zA-Z ]+)*')]],
      selCiudad: [this.ciudad, [Validators.required]]
      //lastname: [this.lname, [Validators.required, Validators.pattern('[a-zA-Z]+([a-zA-Z ]+)*')]],
      //email: [null, [Validators.required, Validators.email]],
    });
    this.cargarCiudades()
  }

  changeClient(data : any){
    console.log(data)
    this.ciudad = data;
  }

  closeDialog(): void {
    this.dialog.closeAll();

  }

  formChanged() {
    this.wasFormChanged = true;
  }

  agregarSucursal() {
    let sucursal: Sucursal = new Sucursal();
    sucursal.nombre = this.addCusForm.value.nombre
    sucursal.direccion = this.addCusForm.value.direccion
    sucursal.ciudadesByCiudadesId = new Ciudad()
    sucursal.usuarioCrea = (String(sessionStorage.getItem("email")))
    console.log(this.addCusForm.value)
    sucursal.ciudadesByCiudadesId.id = this.ciudad
    this.sucursalService.agregarSucursal(sucursal)
      .subscribe((sucursal: Sucursal) => {
        this.snackBar.open("Registro agregado");
        this.dialog.closeAll();
      },
        (error: any) => {
          this.snackBar.open("Ocurrió un error creando el registro");
        }
      );

  }

  cargarCiudades() {
    this.ciudadService.listarCiudades()
      .subscribe(
        (ciudadesObtenidas: Ciudad[]) => {
          this.ciudades=ciudadesObtenidas;
          this.ciudadService.setCiudades(this.ciudades);
          if (this.ciudades.length===0) {
            this.snackBar.open("Error: No hay ciudades registradas");
          }
        },
        (error: any)=> {
          this.snackBar.open("Error cargando la lista de ciudades" + error);
        }
      );
  }


}


