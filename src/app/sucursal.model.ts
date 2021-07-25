import { Ciudad } from "./ciudad.model";

export class Sucursal {
  public id!: number;
  public nombre!: string;
  public direccion!: string;
  public administrador!: number;
  public ciudadesByCiudadesId!: Ciudad;
  public usuarioCrea!: string;
  public fechaHoraCrea!: Date;
  public terminalCrea!: string;

  constructor() { }
}
