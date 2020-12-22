import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ListaPaisesComponent } from './public/lista-paises/lista-paises.component'
const routes: Routes = [
  { path: '', component: ListaPaisesComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
