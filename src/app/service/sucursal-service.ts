import { DataService } from './data-service';
import { Injectable } from "@angular/core";
import { Sucursal } from '../sucursal.model';

@Injectable()

export class SucursalService {
  sucursales:Sucursal[]=[];
  constructor (private dataService:DataService){}
  setSucursales(sucursales:Sucursal[]){
    this.sucursales=sucursales;
  }
  listarSucursales(){
    return this.dataService.cargarSucursales();
  }
  agregarSucursal(sucursal: Sucursal){
    return this.dataService.agregarSucursal(sucursal);
  }
  encontrarSucursal(id:number){
    return this.sucursales.find( sucursal => sucursal.id== id);
  }
  modificarSucursal (id:number, ciudad:Sucursal){
    this.dataService.modificarSucursal(id, ciudad);
  }

}
