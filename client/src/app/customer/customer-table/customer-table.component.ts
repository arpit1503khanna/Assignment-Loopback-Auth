import { Component, OnInit } from '@angular/core';
import { CustomerService } from 'src/app/customer/customer.service';
import { customerColumnName, customerModel } from 'src/app/customer/customer.model';

@Component({
  selector: 'app-customer-table',
  templateUrl: './customer-table.component.html',
  styleUrls: ['./customer-table.component.css']
})
export class CustomerTableComponent implements OnInit {

  prevArray:string[] = [];
  // @Input ('userdata') userData:UserModel[];
  customerData: customerModel[];
  saveEnable = false;
  header = Object.values(customerColumnName);

  constructor(private customerService: CustomerService) { }

  ngOnInit(): void {
    this.onUpdatedData();
  }

  onUpdatedData(){
    this.customerService.getCustomer().subscribe(newData=>{
      this.customerData = newData;
    });
  }

  onEdit(event:any){
    event.path[0].value = "Save";
    event.path[1].childNodes[1].value = "Cancel";
    for(let j=0;j<event.path[2].cells.length-3;j++){
      event.path[2].cells[j].childNodes[0].disabled = false;
      this.prevArray.push(event.path[2].cells[j].childNodes[0].value);
    }
    this.saveEnable = true
  }
  
  onSave(event:any,data:customerModel){
    this.saveEnable = false;
    let editData: {[key: string]: string}={};
    event.path[0].value = "Edit";
    event.path[1].childNodes[1].value = "Delete";
    let j:number=0;
    for(j=0;j<event.path[2].cells.length-3;j++){
      event.path[2].cells[j].childNodes[0].disabled = true;
      editData[event.path[2].cells[j].childNodes[0].name]=event.path[2].cells[j].childNodes[0].value;
      this.prevArray[j]=event.path[2].cells[j].childNodes[0].value;
    }
    this.customerService.editCustomer(data.id as string,editData).subscribe(_=>{
      this.customerService.getCustomer().subscribe(newData=>{
        this.customerData = newData;
      });
    });

  }

  onCancel(event:any){
    this.saveEnable = false;
    event.path[0].value = "Delete";
    event.path[1].childNodes[0].value = "Edit";
    let j:number=0;
    for(j=0;j<event.path[2].cells.length-3;j++){
      event.path[2].cells[j].childNodes[0].disabled = true;
      event.path[2].cells[j].childNodes[0].value = this.prevArray[j];
    }
  }

  onDelete(selectedUser:customerModel){
    this.customerService.deleteCustomer(selectedUser.id as string).subscribe(_=>{
      this.customerService.getCustomer().subscribe(newData=>{
        this.customerData = newData;
      });
    })
  }

}
