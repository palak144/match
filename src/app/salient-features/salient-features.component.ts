import { Component, OnInit } from '@angular/core';
import { NavbarUserServiceService } from '../services/navbar-user-service.service';
import { HeaderServiceService } from '../services/header-service.service';

@Component({
  selector: 'app-salient-features',
  templateUrl: './salient-features.component.html',
  styleUrls: ['./salient-features.component.css']
})
export class SalientFeaturesComponent implements OnInit {

  constructor(    
    private navbarUserServiceService : NavbarUserServiceService  ,   
      public headerServiceService:HeaderServiceService,

    ) { }

  ngOnInit() {
    this.navbarUserServiceService.show();
    this.headerServiceService.show();
  }

}
