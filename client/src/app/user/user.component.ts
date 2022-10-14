import { Component} from '@angular/core';
import { UserModel } from 'src/app/user/user.model';
import { UserService } from 'src/app/user/user.service';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent{

  userData: UserModel[] = [];
  loadButton="Load Data";
  showTable = false;

  constructor(private userService: UserService) { }

  onUpdatedData(){
    this.userService.getUsers().subscribe(newData=>{
      this.userData = newData;
    });
  }

  onLoadData(){
    this.loadButton = "Refresh data";
    this.showTable = true;
    this.userService.getUsers().subscribe(
      responseData=>{
        this.userData = responseData;
      }
    )
  }

}
