import { DataService } from './data-service';
import { Injectable } from "@angular/core";
import { Ciudad } from '../ciudad.model';

@Injectable()

export class CiudadService {
  ciudades:Ciudad[]=[];
  constructor (private dataService:DataService){}
  setCiudades(ciudades:Ciudad[]){
    this.ciudades=ciudades;
  }
  listarCiudades(){
    return this.dataService.cargarCiudades();
  }
  agregarCiudad(ciudad: Ciudad){
    return this.dataService.agregarCiudad(ciudad);
  }
  encontrarCiudad(id:number){
    return this.ciudades.find( ciudad => ciudad.id== id);
  }
  modificarCiudad (id:number, ciudad:Ciudad){
    this.dataService.modificarCiudad(id, ciudad);

  }

}
