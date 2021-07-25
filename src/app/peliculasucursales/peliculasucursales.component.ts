import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import {MatSnackBar} from "@angular/material/snack-bar";
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { PeliculaSucursal } from '../peliculaSucursal.model';
import { PeliculaSucursalService } from '../service/pelicula-sucursal-service';
import { AgregarPeliculaSucursalComponent } from './agregarpeliculasucursal.component';

@Component({
  selector: 'app-econocine-pelicula-sucursales',
  templateUrl: './peliculasucursales.component.html',
  styles: [
  ]
})
export class PeliculaSucursalesComponent implements OnInit {
  @Input() mensaje!: string | null;
  peliculaSucursales:PeliculaSucursal[] =[];
  isLoading = false;
  displayedColumns = ['id', 'nombrePelicula', 'nombreSucursal', 'usuarioCrea', 'fechaHoraCrea', 'terminalCrea'];
  
  constructor (
    public dialogoCrear: MatDialog,
    private snackBar: MatSnackBar,
    private peliculaSucursalService:PeliculaSucursalService,
    private router:Router,
    private route: ActivatedRoute
    ){}

  ngOnInit(): void {
    this.isLoading = true;
    this.peliculaSucursalService.listarPeliculaSucursales()
    .subscribe(
      (peliculaSucursalObtenidas: PeliculaSucursal[]) => {
        this.peliculaSucursales=peliculaSucursalObtenidas;
        this.peliculaSucursalService.setPeliculaSucursales(this.peliculaSucursales);
        if (this.peliculaSucursales.length===0) {
          this.snackBar.open("Sin registros, presiona el botón + para crear el primero");
        }
        this.isLoading = false;
      },
      (error: any)=> {
        this.isLoading = false;
        this.snackBar.open("Error cargando la gestión de peliculas y sucursales" + error.status);
      }
    );
  }

  // Formulario de creación
  abrirDialogoCrear(): void {
    const dialogRef = this.dialogoCrear.open(AgregarPeliculaSucursalComponent,{
      width: '640px',disableClose: true 
    });
    dialogRef.afterClosed().subscribe(result => {
      this.ngOnInit();
    });

  }

}
