import { DataService } from './data-service';
import { Injectable } from "@angular/core";

@Injectable()

export class UsuarioService {
  //personas:Usuario[]=[];
  constructor (private dataService:DataService){}
  /*setPersonas(personas:Persona[]){
    this.personas=personas;
  }
  obtenerUsuarios(){
    return this.dataService.cargarPersonas();
  }
  agregarPersona(persona: Persona){
    console.log ('Persona a agregar: ' +persona.nombre);
    this.dataService.agregarPersona(persona)
    .subscribe((persona: Persona) => {
        console.log('la persona se ha agregado: ' +persona.idPersona);
        this.personas.push(persona);
      }
    );
  }
  encontrarPersona(id:number){
    return this.personas.find( persona => persona.idPersona == id);
  }
  modificarPersona (id:number, persona:Persona){
    console.log ('persona a modificar: ' +persona.idPersona);
    this.dataService.modificarPersona(id, persona);

  }
  eliminarPersona(id:number){
    console.log('eliminar persona con id: ' +id);
    const index= this.personas.findIndex(persona=> persona.idPersona == id);
    this.personas.splice (index,1);
    this.dataService.eliminarPersona(id);
  }
  */
}
