import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {environment} from '../environments/environment';
import { role } from './role.model';

@Injectable({
  providedIn: 'root'
})
export class RoleService {

  constructor(private http: HttpClient) { }
    
  getRole(){
    return this.http.get<role[]>(environment.apiURL+'/roles');
  }
  
}
