import { Pelicula } from "./pelicula.model";
import { PeliculaAgenda } from "./peliculaAgenda.model";
import { Sala } from "./sala.model";
import { Sucursal } from "./sucursal.model";
import { Usuario } from "./usuario.model";

export class SalaReserva {
    public id!:number;
    public peliculaAgendasByPeliculaAgendasId!:PeliculaAgenda;
    public salasBySalasId!:Sala;
    public usuariosByUsuarioId!:Usuario;
    public fechaHoraAgenda!:Date;
    public valorPago!:number
    public fila!:number
    public silla!:number
    public pagado!:boolean
    public usuarioCrea!: String;
    public terminalCrea!: String;
    public fechaHoraCrea!: String;

    constructor() { }
}
