import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { ServicesComponent } from './services/services.component';
import { DetailComponent } from './services/detail/detail.component';
import { ContractComponent } from './contract/contract.component';


const routes: Routes = [
  {
    path: '',
    component: LoginComponent
  },
  {
    path: 'services',
    component: ServicesComponent
  },
  {
    path: 'services/detail/:id',
    component: DetailComponent
  },
  {
    path: 'contract/:id',
    component: ContractComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
