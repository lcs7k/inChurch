import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './guard/auth.guard';

const routes: Routes = [
  {
    path: '',
    loadComponent: () => import("./event-list/event-list.component").then(m => m.EventListComponent),
    canActivate:[AuthGuard]
  },
  {
    path: 'edit/:id',
    loadComponent: () => import("./event-edit/event-edit.component").then(m => m.EventEditComponent),
    canActivate:[AuthGuard]
  },
  {
    path: 'login',
    loadComponent: () => import("./login/login.component").then(m => m.LoginComponent)
  }
];


@NgModule({
  imports: [RouterModule.forRoot(routes, {bindToComponentInputs: true})],
  exports: [RouterModule]
})
export class AppRoutingModule { }
