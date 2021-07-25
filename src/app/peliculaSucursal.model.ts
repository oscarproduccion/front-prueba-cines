import { Pelicula } from "./pelicula.model";
import { Sucursal } from "./sucursal.model";

export class PeliculaSucursal {
    public id!:number;
    public sucursalesBySucursalesId!:Sucursal;
    public peliculasByPeliculasId!:Pelicula;
    public usuarioCrea!: String;
    public terminalCrea!: String;
    public fechaHoraCrea!: String;

    constructor() { }
}
