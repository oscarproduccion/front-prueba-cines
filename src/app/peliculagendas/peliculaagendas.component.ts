import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import {MatSnackBar} from "@angular/material/snack-bar";
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { PeliculaSucursal } from '../peliculaSucursal.model';
import { PeliculaSucursalService } from '../service/pelicula-sucursal-service';
import { PeliculaAgenda } from '../peliculaAgenda.model';
import { PeliculaAgendaService } from '../service/pelicula-agenda-service';
import { AgregarPeliculaAgendaComponent } from './agregarpeliculaagenda.component';

@Component({
  selector: 'app-econocine-pelicula-agendas',
  templateUrl: './peliculaagendas.component.html',
  styles: [
  ]
})
export class PeliculaAgendasComponent implements OnInit {
  @Input() mensaje!: string | null;
  peliculaAgendas:PeliculaAgenda[] =[];
  isLoading = false;
  displayedColumns = ['id', 'nombrePelicula', 'nombreSucursal', 'nombreSala','fechaHoraAgenda','usuarioCrea', 'fechaHoraCrea', 'terminalCrea'];
  
  constructor (
    public dialogoCrear: MatDialog,
    private snackBar: MatSnackBar,
    private peliculaAgendaService:PeliculaAgendaService,
    private router:Router,
    private route: ActivatedRoute
    ){}

  ngOnInit(): void {
    this.isLoading = true;
    this.peliculaAgendaService.listarPeliculaAgendas()
    .subscribe(
      (peliculaAgendaObtenidas: PeliculaAgenda[]) => {
        this.peliculaAgendas=peliculaAgendaObtenidas;
        this.peliculaAgendaService.setPeliculaAgendas(this.peliculaAgendas);
        if (this.peliculaAgendas.length===0) {
          this.snackBar.open("Sin registros, presiona el botón + para crear el primero");
        }
        this.isLoading = false;
      },
      (error: any)=> {
        this.isLoading = false;
        console.log(error)
        this.snackBar.open("Error cargando la gestión de agendas " + error.status);
      }
    );
  }

  // Formulario de creación
  abrirDialogoCrear(): void {
    const dialogRef = this.dialogoCrear.open(AgregarPeliculaAgendaComponent,{
      width: '640px',disableClose: true 
    });
    dialogRef.afterClosed().subscribe(result => {
      this.ngOnInit();
    });

  }

}
