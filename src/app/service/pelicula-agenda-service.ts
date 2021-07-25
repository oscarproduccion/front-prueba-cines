import { DataService } from './data-service';
import { Injectable } from "@angular/core";
import { PeliculaAgenda } from '../peliculaAgenda.model';

@Injectable()

export class PeliculaAgendaService {
  peliculaAgendas:PeliculaAgenda[]=[];
  constructor (private dataService:DataService){}
  setPeliculaAgendas(peliculaAgendas:PeliculaAgenda[]){
    this.peliculaAgendas=peliculaAgendas;
  }
  listarPeliculaAgendas(){
    return this.dataService.cargarPeliculaAgendas();
  }
  listarPeliculaPorSucursal(id:number){
    return this.dataService.cargarPeliculasPorSucursal(id);
  }
  listarSalasPorSucursal(id:number){
    return this.dataService.cargarSalasPorSucursal(id);
  }
  agregarPeliculaAgenda(peliculaAgenda: PeliculaAgenda){
    return this.dataService.agregarPeliculaAgenda(peliculaAgenda);
  }
  encontrarPeliculaAgenda(id:number){
    return this.peliculaAgendas.find( peliculaAgenda => peliculaAgenda.id== id);
  }

}
