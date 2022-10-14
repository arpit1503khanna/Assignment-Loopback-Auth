import { nString } from "../customer/customer.model";

export interface User{
    id?: string,
    firstName: nString,
    middleName: nString,
    lastName: nString,
    email: nString,
    phoneNumber: number,
    Role: [role:nString],
    customer:[name:nString],
    address: nString,
    createdAt?: string
}
export class UserModel {
    id?: string;
    firstName: nString;
    middleName: nString;
    lastName: nString;
    email: nString;
    phoneNumber: number;
    Role: {role:nString};
    customer:{name:nString};
    address: nString;
    customerId?: nString;
    roleId?: nString;
    createdAt: string;
  
    constructor(dataObject: User) {
      this.id = dataObject['id'];
  
      this.firstName =
        dataObject['firstName'] == undefined || !dataObject['firstName']
          ? ''
          : dataObject['firstName'];
      this.middleName =
        dataObject['middleName'] == undefined || !dataObject['middleName']
          ? ''
          : dataObject['middleName'];
      this.lastName =
        dataObject['lastName'] == undefined || !dataObject['lastName']
          ? ''
          : dataObject['lastName'];
  
      this.email =
        dataObject['email'] == undefined || !dataObject['email']
          ? ''
          : dataObject['email'];
      this.phoneNumber = +dataObject['phoneNumber'];
      this.email =
        dataObject['email'] == undefined || !dataObject['email']
            ? ''
            : dataObject['email'];

    }
    
  }
  
export interface patchUserModel{
    firstName: string,
    middleName: string,
    lastName: string,
    email: string,
    phoneNumber: number,
    address: string,
}
export enum userColumnName{
    firstName = 'First Name', 
    middleName = 'Middle Name', 
    lastName= 'Last Name',
    email= 'Email',
    phoneNumber = 'Phone Number',
    address = 'Address',
    role= 'Role',
    customer = 'Customer',
    createdDate = 'User Created Date',
    edit = 'Edit'
  }