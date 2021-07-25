import { Pelicula } from "./pelicula.model";
import { Sala } from "./sala.model";
import { Sucursal } from "./sucursal.model";

export class PeliculaAgenda {
    public id!:number;
    public sucursalesBySucursalesId!:Sucursal;
    public peliculasByPeliculasId!:Pelicula;
    public salasBySalasId!:Sala;
    public fechaHoraAgenda!:Date;
    public usuarioCrea!: String;
    public terminalCrea!: String;
    public fechaHoraCrea!: String;

    constructor() { }
}
