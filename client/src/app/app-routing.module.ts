import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './auth.guard';
import { CustomerDetailComponent } from './customer/customer-detail/customer-detail.component';
import { CustomerTableComponent } from './customer/customer-table/customer-table.component';
import { CustomerComponent } from './customer/customer.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { UserTableComponent } from './user/user-table/user-table.component';
import { UserComponent } from './user/user.component';

const appRoutes: Routes = [
  {path:'', component: LoginComponent },
  {path:'register',component: RegisterComponent},
  
  {path:'users',
  children:[
    {path:'',component:UserComponent,canActivate:[AuthGuard]},
    {path:":id",component:UserTableComponent,canActivate: [AuthGuard]}
  ]},
  // {path:'users/:id',component:UserTableComponent},


  {path:'customer',component:CustomerComponent,canActivate: [AuthGuard],
  children:[
    {path:'',component:CustomerTableComponent,canActivate: [AuthGuard]},
    {path:':id',component:CustomerDetailComponent,canActivate: [AuthGuard]}
  ]},
  { path: '**', redirectTo: '/users' },
];

@NgModule({
  declarations: [],
  imports: [
    RouterModule.forRoot(appRoutes)
  ],
  exports:[RouterModule]
})
export class AppRoutingModule { }
