import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {RegisterComponent} from './register/register.component'
import {LoginComponent} from './login/login.component'
import {ListComponent} from './list/list.component'
import {ProfileComponent} from './profile/profile.component'
import {UpdateComponent} from './update/update.component'


const routes: Routes = [
  {
  component:RegisterComponent,
  path:'register'
  },
  {
    component: LoginComponent,
    path: 'login'
  },
  {
    component: ListComponent,
    path: 'list'
  },
  {
    component: ProfileComponent,
    path: 'profile/:id'
  },
  {
    component: UpdateComponent,
    path: 'update/:id'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
