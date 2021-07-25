import { NgModule, Component } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CiudadesComponent } from './ciudades/ciudades.component';
import { SucursalesComponent } from './sucursales/sucursales.component';
import { LoginComponent } from './login/login.component';
import { LogoutComponent } from './logout/logout.component';
import { AuthGuardService } from './service/auth-guard.service';
import { UsuariosComponent } from './usuarios/usuarios.component';
import { SalasComponent } from './salas/salas.component';
import { PeliculasComponent } from './peliculas/peliculas.component';
import { PeliculaSucursalesComponent } from './peliculasucursales/peliculasucursales.component';
import { PeliculaAgendasComponent } from './peliculagendas/peliculaagendas.component';
import { SalaReservasComponent } from './salareservas/salareservas.component';

// Rutas publicas, rutas privadas y default outlet
const routes: Routes = [
  {path: '', component: UsuariosComponent,canActivate:[AuthGuardService] },
  {path: 'login', component: LoginComponent},
  {path: 'logout', component: LogoutComponent,canActivate:[AuthGuardService] },
  {path: 'ciudades', component: CiudadesComponent,canActivate:[AuthGuardService] },
  {path: 'sucursales', component: SucursalesComponent,canActivate:[AuthGuardService] },
  {path: 'salas', component: SalasComponent,canActivate:[AuthGuardService] },
  {path: 'peliculas', component: PeliculasComponent,canActivate:[AuthGuardService] },
  {path: 'sucursales-peliculas', component: PeliculaSucursalesComponent,canActivate:[AuthGuardService] },
  {path: 'agendas', component: PeliculaAgendasComponent,canActivate:[AuthGuardService] },
  {path: 'reservas', component: SalaReservasComponent,canActivate:[AuthGuardService] },
];


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
