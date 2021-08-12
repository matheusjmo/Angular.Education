import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { AulaComponent } from './aula/aula.component';

const routes: Routes = [
  { path: 'home', component: AppComponent },
  { path: 'aulas', component: AulaComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
