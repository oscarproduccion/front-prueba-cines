import { DataService } from './data-service';
import { Injectable } from "@angular/core";
import { PeliculaSucursal } from '../peliculaSucursal.model';

@Injectable()

export class PeliculaSucursalService {
  peliculaSucursales:PeliculaSucursal[]=[];
  constructor (private dataService:DataService){}
  setPeliculaSucursales(peliculaSucursales:PeliculaSucursal[]){
    this.peliculaSucursales=peliculaSucursales;
  }
  listarPeliculaSucursales(){
    return this.dataService.cargarPeliculaSucursales();
  }
  agregarPeliculaSucursal(peliculaSucursal: PeliculaSucursal){
    return this.dataService.agregarPeliculaSucursal(peliculaSucursal);
  }
  encontrarPeliculaSucursal(id:number){
    return this.peliculaSucursales.find( peliculaSucursal => peliculaSucursal.id== id);
  }
  modificarPelicula (id:number, peliculaSucursal:PeliculaSucursal){
    this.dataService.modificarPeliculaSucursal(id, peliculaSucursal);
  }

}
