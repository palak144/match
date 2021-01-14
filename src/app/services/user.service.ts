import { Injectable } from '@angular/core';
import { CommonServiceService } from './common-service.service';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  
  userDashboardUrl="/dashboarddata/"
  userOfferNeedLinksUrl="/dashboardlinks/"
  userRejectedLinksUrl="/getRejectedEOILinks/"
  userNeedCountUrl = "/dashboardNeeds/"
  userOfferCountUrl = "/dashboardOffer/"
  userDetails = "/getUser"
  logout = "/logoutUser"
  visible: boolean;
isUserLoggedIn : boolean = false;
  constructor(public restapi:CommonServiceService ) {  this.visible = true;}

  userDashboardService(userId)
  {
    
   return this.restapi.get(this.userDashboardUrl+userId);
  }
  userOfferNeedLinksService(userId)
  {
   return this.restapi.get(this.userOfferNeedLinksUrl+userId);
  }
  UserNeedCountService(userId)
  {
    return this.restapi.get(this.userNeedCountUrl+userId);
  }
  UserOfferCountService(userId)
  {
    return this.restapi.get(this.userOfferCountUrl+userId);
  }
  userDashboardRejectedLinksService(userId){
    return this.restapi.get(this.userRejectedLinksUrl+userId);
  }
  getUserDetails(){
    this.visible = false;
    this.isUserLoggedIn = true;
    return this.restapi.get(this.userDetails)
  }
  getLogout(){
    return this.restapi.get(this.logout)
  }
}
