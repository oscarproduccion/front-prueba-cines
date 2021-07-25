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
import { SalaReserva } from '../salaReserva.model';
import { SalaReservaService } from '../service/sala-reserva-service';

@Component({
  selector: 'app-agregar-sala-reserva',
  templateUrl: './agregarsalareserva.component.html',
  styleUrls: ['./agregarsalareserva.component.css']
})
export class AgregarSalaReservaComponent implements OnInit {
  public sucursal!: number;
  public pelicula!: number;
  public peliculaAgenda!: number;
  public sala!: number;
  public valorPago!: number;
  public addCusForm!: FormGroup;
  public sucursales: Sucursal[] = [];
  public peliculas: Pelicula[] = [];
  public peliculaAgendas: PeliculaAgenda[] = [];
  public salas: Sala[] = [];

  wasFormChanged = false;

  constructor(
    private fb: FormBuilder,
    public dialog: MatDialog,
    private snackBar: MatSnackBar,
    private sucursalService: SucursalService,
    private peliculaService: PeliculaService,
    private salaReservaService: SalaReservaService,
    private peliculaAgendaService: PeliculaAgendaService
  ) { }

  public ngOnInit(): void {
    this.addCusForm = this.fb.group({
      valorPago: [this.valorPago],
    });
    this.cargarSucursales()
  }

  changeSucursal(data: any) {
    this.sucursal = data;
    // Consultar las peliculas de la sucursal
    this.peliculaAgendaService.listarPeliculaPorSucursal(this.sucursal)
      .subscribe(
        (peliculasObtenidas: Pelicula[]) => {
          this.peliculas = peliculasObtenidas;
          if (this.peliculas.length === 0) {
            this.snackBar.open("Error no hay peliculas en la sucursal");
          }
        },
        (error: any) => {
          this.snackBar.open("Error cargando la lista de peliculas para la sucursal " + error.status);
        }
      );
  }

  changePelicula(data: any) {
    this.pelicula = data;
    // Consultar las agendas por pelicula
    this.salaReservaService.listarAgendasPorPeliculaSucursal(this.pelicula, this.sucursal)
      .subscribe(
        (peliculasObtenidas: PeliculaAgenda[]) => {
          this.peliculaAgendas = peliculasObtenidas;
          if (this.peliculas.length === 0) {
            this.snackBar.open("Error no hay salas en la sucursal");
          }
        },
        (error: any) => {
          this.snackBar.open("Error cargando la lista de peliculas para la sucursal " + error.status);
        }
      );
  }

  changeAgenda(data: any) {
    this.peliculaAgenda = data;
  }

  closeDialog(): void {
    this.dialog.closeAll();
  }

  formChanged() {
    this.wasFormChanged = true;
  }

  agregarSalaReserva() {
    let salaReserva: SalaReserva = new SalaReserva();
    salaReserva.peliculaAgendasByPeliculaAgendasId = new PeliculaAgenda()
    salaReserva.salasBySalasId = new Sala()
    salaReserva.peliculaAgendasByPeliculaAgendasId.id = this.peliculaAgenda
    salaReserva.salasBySalasId.id = this.sala
    salaReserva.valorPago = this.addCusForm.value.valorPago
    salaReserva.usuarioCrea = (String(sessionStorage.getItem("email")))
    this.salaReservaService.agregarSalaReserva(salaReserva)
      .subscribe((peliculaAgenda: SalaReserva) => {
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
          this.sucursales = sucursalesObtenidas;
          this.sucursalService.setSucursales(this.sucursales);
          if (this.sucursales.length === 0) {
            this.snackBar.open("Error: No hay sucursales registradas");
          }
        },
        (error: any) => {
          this.snackBar.open("Error cargando la lista de registradas");
        }
      );
  }

  cargarPeliculas() {
    this.peliculaService.listarPeliculas()
      .subscribe(
        (peliculasObtenidas: Pelicula[]) => {
          this.peliculas = peliculasObtenidas;
          this.peliculaService.setPeliculas(this.peliculas);
          if (this.sucursales.length === 0) {
            this.snackBar.open("Error: No hay peliculas registradas");
          }
        },
        (error: any) => {
          this.snackBar.open("Error cargando la lista de registradas");
        }
      );
  }


}


