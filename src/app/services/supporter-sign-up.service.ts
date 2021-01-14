import { Injectable } from '@angular/core';
import { CommonServiceService } from 'src/app/services/common-service.service'

@Injectable({
  providedIn: 'root'
})
export class SupporterSignUpService {
  SupporterUrl = "/registerSupporterDetails/";
  SupporterListUrl = "/getAllSupporters/all";

  constructor(public restapi: CommonServiceService) { }

  supporterSignUp(data) {
    return this.restapi.post(this.SupporterUrl, data)
  }
  supporterList() {
    return this.restapi.get(this.SupporterListUrl)
  }

}


