import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FileDropComponent } from './components/file-drop/file-drop.component';
import { UnauthorizedComponent } from './components/unauthorized/unauthorized.component';
import { HomeComponent } from './components/home/home.component';
import { AuthGuard } from './authguards/authguard.guard';

const routes: Routes = [
  {
    path:'home',
    component:HomeComponent
  },
  {
    path:'files',
    component:FileDropComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'unauthorized',
    component:UnauthorizedComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }