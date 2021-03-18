import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './components/general/home/home.component';
import { SimpleComponent } from './components/reservation/simple/simple.component';
import { AboutComponent } from './components/general/about/about.component';
import { AuthGuard } from './services/auth-guard';
import { LoginComponent } from './components/general/login/login.component';
import { UserReservationComponent } from './components/reservation/user-reservation/user-reservation.component';
import { AdminComponent } from './components/reservation/admin/admin.component';
import { AdminGuardService } from './services/admin-guard.service';

const routes: Routes = [
  {
    path: 'home',
    component: HomeComponent,
  },
  {
    path: 'about',
    component: AboutComponent,
  },
  {
    path: 'simple',
    component: SimpleComponent,
    canActivate:[AuthGuard],
  },
  {
    path: 'userReservation',
    component: UserReservationComponent,
    canActivate:[AuthGuard],
  },  
  {
    path: 'admin',
    component: AdminComponent,
    canActivate:[AdminGuardService],
  },  
   {
    path: 'login',
    component: LoginComponent,
  }, 
  {
    path: '',
    redirectTo: '/home',
    pathMatch: 'full'
  },

  {
    path: '**',
    redirectTo: '/home',
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { relativeLinkResolution: 'legacy' })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
