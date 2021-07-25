import { DataService } from './service/data-service';
import { UsuarioService } from './service/usuario-service';
import { CiudadService } from './service/ciudad-service';
import { SucursalService } from './service/sucursal-service';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { UsuariosComponent } from './usuarios/usuarios.component';
import { SucursalesComponent } from './sucursales/sucursales.component';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
//Modulos Material
import { AngularMaterialModule } from './angular-material.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { BasicAuthHtppInterceptorService } from './service/basic-auth-interceptor.service';
import { LoginComponent } from './login/login.component';
import { LogoutComponent } from './logout/logout.component';
import { HeaderComponent } from './header/header.component';
import { CiudadesComponent } from './ciudades/ciudades.component';
import { AgregarCiudadComponent } from './ciudades/agregarciudad.component';
import { MAT_SNACK_BAR_DEFAULT_OPTIONS } from '@angular/material/snack-bar';
import { AgregarSucursalComponent } from './sucursales/agregarsucursal.component';
import { AgregarSalaComponent } from './salas/agregarsala.component';
import { SalasComponent } from './salas/salas.component';
import { SalaService } from './service/sala-service';
import { PeliculaService } from './service/pelicula-service';
import { PeliculasComponent } from './peliculas/peliculas.component';
import { AgregarPeliculaComponent } from './peliculas/agregarpelicula.component';
import { PeliculaSucursalService } from './service/pelicula-sucursal-service';
import { PeliculaSucursalesComponent } from './peliculasucursales/peliculasucursales.component';
import { AgregarPeliculaSucursalComponent } from './peliculasucursales/agregarpeliculasucursal.component';
import { PeliculaAgendaService } from './service/pelicula-agenda-service';
import { PeliculaAgendasComponent } from './peliculagendas/peliculaagendas.component';
import { AgregarPeliculaAgendaComponent } from './peliculagendas/agregarpeliculaagenda.component';
import { SalaReservasComponent } from './salareservas/salareservas.component';
import { AgregarSalaReservaComponent } from './salareservas/agregarsalareserva.component';
import { SalaReservaService } from './service/sala-reserva-service';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    UsuariosComponent,
    LogoutComponent,
    HeaderComponent,
    CiudadesComponent,
    AgregarCiudadComponent,
    SucursalesComponent,
    AgregarSucursalComponent,
    SalasComponent,
    AgregarSalaComponent,
    PeliculasComponent,
    AgregarPeliculaComponent,
    PeliculaSucursalesComponent,
    AgregarPeliculaSucursalComponent,
    PeliculaAgendasComponent,
    AgregarPeliculaAgendaComponent,
    SalaReservasComponent,
    AgregarSalaReservaComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    BrowserAnimationsModule,
    AngularMaterialModule,
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [
    UsuarioService, 
    DataService, 
    CiudadService,
    SucursalService,
    SalaService,
    PeliculaService,
    PeliculaSucursalService,
    PeliculaAgendaService,
    SalaReservaService,
    // Configuraciones por defecto
    { provide:HTTP_INTERCEPTORS, useClass:BasicAuthHtppInterceptorService, multi:true
      
    },
    {provide: MAT_SNACK_BAR_DEFAULT_OPTIONS, useValue: {duration: 5000}}
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
