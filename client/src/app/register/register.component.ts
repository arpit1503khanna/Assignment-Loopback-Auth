import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { customerModel } from '../customer/customer.model';
import { CustomerService } from '../customer/customer.service';
import { role } from '../role.model';
import { RoleService } from '../role.service';
import { UserService } from '../user/user.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  Roles :role[];
  addUserForm: FormGroup;
  customers: customerModel[];

  constructor(private userService: UserService, private router:Router,private customerService:CustomerService,private roleService: RoleService) {
  
  }

  ngOnInit(): void {
    this.customerService.getCustomer().subscribe(newData=>{
      this.customers = newData;
    });
    this.roleService.getRole().subscribe(newData=>{
      this.Roles = newData;
    });
    this.addUserForm = new FormGroup({
      'firstName': new FormControl(null,[Validators.required,Validators.minLength(3)]),
      'middleName':new FormControl(''),
      'lastName':new FormControl(null,[Validators.required,Validators.minLength(3)]),
      'email':new FormControl(null,[Validators.required,Validators.email]),
      'phoneNumber':new FormControl(null,[Validators.required]),
      'customerId':new FormControl(null,[Validators.required]),
      'rolekey':new FormControl(null,[Validators.required]),
      'username':new FormControl(null,[Validators.required, Validators.minLength(3)]),
      'password':new FormControl(null,[Validators.required, Validators.minLength(8)]),
      'address':new FormControl(null,[Validators.required])
    })
  }
  onSubmit() {
    console.log(this.addUserForm.value);
    this.userService.addUser(this.addUserForm.value).subscribe((response:any) => {
      console.log(response)
      alert(`\nNew User created Successfully ! Log in to see Changes !`)
      this.router.navigateByUrl('/');
    }, error => {
      alert("USER NAME ALREADY EXISTS or Internet Server Error");

    })
  }
  display(item: any) {
    if (Number.isInteger(item.value))
      return true;
    else
      return false;
  }

}
