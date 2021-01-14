import { Injectable } from '@angular/core';
import {CommonServiceService} from 'src/app/services/common-service.service';


@Injectable({
  providedIn: 'root'
})
export class LoginService {
loginUrl = "/login";
loggedInAdminName:any
  constructor(public restapi:CommonServiceService , ) { 
  }
 adminloginService(userName:string,password:string,role:number)
 {
   this.loggedInAdminName = userName;
  return this.restapi.post(this.loginUrl,{"userId":userName,"password":password,"role":role});
 }
}
