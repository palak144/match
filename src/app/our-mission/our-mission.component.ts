import { Component, OnInit } from '@angular/core';
import { NavbarUserServiceService } from '../services/navbar-user-service.service';
import { HeaderServiceService } from '../services/header-service.service';

@Component({
  selector: 'app-our-mission',
  templateUrl: './our-mission.component.html',
  styleUrls: ['./our-mission.component.css']
})
export class OurMissionComponent implements OnInit {

  constructor(   
     private navbarUserServiceService : NavbarUserServiceService  ,   
       public headerServiceService:HeaderServiceService,

    ) { }

  ngOnInit() {
    this.navbarUserServiceService.show();
    this.headerServiceService.show();
  }

}
