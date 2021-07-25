import { Component, OnInit, VERSION, ViewChild } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { SucursalService } from '../service/sucursal-service';
import { Sucursal } from '../sucursal.model';
import { MatSnackBar } from "@angular/material/snack-bar";
import { Sala } from '../sala.model';
import { TipoSala } from '../tiposala.model';
import { Pelicula } from '../pelicula.model';
import { PeliculaSucursal } from '../peliculaSucursal.model';
import { PeliculaSucursalService } from '../service/pelicula-sucursal-service';
import { PeliculaService } from '../service/pelicula-service';

@Component({
  selector: 'app-agregar-pelicula-sucursal',
  templateUrl: './agregarpeliculasucursal.component.html',
  styleUrls: ['./agregarpeliculasucursal.component.css']
})
export class AgregarPeliculaSucursalComponent implements OnInit {
  public sucursal!: number;
  public pelicula!: number;
  public addCusForm!: FormGroup;
  public sucursales:Sucursal[]=[];
  public peliculas:Pelicula[]=[];

  wasFormChanged = false;

  constructor(
    private fb: FormBuilder,
    public dialog: MatDialog,
    private snackBar: MatSnackBar,
    private sucursalService: SucursalService,
    private peliculaService: PeliculaService,
    private peliculaSucursalService: PeliculaSucursalService
  ) { }

  public ngOnInit(): void {
    this.addCusForm = this.fb.group({});
    this.cargarSucursales()
    this.cargarPeliculas()
  }

  changeSucursal(data : any){
    this.sucursal = data;
  }

  changePelicula(data : any){
    this.pelicula = data;
  }

  closeDialog(): void {
    this.dialog.closeAll();

  }

  formChanged() {
    this.wasFormChanged = true;
  }

  agregarPeliculaSucursal() {
    let peliculaSucursal: PeliculaSucursal = new PeliculaSucursal();
    peliculaSucursal.sucursalesBySucursalesId = new Sucursal()
    peliculaSucursal.peliculasByPeliculasId= new Pelicula()
    peliculaSucursal.sucursalesBySucursalesId.id = this.sucursal
    peliculaSucursal.peliculasByPeliculasId.id = this.pelicula
    peliculaSucursal.usuarioCrea = (String(sessionStorage.getItem("email")))
    this.peliculaSucursalService.agregarPeliculaSucursal(peliculaSucursal)
      .subscribe((peliculaSucursal: PeliculaSucursal) => {
        this.snackBar.open("Registro agregado");
        this.dialog.closeAll();
      },
        (error: any) => {
          this.snackBar.open("Ocurrió un error creando el registro");
        }
      );

  }

  cargarSucursales() {
    this.sucursalService.listarSucursales()
      .subscribe(
        (sucursalesObtenidas: Sucursal[]) => {
          this.sucursales=sucursalesObtenidas;
          this.sucursalService.setSucursales(this.sucursales);
          if (this.sucursales.length===0) {
            this.snackBar.open("Error: No hay sucursales registradas");
          }
        },
        (error: any)=> {
          this.snackBar.open("Error cargando la lista de registradas");
        }
      );
  }

  cargarPeliculas() {
    this.peliculaService.listarPeliculas()
      .subscribe(
        (peliculasObtenidas: Pelicula[]) => {
          this.peliculas=peliculasObtenidas;
          this.peliculaService.setPeliculas(this.peliculas);
          if (this.sucursales.length===0) {
            this.snackBar.open("Error: No hay peliculas registradas");
          }
        },
        (error: any)=> {
          this.snackBar.open("Error cargando la lista de registradas");
        }
      );
  }


}


