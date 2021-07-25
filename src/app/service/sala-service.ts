import { DataService } from './data-service';
import { Injectable } from "@angular/core";
import { Sala } from '../sala.model';
import { TipoSala } from '../tiposala.model';

@Injectable()

export class SalaService {
  salas:Sala[]=[];
  salaTipos:TipoSala[]=[];
  constructor (private dataService:DataService){}
  setSalas(salas:Sala[]){
    this.salas=salas;
  }
  setTipos(tipo:TipoSala[]){
    this.salaTipos=tipo;
  }
  listarSalas(){
    return this.dataService.cargarSala();
  }
  agregarSala(sala: Sala){
    return this.dataService.agregarSala(sala);
  }
  encontrarSala(id:number){
    return this.salas.find( sala => sala.id== id);
  }
  modificarSala (id:number, sala:Sala){
    this.dataService.modificarSala(id, sala);
  }

  listarTipoSalas() {
    return this.dataService.cargarTipoSalas();

  }

}
