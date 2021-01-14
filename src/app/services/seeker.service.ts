import { Injectable } from '@angular/core';
import {CommonServiceService} from 'src/app/services/common-service.service'
@Injectable({
  providedIn: 'root'
})
  export class SeekerService {
    fetchAllSeekersUrl="/getAllSeeker/all"
    constructor(public restapi:CommonServiceService) { }
    getAllSeekers()
    {
      return this.restapi.get(this.fetchAllSeekersUrl)
    }
  }
  