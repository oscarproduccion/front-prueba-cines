import { DataService } from './data-service';
import { Injectable } from "@angular/core";
import { Pelicula } from '../pelicula.model';

@Injectable()

export class PeliculaService {
  peliculas:Pelicula[]=[];
  constructor (private dataService:DataService){}
  setPeliculas(peliculas:Pelicula[]){
    this.peliculas=peliculas;
  }
  listarPeliculas(){
    return this.dataService.cargarPeliculas();
  }
  agregarPelicula(pelicula: Pelicula){
    return this.dataService.agregarPelicula(pelicula);
  }
  encontrarPelicula(id:number){
    return this.peliculas.find( pelicula => pelicula.id== id);
  }
  modificarPelicula (id:number, pelicula:Pelicula){
    this.dataService.modificarPelicula(id, pelicula);
  }

  listarTipoSalas() {
    return this.dataService.cargarTipoSalas();

  }

}
