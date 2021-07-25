import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import {MatSnackBar} from "@angular/material/snack-bar";
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { Sala } from '../sala.model';
import { SalaService } from '../service/sala-service';
import { AgregarSalaComponent } from './agregarsala.component';

@Component({
  selector: 'app-econocine',
  templateUrl: './salas.component.html',
  styles: [
  ]
})
export class SalasComponent implements OnInit {
  @Input() mensaje!: string | null;
  salas:Sala[] =[];
  isLoading = false;
  displayedColumns = ['id', 'nombre', 'tipo', 'numeroFilas', 'sillasPorFila', 'sucursal', 'usuarioCrea', 'fechaHoraCrea', 'terminalCrea'];
  
  constructor (
    public dialogoCrear: MatDialog,
    private snackBar: MatSnackBar,
    private salaService:SalaService,
    private router:Router,
    private route: ActivatedRoute
    ){}

  ngOnInit(): void {
    this.isLoading = true;
    this.salaService.listarSalas()
    .subscribe(
      (sucursalesObtenidas: Sala[]) => {
        this.salas=sucursalesObtenidas;
        this.salaService.setSalas(this.salas);
        if (this.salas.length===0) {
          this.snackBar.open("Sin registros, presiona el botón + para crear el primero");
        }
        this.isLoading = false;
      },
      (error: any)=> {
        this.isLoading = false;
        this.snackBar.open("Error cargando la gestión de salas" + error.status);
      }
    );
  }

  // Formulario de creación
  abrirDialogoCrear(): void {
    const dialogRef = this.dialogoCrear.open(AgregarSalaComponent,{
      width: '640px',disableClose: true 
    });
    dialogRef.afterClosed().subscribe(result => {
      this.ngOnInit();
    });

  }

}
