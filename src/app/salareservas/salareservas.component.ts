import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import {MatSnackBar} from "@angular/material/snack-bar";
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { SalaReserva } from '../salaReserva.model';
import { SalaReservaService } from '../service/sala-reserva-service';
import { AgregarSalaReservaComponent } from './agregarsalareserva.component';

@Component({
  selector: 'app-econocine-sala-reservas',
  templateUrl: './salareservas.component.html',
  styles: [
  ]
})
export class SalaReservasComponent implements OnInit {
  @Input() mensaje!: string | null;
  salaReservas:SalaReserva[] =[];
  isLoading = false;
  displayedColumns = ['id', 'nombreSala', 'nombrePelicula', 'nombreSucursal','fechaHoraAgenda','fila','silla', 'usuarioCrea', 'fechaHoraCrea', 'terminalCrea'];
  
  constructor (
    public dialogoCrear: MatDialog,
    private snackBar: MatSnackBar,
    private salaReservaService:SalaReservaService,
    private router:Router,
    private route: ActivatedRoute
    ){}

  ngOnInit(): void {
    this.isLoading = true;
    this.salaReservaService.listarSalaReservas()
    .subscribe(
      (salaReservaObtenidas: SalaReserva[]) => {
        this.salaReservas=salaReservaObtenidas;
        this.salaReservaService.setSalaReservas(this.salaReservas);
        if (this.salaReservas.length===0) {
          this.snackBar.open("Sin registros, presiona el botón + para crear el primero");
        }
        this.isLoading = false;
      },
      (error: any)=> {
        this.isLoading = false;
        console.log(error)
        this.snackBar.open("Error cargando la gestión de reservas " + error.status);
      }
    );
  }

  // Formulario de creación
  abrirDialogoCrear(): void {
    const dialogRef = this.dialogoCrear.open(AgregarSalaReservaComponent,{
      width: '640px',disableClose: true 
    });
    dialogRef.afterClosed().subscribe(result => {
      this.ngOnInit();
    });

  }

}


