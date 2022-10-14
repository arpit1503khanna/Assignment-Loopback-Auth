import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule} from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { DateformatPipe } from './dateformat.pipe';
import { CustomerComponent } from './customer/customer.component';
import { UserComponent } from './user/user.component';
import { UserTableComponent } from './user/user-table/user-table.component';
import {UserAddComponent} from './user/user-add/user-add.component';
import {AppRoutingModule} from './app-routing.module';
import { CustomerAddComponent } from './customer/customer-add/customer-add.component';
import { CustomerDetailComponent } from './customer/customer-detail/customer-detail.component';
import { CustomerTableComponent } from './customer/customer-table/customer-table.component';
import { LoginComponent } from './login/login.component';
import { CookieModule } from 'ngx-cookie';
import { RegisterComponent } from './register/register.component';

@NgModule({
  declarations: [
    AppComponent,
    UserAddComponent,
    DateformatPipe,
    CustomerComponent,
    UserComponent,
    UserTableComponent,
    CustomerAddComponent,
    CustomerDetailComponent,
    CustomerTableComponent,
    LoginComponent,
    RegisterComponent
  ],
  imports: [
    BrowserModule,
    ReactiveFormsModule,
    HttpClientModule,
    AppRoutingModule,
    FormsModule,
    CookieModule.withOptions(),
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
