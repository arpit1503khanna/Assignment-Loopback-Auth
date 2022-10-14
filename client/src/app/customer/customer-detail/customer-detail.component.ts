import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { CustomerService } from 'src/app/customer/customer.service';
import { UserModel } from 'src/app/user/user.model';
import { customerModel } from 'src/app/customer/customer.model';

@Component({
  selector: 'app-customer-detail',
  templateUrl: './customer-detail.component.html',
  styleUrls: ['./customer-detail.component.css']
})
export class CustomerDetailComponent implements OnInit {

  customerData: customerModel;
  id: number;
  users: UserModel[]|undefined;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private customerService: CustomerService,
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe((params: Params) => {
      this.id = params['id'];
      this.customerService.getSelectedCustomer(this.id.toString()).subscribe(customer=> {
        this.customerData = customer;
        this.users = customer.users;
      });
    });
  }

}
