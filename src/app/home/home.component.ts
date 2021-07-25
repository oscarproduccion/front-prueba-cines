import { Component, OnInit } from '@angular/core';
import { UsuarioService } from '../service/usuario-service';
import { ActivatedRoute, Router } from '@angular/router';
import { Usuario } from '../usuario.model';

@Component({
  selector: 'app-econocine',
  templateUrl: './usuarios.component.html',
  styles: [
  ]
})
export class UsuariosComponent implements OnInit {
  personas:Usuario[] =[];
  displayedColumns = ['id', 'nombre'];
  constructor (private personaService:UsuarioService,
    private router:Router,
    private route: ActivatedRoute
    ){}

  ngOnInit(): void {
    /*this.personaService.obtenerPersonas()
    .subscribe(
      (personasObtenidas: Persona[]) => {
        this.personas=personasObtenidas;
        this.personaService.setPersonas(this.personas);
        console.log('personas obternidas del subscriber:' + this.personas);
      },
      (error)=> alert('se acabo el mundo la hecatombe: ' + error)
    );
    */
  }

}
