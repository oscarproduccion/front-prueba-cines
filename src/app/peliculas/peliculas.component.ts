import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import {MatSnackBar} from "@angular/material/snack-bar";
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { AgregarPeliculaComponent } from './agregarpelicula.component';
import { Pelicula } from '../pelicula.model';
import { PeliculaService } from '../service/pelicula-service';

@Component({
  selector: 'app-peliculas',
  templateUrl: './peliculas.component.html',
  styles: [
  ]
})
export class PeliculasComponent implements OnInit {
  @Input() mensaje!: string | null;
  peliculas:Pelicula[] =[];
  isLoading = false;
  displayedColumns = ['id', 'nombreOriginal', 'nombreTraduccion', 'fechaEstreno', 'fechaBaja', 'duracion', 'formato', 'usuarioCrea', 'fechaHoraCrea', 'terminalCrea'];
  
  constructor (
    public dialogoCrear: MatDialog,
    private snackBar: MatSnackBar,
    private peliculaService:PeliculaService,
    private router:Router,
    private route: ActivatedRoute
    ){}

  ngOnInit(): void {
    this.isLoading = true;
    this.peliculaService.listarPeliculas()
    .subscribe(
      (peliculasObtenidas: Pelicula[]) => {
        this.peliculas=peliculasObtenidas;
        this.peliculaService.setPeliculas(this.peliculas);
        if (this.peliculas.length===0) {
          this.snackBar.open("Sin registros, presiona el botón + para crear el primero");
        }
        this.isLoading = false;
      },
      (error: any)=> {
        this.isLoading = false;
        this.snackBar.open("Error cargando la gestión de peliculas" + error.status);
      }
    );
  }

  // Formulario de creación
  abrirDialogoCrear(): void {
    const dialogRef = this.dialogoCrear.open(AgregarPeliculaComponent,{
      width: '960px',disableClose: true 
    });
    dialogRef.afterClosed().subscribe(result => {
      this.ngOnInit();
    });

  }

}
