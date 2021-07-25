import { Component, OnInit, VERSION, ViewChild } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { SucursalService } from '../service/sucursal-service';
import { Sucursal } from '../sucursal.model';
import { MatSnackBar } from "@angular/material/snack-bar";
import { Sala } from '../sala.model';
import { Pelicula } from '../pelicula.model';
import { PeliculaService } from '../service/pelicula-service';
import { PeliculaAgenda } from '../peliculaAgenda.model';
import { PeliculaAgendaService } from '../service/pelicula-agenda-service';

@Component({
  selector: 'app-agregar-pelicula-sucursal',
  templateUrl: './agregarpeliculaagenda.component.html',
  styleUrls: ['./agregarpeliculaagenda.component.css']
})
export class AgregarPeliculaAgendaComponent implements OnInit {
  public sucursal!: number;
  public pelicula!: number;
  public sala!: number;
  public fechaHoraAgenda!: Date;
  public addCusForm!: FormGroup;
  public sucursales:Sucursal[]=[];
  public peliculas:Pelicula[]=[];
  public salas:Sala[]=[];

  wasFormChanged = false;

  constructor(
    private fb: FormBuilder,
    public dialog: MatDialog,
    private snackBar: MatSnackBar,
    private sucursalService: SucursalService,
    private peliculaService: PeliculaService,
    private peliculaAgendaService: PeliculaAgendaService
  ) { }

  public ngOnInit(): void {
    this.addCusForm = this.fb.group({
      fechaHoraAgenda: [this.fechaHoraAgenda],
    });
    this.cargarSucursales()
  }

  changeSucursal(data : any){
    this.sucursal = data;
    // Consultar las peliculas de la sucursal
    this.peliculaAgendaService.listarPeliculaPorSucursal(this.sucursal)
    .subscribe(
      (peliculasObtenidas: Pelicula[]) => {
        this.peliculas=peliculasObtenidas;
        if (this.peliculas.length===0) {
          this.snackBar.open("Error no hay peliculas en la sucursal");
        }
      },
      (error: any)=> {
        this.snackBar.open("Error cargando la lista de peliculas para la sucursal " + error.status);
      }
    );
    // Consultar las salas de la sucursal
    this.peliculaAgendaService.listarSalasPorSucursal(this.sucursal)
    .subscribe(
      (salasObtenidas: Sala[]) => {
        this.salas=salasObtenidas;
        if (this.peliculas.length===0) {
          this.snackBar.open("Error no hay salas en la sucursal");
        }
      },
      (error: any)=> {
        this.snackBar.open("Error cargando la lista de peliculas para la sucursal " + error.status);
      }
    );
  }

  changePelicula(data : any){
    this.pelicula = data;
  }

  changeSala(data : any){
    this.sala = data;
  }

  closeDialog(): void {
    this.dialog.closeAll();
  }

  formChanged() {
    this.wasFormChanged = true;
  }

  agregarPeliculaAgenda() {
    let peliculaAgenda: PeliculaAgenda = new PeliculaAgenda();
    peliculaAgenda.sucursalesBySucursalesId = new Sucursal()
    peliculaAgenda.peliculasByPeliculasId= new Pelicula()
    peliculaAgenda.salasBySalasId= new Sala()
    peliculaAgenda.sucursalesBySucursalesId.id = this.sucursal
    peliculaAgenda.peliculasByPeliculasId.id = this.pelicula
    peliculaAgenda.salasBySalasId.id = this.sala
    peliculaAgenda.fechaHoraAgenda = this.addCusForm.value.fechaHoraAgenda
    peliculaAgenda.usuarioCrea = (String(sessionStorage.getItem("email")))
    this.peliculaAgendaService.agregarPeliculaAgenda(peliculaAgenda)
      .subscribe((peliculaAgenda: PeliculaAgenda) => {
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


