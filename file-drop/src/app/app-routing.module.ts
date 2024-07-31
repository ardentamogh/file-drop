import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FileDropComponent } from './components/file-drop/file-drop.component';
import { UnauthorizedComponent } from './components/unauthorized/unauthorized.component';

const routes: Routes = [
  {
    path:'files',
    component:FileDropComponent
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