import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie';
import { UserService } from '../user/user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  credentials = {
    username:"",
    password:""
  }
  constructor(private cookieService:CookieService, private userService:UserService,private router: Router) { }

  ngOnInit(): void {
  }
  onSubmit(){
    this.userService.login(this.credentials).subscribe((response:any)=>{
      
    
      this.cookieService.put("id",response.token)
      this.router.navigateByUrl('/users')
     
    }, err=>{
      alert(`Invalid Credentials`)
      console.log(err)
    })
  }
}
