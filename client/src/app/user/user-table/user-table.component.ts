import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { userColumnName, UserModel } from 'src/app/user/user.model';
import { UserService } from 'src/app/user/user.service';

@Component({
  selector: 'app-user-table',
  templateUrl: './user-table.component.html',
  styleUrls: ['./user-table.component.css']
})
export class UserTableComponent implements OnInit {

  prevArray:string[] = [];
  @Input ('userdata') userData:UserModel[];
  saveEnable = false;
  header = Object.values(userColumnName);

  constructor(private userService: UserService,private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.route.params.subscribe((params: Params) => {
      const id = params['id'];
      if(id){
        this.userService.getSelectedUser(id.toString()).subscribe(user=> {
          console.log(user);
          this.userData = [user];
        });
      }
    });
  }

  onEdit(event:any){
    event.path[0].value = "Save";
    event.path[1].childNodes[1].value = "Cancel";
    for(let j=0;j<event.path[2].cells.length-4;j++){
      event.path[2].cells[j].childNodes[0].disabled = false;
      this.prevArray.push(event.path[2].cells[j].childNodes[0].value);
    }
    this.saveEnable = true
  }
  
  onSave(event:any,data:UserModel){
    this.saveEnable = false;
    let editData: {[key: string]: string|number}={};
    event.path[0].value = "Edit";
    event.path[1].childNodes[1].value = "Delete";
    let j:number=0;
    for(j=0;j<event.path[2].cells.length-4;j++){
      event.path[2].cells[j].childNodes[0].disabled = true;
      editData[event.path[2].cells[j].childNodes[0].name]=event.path[2].cells[j].childNodes[0].value;
      this.prevArray[j]=event.path[2].cells[j].childNodes[0].value;
    }
    editData["phoneNumber"]=+editData["phoneNumber"];
    this.userService.editUser(data.id as string,editData).subscribe(_=>{
    });

  }

  onCancel(event:any){
    this.saveEnable = false;
    event.path[0].value = "Delete";
    event.path[1].childNodes[0].value = "Edit";
    let j:number=0;
    for(j=0;j<event.path[2].cells.length-4;j++){
      event.path[2].cells[j].childNodes[0].disabled = true;
      event.path[2].cells[j].childNodes[0].value = this.prevArray[j];
    }
  }

  onDelete(selectedUser:UserModel){
    this.userService.deleteUser(selectedUser.id as string).subscribe(_=>{
      this.userService.getUsers().subscribe(newData=>{
        this.userData = newData;
      });
    })
  }

}
