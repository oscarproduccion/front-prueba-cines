import { Component, Input, OnInit } from '@angular/core';
import { CiudadService } from '../service/ciudad-service';
import { ActivatedRoute, Router } from '@angular/router';
import { Ciudad } from '../ciudad.model';
import {MatSnackBar} from "@angular/material/snack-bar";
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { AgregarSucursalComponent } from './agregarsucursal.component';
import { Sucursal } from '../sucursal.model';
import { SucursalService } from '../service/sucursal-service';

@Component({
  selector: 'app-econocine',
  templateUrl: './sucursales.component.html',
  styles: [
  ]
})
export class SucursalesComponent implements OnInit {
  @Input() mensaje!: string | null;
  sucursales:Sucursal[] =[];
  isLoading = false;
  displayedColumns = ['id', 'nombre', 'direccion', 'ciudad', 'usuarioCrea', 'fechaHoraCrea', 'terminalCrea'];
  
  constructor (
    public dialogoCrear: MatDialog,
    private snackBar: MatSnackBar,
    private sucursalService:SucursalService,
    private router:Router,
    private route: ActivatedRoute
    ){}

  ngOnInit(): void {
    this.isLoading = true;
    this.sucursalService.listarSucursales()
    .subscribe(
      (sucursalesObtenidas: Sucursal[]) => {
        this.sucursales=sucursalesObtenidas;
        this.sucursalService.setSucursales(this.sucursales);
        if (this.sucursales.length===0) {
          this.snackBar.open("Sin registros, presiona el botón + para crear el primero");
        }
        this.isLoading = false;
      },
      (error: any)=> {
        this.isLoading = false;
        this.snackBar.open("Error cargando la gestión de sucursales" + error.status);
      }
    );
  }

  // Formulario de creación
  abrirDialogoCrear(): void {
    const dialogRef = this.dialogoCrear.open(AgregarSucursalComponent,{
      width: '640px',disableClose: true 
    });
    dialogRef.afterClosed().subscribe(result => {
      this.ngOnInit();
    });

  }

}
