import { Injectable } from '@angular/core';
import {CommonServiceService} from 'src/app/services/common-service.service'

@Injectable({
  providedIn: 'root'
})
export class DonorService {
  fetchAllDonorsUrl="/getAllDoner/all"
  constructor(public restapi:CommonServiceService) { }
  getAllDonors()
  {
    return this.restapi.get(this.fetchAllDonorsUrl)
  }
}
