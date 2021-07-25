import { Component, OnInit, VERSION, ViewChild } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { SucursalService } from '../service/sucursal-service';
import { Sucursal } from '../sucursal.model';
import { MatSnackBar } from "@angular/material/snack-bar";
import { Sala } from '../sala.model';
import { PeliculaService } from '../service/pelicula-service';
import { Pelicula } from '../pelicula.model';

@Component({
  selector: 'app-agregar-pelicula',
  templateUrl: './agregarpelicula.component.html',
  styleUrls: ['./agregarpelicula.component.css']
})
export class AgregarPeliculaComponent implements OnInit {
  public sucursal!: number;
  public nombreOriginal!: string;
  public nombreTraduccion!: string;
  public fechaEstreno!: string;
  public fechaBaja!: string;
  public duracion!: string;
  public formato!: string;
  public rutaImagenPortada!: string;
  public addCusForm!: FormGroup;
  public sucursales:Sucursal[]=[];

  wasFormChanged = false;

  constructor(
    private fb: FormBuilder,
    public dialog: MatDialog,
    private snackBar: MatSnackBar,
    private sucursalService: SucursalService,
    private peliculaService: PeliculaService
  ) { }

  public ngOnInit(): void {
    this.addCusForm = this.fb.group({
      id: null,
      nombreOriginal: [this.nombreOriginal, [Validators.required, Validators.pattern('[a-zA-Z]+([a-zA-Z ]+)*')]],
      nombreTraduccion: [this.nombreTraduccion, [Validators.required, Validators.pattern('[a-zA-Z]+([a-zA-Z ]+)*')]],
      fechaEstreno: [this.fechaEstreno],
      fechaBaja: [this.fechaBaja],
      duracion: [this.duracion],
      formato: [this.formato],
    });
  }

  changeSucursal(data : any){
    this.sucursal = data;
  }

  closeDialog(): void {
    this.dialog.closeAll();

  }

  formChanged() {
    this.wasFormChanged = true;
  }

  agregarPelicula() {
    let pelicula: Pelicula = new Pelicula();
    pelicula.nombreOriginal = this.addCusForm.value.nombreOriginal
    pelicula.nombreTraduccion = this.addCusForm.value.nombreTraduccion
    pelicula.fechaEstreno = this.addCusForm.value.fechaEstreno
    pelicula.fechaBaja = this.addCusForm.value.fechaBaja
    pelicula.duracion = this.addCusForm.value.duracion
    pelicula.formato = this.addCusForm.value.formato
    pelicula.rutaImagenPortada = this.addCusForm.value.rutaImagenPortada
    pelicula.usuarioCrea = (String(sessionStorage.getItem("email")))
    this.peliculaService.agregarPelicula(pelicula)
      .subscribe((pelicula: Pelicula) => {
        this.snackBar.open("Registro agregado");
        this.dialog.closeAll();
      },
        (error: any) => {
          this.snackBar.open("Ocurrió un error creando el registro");
        }
      );

  }

}


