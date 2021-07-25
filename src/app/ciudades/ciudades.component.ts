import { Component, Input, OnInit } from '@angular/core';
import { CiudadService } from '../service/ciudad-service';
import { ActivatedRoute, Router } from '@angular/router';
import { Ciudad } from '../ciudad.model';
import {MatSnackBar} from "@angular/material/snack-bar";
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { AgregarCiudadComponent } from './agregarciudad.component';

@Component({
  selector: 'app-econocine',
  templateUrl: './ciudades.component.html',
  styles: [
  ]
})
export class CiudadesComponent implements OnInit {
  @Input() mensaje!: string | null;
  ciudades:Ciudad[] =[];
  isLoading = false;
  displayedColumns = ['id', 'nombre', 'usuarioCrea', 'fechaHoraCrea', 'terminalCrea'];
  
  constructor (
    public dialogoCrear: MatDialog,
    private snackBar: MatSnackBar,
    private ciudadService:CiudadService,
    private router:Router,
    private route: ActivatedRoute
    ){}

  ngOnInit(): void {
    this.isLoading = true;
    this.ciudadService.listarCiudades()
    .subscribe(
      (ciudadesObtenidas: Ciudad[]) => {
        this.ciudades=ciudadesObtenidas;
        this.ciudadService.setCiudades(this.ciudades);
        if (this.ciudades.length===0) {
          this.snackBar.open("Sin registros, presiona el botón + para crear el primero");
        }
        this.isLoading = false;
      },
      (error: any)=> {
        this.isLoading = false;
      }
    );
  }

  // Formulario de creación
  abrirDialogoCrear(): void {
    const dialogRef = this.dialogoCrear.open(AgregarCiudadComponent,{
      width: '640px',disableClose: true 
    });
    dialogRef.afterClosed().subscribe(result => {
      this.ngOnInit();
    });

  }

}
