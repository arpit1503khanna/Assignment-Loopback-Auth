import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import { map } from 'rxjs';
import {environment} from '../../environments/environment';
import { UserModel } from './user.model';
import { CookieService } from 'ngx-cookie';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  userBaseUrl = environment.BASE_URL_USERS;

  constructor(private http: HttpClient, private cookieService: CookieService, private router: Router) { }

  login(credentials: { username: string, password: string }) {

    const credentialsToSend={
      username:credentials.username,
      password:credentials.password
    }
    return this.http.post(`${this.userBaseUrl}/login`, credentialsToSend)
  }

  getUsers(){
    const cookieUserId = this.cookieService.get("id")
    if (!cookieUserId) {
      alert(`Login Required !`)
      this.router.navigateByUrl('')
    }
    return this.http.get<{[key: string]:UserModel}>(this.userBaseUrl,{ 
      headers: { "Authorization": `Bearer ${cookieUserId}` } }).pipe(
      map((responseData)=>{
        const userArray:UserModel[] = [];
        for (const key in responseData){
          if(responseData.hasOwnProperty(key)){
            userArray.push({...responseData[key]});
          }
        }
        return userArray;
      })
    )
  }

  deleteUser(id:string){
    const cookieUserId = this.cookieService.get("id")
    if (!cookieUserId) {
      alert(`Login Required !`)
      this.router.navigateByUrl('')
    }
    return this.http.delete(`${this.userBaseUrl}/${id}`, { headers: { "Authorization": `Bearer ${cookieUserId}` } });
  }

  addUser(userData:UserModel){
    const cookieUserId = this.cookieService.get("id")
    // if (!cookieUserId) {
    //   alert(`Login Required !`)
    //   this.router.navigateByUrl('')
    // }
    return this.http.post(this.userBaseUrl,userData, { headers: { "Authorization": `Bearer ${cookieUserId}` } });
  }

  editUser(id:string,userData:{[key: string]: string|number}){
    const cookieUserId = this.cookieService.get("id")
    if (!cookieUserId) {
      alert(`Login Required !`)
      this.router.navigateByUrl('')
    }
    return this.http.patch(`${this.userBaseUrl}/${id}`,userData, { headers: { "Authorization": `Bearer ${cookieUserId}` } });
  }
  getSelectedUser(id:string){
    const cookieUserId = this.cookieService.get("id")
    if (!cookieUserId) {
      alert(`Login Required !`)
      this.router.navigateByUrl('')
    }
    return this.http.get<UserModel>(`${this.userBaseUrl}/${id}`, { headers: { "Authorization": `Bearer ${cookieUserId}` } });
  }
}
