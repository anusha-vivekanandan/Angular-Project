import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DashboardModule } from './modules/dashboard/dashboard.module';
import { AuthModule } from './modules/auth/auth.module';


const routes: Routes = [
  {
    path: 'auth',
    loadChildren: () => AuthModule,
  },
  {
    path: 'dashboard/:id',
    loadChildren: () => DashboardModule,
  },

  {
    path: '', redirectTo: '/auth/login', pathMatch: 'full'
  },

];

@NgModule({
  imports: [ RouterModule.forRoot(routes) ],
  exports: [ RouterModule ]
})
export class AppRoutingModule { }
