import { Injectable } from '@angular/core';
import { CommonServiceService } from 'src/app/services/common-service.service';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  adminAccountUrl="/registerAdminDetails/"
  constructor(public restapi:CommonServiceService) { }
  adminSignUp(data)
  {
    return this.restapi.post(this.adminAccountUrl,data);
  }

}
