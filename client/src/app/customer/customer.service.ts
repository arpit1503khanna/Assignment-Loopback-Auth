import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie';
import {environment} from '../../environments/environment';
import { customerModel } from './customer.model';

@Injectable({
  providedIn: 'root'
})
export class CustomerService {

  customerBaseUrl = environment.BASE_URL_CUSTOMERS;

  constructor(private http: HttpClient, private cookieService: CookieService, private router: Router) { }

  getCustomer(){
    const cookieUserId = this.cookieService.get("id")
    return this.http.get<customerModel[]>(this.customerBaseUrl, { headers: { "Authorization": `Bearer ${cookieUserId}` } });
  }
  addCustomer(customerData:customerModel){
    const cookieUserId = this.cookieService.get("id")
    if (!cookieUserId) {
      alert(`Login Required !`)
      this.router.navigateByUrl('')
    }
    return this.http.post(this.customerBaseUrl,customerData, { headers: { "Authorization": `Bearer ${cookieUserId}` } });
  }
  deleteCustomer(id:string){
    const cookieUserId = this.cookieService.get("id")
    if (!cookieUserId) {
      alert(`Login Required !`)
      this.router.navigateByUrl('')
    }
    return this.http.delete(`${this.customerBaseUrl}/${id}`, { headers: { "Authorization": `Bearer ${cookieUserId}` } });
  }
  editCustomer(id:string,userData:{[key: string]: string}){
    const cookieUserId = this.cookieService.get("id")
    if (!cookieUserId) {
      alert(`Login Required !`)
      this.router.navigateByUrl('')
    }
    return this.http.patch(`${this.customerBaseUrl}/${id}`,userData, { headers: { "Authorization": `Bearer ${cookieUserId}` } });
  }

  getSelectedCustomer(id:string){
    const cookieUserId = this.cookieService.get("id")
    if (!cookieUserId) {
      alert(`Login Required !`)
      this.router.navigateByUrl('')
    }
    return this.http.get<customerModel>(`${this.customerBaseUrl}/${id}`, { headers: { "Authorization": `Bearer ${cookieUserId}` } });
  }

}
