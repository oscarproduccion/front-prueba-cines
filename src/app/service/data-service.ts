import { Injectable } from "@angular/core";
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Ciudad } from "../ciudad.model";
import { URL_GUARDAR_AGENDA, URL_GUARDAR_CIUDAD, URL_GUARDAR_PELICULA, URL_GUARDAR_PELICULA_SUCURSAL, URL_GUARDAR_RESERVA, URL_GUARDAR_SALA, URL_GUARDAR_SUCURSAL, URL_LISTAR_AGENDAS, URL_LISTAR_AGENDAS_POR_SUCURSALYPELICULA, URL_LISTAR_CIUDADES, URL_LISTAR_PELICULAS, URL_LISTAR_PELICULAS_POR_SUCURSAL, URL_LISTAR_PELICULA_SUCURSALES, URL_LISTAR_SALA, URL_LISTAR_SALAS_POR_SUCURSAL, URL_LISTAR_SALA_RESERVAS, URL_LISTAR_SUCURSAL, URL_LISTAR_TIPO_SALA, URL_MODIFICAR_CIUDAD, URL_MODIFICAR_PELICULA, URL_MODIFICAR_PELICULA_SUCURSAL, URL_MODIFICAR_SALA, URL_MODIFICAR_SUCURSAL } from "../url.constants";
import { Sucursal } from "../sucursal.model";
import { Sala } from "../sala.model";
import { Pelicula } from "../pelicula.model";
import { PeliculaSucursal } from "../peliculaSucursal.model";
import { PeliculaAgenda } from "../peliculaAgenda.model";
import { SalaReserva } from "../salaReserva.model";

@Injectable()
export class DataService {
  constructor(private httpClient: HttpClient) { }

  // Gestión de Ciudades
  cargarCiudades() {
    return this.httpClient.get<Ciudad[]>(URL_LISTAR_CIUDADES);
  }

  agregarCiudad(ciudad: Ciudad) {
    return this.httpClient.post<Ciudad>(URL_GUARDAR_CIUDAD, ciudad);

  }

  modificarCiudad(id: number, ciudad: Ciudad) {
    let url: string;
    url = URL_MODIFICAR_CIUDAD + '/' + id;
    this.httpClient.put(url, ciudad)
      .subscribe(
        (response) => {
        },
        (error) => console.log('error en modificar ciudad: ' + error)

      );
  }

  //TODO: Agregar funcionalidad de eliminar

  // Gestión de sucursales
  cargarSucursales() {
    return this.httpClient.get<Sucursal[]>(URL_LISTAR_SUCURSAL);
  }

  agregarSucursal(sucursal: Sucursal) {
    return this.httpClient.post<Sucursal>(URL_GUARDAR_SUCURSAL, sucursal);

  }

  modificarSucursal(id: number, sucursal: Sucursal) {
    let url: string;
    url = URL_MODIFICAR_SUCURSAL + '/' + id;
    this.httpClient.put(url, sucursal)
      .subscribe(
        (response) => {
        },
        (error) => console.log('error en modificar sucursal: ' + error)

      );
  }

  // Gestión de salas
  cargarSala() {
    return this.httpClient.get<Sala[]>(URL_LISTAR_SALA);
  }

  cargarTipoSalas() {
    return this.httpClient.get<Sala[]>(URL_LISTAR_TIPO_SALA);
  }

  agregarSala(sala: Sala) {
    return this.httpClient.post<Sala>(URL_GUARDAR_SALA, sala);

  }

  modificarSala(id: number, sala: Sala) {
    let url: string;
    url = URL_MODIFICAR_SALA + '/' + id;
    this.httpClient.put(url, sala)
      .subscribe(
        (response) => {
        },
        (error) => console.log('error en modificar sala: ' + error)

      );
  }

  // Gestión de peliculas
  cargarPeliculas() {
    return this.httpClient.get<Pelicula[]>(URL_LISTAR_PELICULAS);
  }

  agregarPelicula(pelicula: Pelicula) {
    return this.httpClient.post<Pelicula>(URL_GUARDAR_PELICULA, pelicula);

  }

  modificarPelicula(id: number, pelicula: Pelicula) {
    let url: string;
    url = URL_MODIFICAR_PELICULA + '/' + id;
    this.httpClient.put(url, pelicula)
      .subscribe(
        (response) => {
        },
        (error) => console.log('error en modificar pelicula: ' + error)

      );
  }

  // Gestión peliculas y sucursales
  cargarPeliculaSucursales() {
    return this.httpClient.get<PeliculaSucursal[]>(URL_LISTAR_PELICULA_SUCURSALES);
  }

  agregarPeliculaSucursal(peliculaSucursal: PeliculaSucursal) {
    return this.httpClient.post<PeliculaSucursal>(URL_GUARDAR_PELICULA_SUCURSAL, peliculaSucursal);

  }

  modificarPeliculaSucursal(id: number, peliculaSucursal: PeliculaSucursal) {
    let url: string;
    url = URL_MODIFICAR_PELICULA_SUCURSAL + '/' + id;
    this.httpClient.put(url, peliculaSucursal)
      .subscribe(
        (response) => {
        },
        (error) => console.log('error en modificar pelicula sucursal: ' + error)

      );
  }

  // Gestión de agenda peliculas y sala
  cargarPeliculaAgendas() {
    return this.httpClient.get<PeliculaAgenda[]>(URL_LISTAR_AGENDAS);
  }

  agregarPeliculaAgenda(peliculaAgenda: PeliculaAgenda) {
    return this.httpClient.post<PeliculaAgenda>(URL_GUARDAR_AGENDA, peliculaAgenda);
  }


  cargarSalasPorSucursal(id: number) {
    return this.httpClient.get<Sala[]>(URL_LISTAR_SALAS_POR_SUCURSAL + "?sucursalId=" + id);

  }

  cargarPeliculasPorSucursal(id: number) {
    return this.httpClient.get<Pelicula[]>(URL_LISTAR_PELICULAS_POR_SUCURSAL + "?sucursalId=" + id);
  }

  // Gestión de reserva de salas
  cargarSalaReservas() {
    return this.httpClient.get<SalaReserva[]>(URL_LISTAR_SALA_RESERVAS);
  }

  agregarSalaReservas(salaReserva: SalaReserva) {
    return this.httpClient.post<SalaReserva>(URL_GUARDAR_RESERVA, salaReserva);
  }

  cargarAgendaPorSucursalPelicula(idPelicula: number,idSucursal: number) {
    return this.httpClient.get<PeliculaAgenda[]>(URL_LISTAR_AGENDAS_POR_SUCURSALYPELICULA + "?peliculaId=" + idPelicula + "&sucursalId=" +idSucursal);
  }

}

