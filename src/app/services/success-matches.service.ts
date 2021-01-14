import { Injectable } from '@angular/core';
import { CommonServiceService } from './common-service.service';

@Injectable({
  providedIn: 'root'
})
export class SuccessMatchesService {

  SuccessfulMatchesUrl = "/getAllSuccessfulMatches/all";

  constructor(public restapi: CommonServiceService) { }

  successfulMatches() {
    return this.restapi.get(this.SuccessfulMatchesUrl)
  }
}
