import { Sucursal } from "./sucursal.model";
import { TipoSala } from "./tiposala.model";

export class Sala {
    public id!:number;
    public nombre!: string;
    public numeroFilas!: number;
    public numeroSillasFila!:number;
    public usuarioCrea!: String;
    public terminalCrea!: String;
    public fechaHoraCrea!: String;
    public salaTiposByTipoSalaId!: TipoSala;
    public sucursalesBySucursalesId!: Sucursal;

  constructor() { }
}
