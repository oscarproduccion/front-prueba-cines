import { DataService } from './data-service';
import { Injectable } from "@angular/core";
import { SalaReserva } from '../salaReserva.model';

@Injectable()

export class SalaReservaService {
  salaReservas:SalaReserva[]=[];
  constructor (private dataService:DataService){}
  setSalaReservas(salaReservas:SalaReserva[]){
    this.salaReservas=salaReservas;
  }
  listarSalaReservas(){
    return this.dataService.cargarSalaReservas();
  }

  listarAgendasPorPeliculaSucursal(idPelicula: number,idSucursal: number){
    return this.dataService.cargarAgendaPorSucursalPelicula(idPelicula, idSucursal);
  }

  agregarSalaReserva(salaReserva: SalaReserva){
    return this.dataService.agregarSalaReservas(salaReserva);
  }

}
