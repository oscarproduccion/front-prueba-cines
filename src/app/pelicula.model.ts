import { PeliculaSucursal } from "./peliculaSucursal.model";
import { Sucursal } from "./sucursal.model";

export class Pelicula {
  public id!: number;
  public nombreOriginal!: string;
  public nombreTraduccion!: number;
  public fechaEstreno!: Date;
  public fechaBaja!: Date;
  public duracion!: number;
  public formato!: string;
  public rutaImagenPortada!: string;
  public usuarioCrea!: String;
  public terminalCrea!: String;
  public fechaHoraCrea!: String;

  constructor() { }
}
