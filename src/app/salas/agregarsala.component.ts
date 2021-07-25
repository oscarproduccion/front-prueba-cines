import { Component, OnInit, VERSION, ViewChild } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { SucursalService } from '../service/sucursal-service';
import { Sucursal } from '../sucursal.model';
import { MatSnackBar } from "@angular/material/snack-bar";
import { Sala } from '../sala.model';
import { SalaService } from '../service/sala-service';
import { TipoSala } from '../tiposala.model';
import { Silla } from '../silla.model';

@Component({
  selector: 'app-agregar-sala',
  templateUrl: './agregarsala.component.html',
  styleUrls: ['./agregarsala.component.css']
})
export class AgregarSalaComponent implements OnInit {
  public sucursal!: number;
  public tipo!: number;
  public nombre!: string;
  public numeroFilas!: number;
  public sillasPorFila!: number;
  public direccion!: string;
  public addCusForm!: FormGroup;
  public sucursales: Sucursal[] = [];
  public tipos: TipoSala[] = [];
  public sillas: Silla[] = [];
  public width!: number;

  wasFormChanged = false;

  constructor(
    private fb: FormBuilder,
    public dialog: MatDialog,
    private snackBar: MatSnackBar,
    private sucursalService: SucursalService,
    private salaService: SalaService
  ) { }

  public ngOnInit(): void {
    this.addCusForm = this.fb.group({
      id: null,
      nombre: [this.nombre, [Validators.required, Validators.pattern('[a-zA-Z]+([a-zA-Z ]+)*')]],
      numeroFilas: [this.numeroFilas, [Validators.required, Validators.pattern('[0-9]*')]],
      sillasPorFila: [this.sillasPorFila, [Validators.required, Validators.pattern('[0-9]*')]],
    });
    this.cargarSucursales()
    this.cargarTipos()
  }

  changeClient(data: any) {
    this.sucursal = data;
  }

  changeTipo(data: any) {
    this.tipo = data;
  }

  closeDialog(): void {
    this.dialog.closeAll();

  }

  formChanged() {
    this.wasFormChanged = true;
  }

  agregarSala() {
    let sala: Sala = new Sala();
    sala.nombre = this.addCusForm.value.nombre
    sala.numeroFilas = this.addCusForm.value.numeroFilas
    sala.numeroSillasFila = this.addCusForm.value.sillasPorFila
    sala.usuarioCrea = (String(sessionStorage.getItem("email")))
    sala.sucursalesBySucursalesId = new Sucursal()
    sala.sucursalesBySucursalesId.id = this.sucursal
    sala.salaTiposByTipoSalaId = new TipoSala
    sala.salaTiposByTipoSalaId.id = this.tipo
    this.salaService.agregarSala(sala)
      .subscribe((sala: Sala) => {
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

  cargarTipos() {
    this.salaService.listarTipoSalas()
      .subscribe(
        (tiposObtenidas: TipoSala[]) => {
          this.tipos = tiposObtenidas;
          this.salaService.setTipos(this.tipos);
          if (this.sucursales.length === 0) {
            this.snackBar.open("Error: No hay sucursales registradas");
          }
        },
        (error: any) => {
          this.snackBar.open("Error cargando la lista de registradas");
        }
      );
  }

  //Crea un arreglo con las sillas
  previsualizarSala() {
    this.sillas = [];
    let sillasPorFila: number = this.addCusForm.value.sillasPorFila
    let filas: number = this.addCusForm.value.numeroFilas
    if (sillasPorFila === null || filas === null) {
      this.snackBar.open("Debe ingresar el número de filas y sillas para ver la distrubición");
      return;
    }
    if (sillasPorFila > 10) {
      this.snackBar.open("El número máximo de sillas por fila es 10");
      return;
    }
    if (filas > 27) {
      this.snackBar.open("El número máximo de filas es 27");
      return;
    }
    //Calcular el ancho maximo 10 columnas
    this.width = 95 / sillasPorFila
    //Crear las sillas por cada fila 
    for (let i = 1; i <= filas; i++) {
      console.log(filas + " " + sillasPorFila)
      for (let x = 1; x <= sillasPorFila; x++) {
        let silla: Silla = new Silla();
        silla.fila = i;
        silla.identificador = this.getLetraFila(i) + "-" + x
        silla.posicion = x
        this.sillas.push(silla)
      }
    }
  }

  // Convierte un número de fila a su respectiva letra
  getLetraFila(fila: number) {
    switch (fila) {
      case 1:
        return "A";
      case 2:
        return "B";
      case 3:
        return "C";
      case 4:
        return "D";
      case 5:
        return "E";
      case 6:
        return "F";
      case 7:
        return "G";
      case 8:
        return "H";
      case 9:
        return "I";
      case 10:
        return "J";
      case 11:
        return "K";
      case 12:
        return "L";
      case 13:
        return "M";
      case 14:
        return "N";
      case 15:
        return "O";
      case 16:
        return "P";
      case 17:
        return "Q";
      case 18:
        return "R";
      case 19:
        return "S";
      case 20:
        return "T";
      case 21:
        return "U";
      case 22:
        return "V";
      case 23:
        return "W";
      case 24:
        return "X";
      case 25:
        return "Y";
      case 26:
        return "Z";
      case 27:
        return "ZZ";
      default:
        break;
    }
    return ""
  }

  validarFinFila(fila: number) {
    console.log("valida fila" + this)
    if (fila % this.addCusForm.value.sillasPorFila === 0) {
      return true;
    } else {
      return false;
    }
  }

}


