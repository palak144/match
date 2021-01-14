import { Injectable } from '@angular/core';
import { CommonServiceService } from 'src/app/services/common-service.service';

@Injectable({
  providedIn: 'root'
})

export class AdminDashboardService {

  constructor(private restapi:CommonServiceService) { }

  getDashUnprocessData()
  { 
    return this.restapi.get("/adminDashboard/");
  }

  getDashstatisticData()
  { 
    return this.restapi.get("/adminDashboardTotal/");
  }

}
